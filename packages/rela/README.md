# <img height='75' src='https://cloud.githubusercontent.com/assets/6251703/10702396/b3c33d5a-7986-11e5-9d43-5ddf89a59014.png' alt='rela'>

Create and manage independent WebSocket and WSS servers for API systems.  Based around Node's `EventEmitter` to bring a familiar API and the ability to load data dyanmically to test your systems...

## Installation

```
$ npm install rela
```

## Why not [Socket.io][socket.io]?
Socket.io is a great platform, masterfully made...  However there are 3 things that didn't suit our service, and I can imagine don't suit other services.  So we decided to create our own library.

 1. Socket.io seems like it's paired with HTTP(S) servers, whereas Rela is completely independent (based on top of Node's `net` and `tls` modules).  It makes it feel less bound to your application and more like a API system.
 2. Socket.io ships with both a server-side library and client-side library.  Rela is only used for server-side and simple enough where you can still use the native browser WebSockets to use it.
 3. You typically have to design your mini-protocol or API around Socket.io...  Rela gives you the ability to adapt a pre-exisiting API, or a really flexible API.

So with all these in mind, we designed Rela to be the counterpart to Socket.io.

By no means is Rela better than Socket.io.  I just believe Socket.io was designed with a different train of thought.  Applications vs API systems.

## Documentation
Please see [the repo's Wiki][wiki] for documentation on how to use Rela.

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for a guide on how to contribute to Rela.

## License
Rela is licensed under [the MIT license](LICENSE)

  [socket.io]: https://github.com/socketio/socket.io
  [wiki]: https://github.com/soundcove/rela/wiki
