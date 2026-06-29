
const { Server } = require('ws')
const loud = e => { throw e }

module.exports = function (props) {
  const server = new Server({
    address: props.host,
    port: props.port,
  })

  const error = props.error || loud
  const messages = props.messages || {}

  server.on('connection', client => {
    client.on('message', msg => {
      try {
        msg = JSON.parse(msg)
      } catch (err) {
        error(err)
      }

      const request = {
        name: msg[0],
        data: msg[1],
        client
      }

      const response = {
        send (name, data) {
          client.send(JSON.stringify([name, data]))
        }
      }

      if (messages[request.name]) {
        messages[request.name](request, response, server)
      } else {
        error(new Error('Unknown action ' + name))
      }
    })
  })

  return server
}
