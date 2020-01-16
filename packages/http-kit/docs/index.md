# Documentation

## CORS

CORS response headers can be declared on the route with `route.headers`:

```js
const { send } = require('@jamen/http-api-kit')

module.exports = {
    'GET /foo': {
        headers: {
            'Access-Control-Allow-Origin': '*',
            // ...
        },
        async respond (request, response) {
            send(response, 200, { success: ok })
        }
    }
}
```

See [MDN Glossary: CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) for references.

## Preparing Values

Preparing values is done _before_ validation, so you make the validation more useful, and clean the parsing/housekeeping out of the response. For example, Node.js parses all query strings into string values, but maybe its supposed to be a page number, which would validate in a certain range.

```js
module.exports = {
    'GET /page': {
        validation: {
            query: {
                page: 'number',
                min: 0,
            }
        }
        async prepare (request, response, services) {
            try {
                request.query.page = parseInt(request.query.page)
            } catch (error) {
                return send(response, 400, { failure: 'Page was not a number. })
            }
        },
        async respond (request, response, { mongo }) {
            const documents = mongo.db('my-site').collection('documents')

            const document = await documents.find({ $skip: request.query.page, $limit: 1 }).next()

            return send(response, 200, { success: document })
        }
    }
}
```

## Validation

Most validation is done with [JSON schema](https://json-schema.org/), where its simple to add common constraints, ensure an object structure, and check for patterns.

Custom validation is used when its not possible to check validity with JSON schema alone. For example, email addresses may need better validation with `validator`.

An example of this combined looks like:

```js
const { send } = require('@jamen/http-api-kit')
const { isEmail } = require('validator')

module.exports = {
    'POST /example': {
        validation: {
            body: {
                email: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 340
                }
            }
        },
        async respond (request, response) {
            if (!isEmail(request.body.email)) {
                return send(response, 400, { failure: 'Email is invalid.' })
            }

            // ...

            return send(response, 200, { success: true })
        }
    }
}
```

## Auth

Auth is based on HTTP-only cookies and JWTs. For it to work your API server must specify `services.jwtSecret` and routes set `route.authenticate`.

```js
http.createServer(createApiServer(routes, { jwtSecret: process.env.JWT_SECRET }))
```

```js
module.exports = {
    'GET /important': {
        authenticate: true,
        async respond (request, response) {
            return send(response, 200, { success: ':)' })
        }
    }
}
```