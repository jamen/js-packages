
# hyperserver

> Tiny WebSocket server that hooks into Hyperapp

Provdies a WebSocket server that hooks into Hyperapp actions.

It adds "remote actions", which are simply actions that get their data transformed through your server.  The different can be visualized as:

```
Normal action:

    Action +---> State +---> View


Remote action:

    Action +- - - - - -Offline?- - - - - - -> State +---> View
             \                            /
    (Servers) +---Request-----Response---+
```

## Install

```
npm i -D hyperserver
```

## Usage

### `server(props)`

Creates a WebSocket server with

- `messages` handling each incomming action.
- `host` being address of the server. (Defaults to `localhost`)
- `port` being port of the server. (Defaults to `3001`)
- `error(err)` being called

Each message looks like `name(request, response)`.  They receive and send messages formated as `[name, data]`, which correlates to actions client-side.  For example:

```js
server({
  messages: {
    token (req, res) {
      // Receive "token" action from client
      console.log(req.data)

      // Respond with "token" action on client
      res.send('token', {
        token: randomBytes(8).toString('hex')
      })
    }
  }
})
```

See below for handling responses.

### `remote(app, options)`

An extension to Hyperapp which adds `props.remote` for specifying remote actions.  It connects to the Hyperserver with

- `host` being the address of the server. (Defaults to `localhost`)
- `port` being the port of the server. (Defaults to `3001`)

Remote actions are like regular actions except they ask a server first.

```
Action +- - - - - -Offline?- - - - - - -> State +---> View
         \                            /
(Servers) +---Request-----Response---+
```

An example of using the extension:

```js
app = remote(app)

app({
  state: {
    count: 0
  },
  remote: {
    add: (state, actions) => data {
      return { count: data.count + 1 }
    }
  },
  view: (state, actions) => (
    h('button', { onclick: actions.add }, state.count)
  )
})
```

Everything defined in `remote` is available as `actions` everywhere else.  Note remote actions take precedence of normal actions.
