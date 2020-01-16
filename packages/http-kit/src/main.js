const path = require('path')
const Ajv = require('ajv')
const url = require('url')
const cookie = require('cookie')
const readdir = require('recursive-readdir')
const jwt = require('jsonwebtoken')

async function createApiServer (routesDirectory, services) {
    // Create routes from directory
    const routeFiles = (await readdir(routesDirectory)).filter(x => path.extname(x) === '.js')
    const routes = routeFiles.reduce((r, f) => Object.assign(r, require(f)), {})

    // Create validators from routes
    const ajv = new Ajv()
    const validators = {}

    for (const endpoint of Object.keys(routes)) {
        validators[endpoint] = ajv.compile({
            type: 'object',
            properties: routes[endpoint].validate
        })
    }

    // Create server
    return async (request, response) => {
        try {
            // Parse URL
            const { pathname, query } = url.parse(request.url, true)

            request.pathname = pathname
            request.query = query

            const endpoint = request.method + ' ' + request.pathname

            // Check route exists and get it.
            if (!routes.hasOwnProperty(endpoint) || !routes[endpoint].respond) {
                return send(response, 404, { failure: 'Not found.' })
            }

            const route = routes[endpoint]

            // Authenticate request with HTTP-only cookie containing JWT.
            if (route.authenticate) {
                const cookies = cookie.parse(request.headers['cookie'] || '')

                if (!cookies.token) {
                    return send(response, 403, { failure: 'Forbidden.' })
                }

                try {
                    request.session = jwt.verify(cookies.token, services.jwtSecret)
                } catch (error) {
                    return send(response, 403,  { failure: 'Forbidden.' })
                }
            }

            // Set headers
            if (route.headers) {
                for (const key of route.headers) {
                    response.setHeader(key, route.headers[key])
                }
            }

            // Get and parse body as JSON
            if (route.json || (route.accept === undefined && request.method !== 'GET')) {
                if (/^application\/json(?:\s*)(?:[;]|$)/.test(request.headers['content-type'])) {
                    return send(response, 406, { failure: 'Content-Type is not application/json.' })
                }

                try {
                    const parts = []
                    const limit = route.limit || 1048576 // 1mb
                    let size = 0

                    if (request.headers['content-length'] > limit) {
                        return send(response, 413, { failure: 'Content was too large for this request.' })
                    }

                    request.body = await new Promise((resolve, reject) => {
                        request.on('data', part => {
                            size += Buffer.byteLength(part)

                            if (size > limit) {
                                send(response, 413, { failure: 'Content was too large for this request.' })
                                request.destroy(new Error('Content was too large for this request.'))
                                return
                            }

                            parts.push(part)
                        })

                        request.on('end', () => {
                            resolve(JSON.parse(Buffer.concat(parts)))
                        })

                        request.on('error', error => {
                            reject(error)
                        })
                    })
                } catch (error) {
                    return send(response, 400, { failure: 'Message could not parse as JSON.' })
                }
            }

            // Prepare request before validating and responding
            if (route.prepare) {
                await route.prepare(request, response, services)
                if (!response.writableEnded) return
            }

            // Validate request data
            const data = {
                query: request.query,
                headers: request.headers,
                body: request.body,
            }

            if (!validators[endpoint](data)) {
                return send(response, 400, { failure: 'Message is invalid.' })
            }

            // Send response
            await route.respond(request, response, services)
        } catch (error) {
            console.error(error)

            if (!response.writableEnded) {
                return send(response, 500, { failure: 'Internal server error.' })
            }
        }
    }
}

function send (response, status, message) {
    response.statusCode = status

    const data = JSON.stringify(message)

    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('Content-Length', Buffer.byteLength(data))

    response.end(data)
}

module.exports = {
    createApiServer,
    send
}