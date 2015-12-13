# rela-json
`rela-json` is a [Rela](https://github.com/jamen/rela) middleware to provide JSON-events on the `Client` object.

## Usage
`rela-json` provides one new addition to the `Server` object's prototype.  Which is `.select`.  But first we have to load `rela-json`:

```javascript
var rela = require('rela'),
    app = rela();

app.use(require('rela-json'));

// ...
```

### `Server.prototype.select`
A key to orientate your events around.  (Default: `"method"`)

## Examples
```javascript
const rela = require('rela'),
      app = rela();

app.use(require('rela-json'));

app.select('do'); // Set key to listen on.

app.on('connection', function(client){
  client.on('example', function(data){
    console.log(data);
  });
});
```

We can trigger the `"example"` event from the client with the following JSON:

```javascript
{
  "do": "example",
  // ...
}
```
