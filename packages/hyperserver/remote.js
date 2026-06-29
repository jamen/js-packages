
module.exports = function (app, options) {
  if (!options) options = {}

  var pre = []

  var host = options.host || location.hostname
  var port = options.port || location.port
  var ws = new WebSocket('ws://' + host + ':' + port)
  var open = false

  ws.onopen = function () {
    open = true
    while (pre.length) {
      var msg = pre.shift()
      ws.send(JSON.stringify(msg))
    }
  }

  ws.onclose = function () {
    open = false
  }

  return function (props) {
    if (!props.actions) props.actions = {}

    for (var name in props.remote) {
      var action = props.remote[name]

      props.actions[name + '_done'] = function (state, actions) {
        let pre = action(state, actions)
        return function (data) {
          return pre(data)
        }
      }

      props.actions[name] = function (state, actions) {
        return function (data) {
          let msg = data == null ? [name] : [name, data]
          if (open) ws.send(JSON.stringify(msg))
          else pre.push(msg)
        }
      }
    }

    delete props.remote

    var actions = app(props)

    ws.onmessage = function (e) {
      var msg = JSON.parse(e.data)
      actions[msg[0] + '_done'](msg[1])
    }

    return actions
  }
}
