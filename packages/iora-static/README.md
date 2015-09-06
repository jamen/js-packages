# static
A small module for implementing a static aspect into your server.

## Usage:
To use this, you must first install it wherever your iora server is being deployed, or globally:

```
npm install iora-static
```

From here, you'd add it to your `controllers` array in your configuration file for your iora server:

```javascript
{
  ...
  "controllers": [
    "iora-static"
  ]
  ...
}
```

Once added, at the base of your iora config, you can add a `"static"` field:

```javascript
{
  ...
  "controllers": [
    "iora-static"
  ]
  ...
  "static": {
    "url": "/resources",
    "folder": "../resources/public/static",
    "options": {
      "dotfiles": "deny"
    }
  }
}
```
