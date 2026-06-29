# static
A small module for implementing a static aspect into your server.

## Usage:
To use this, you must first install it wherever your iora server is being deployed, or globally:

```
npm install iora-static
```

From here, you'd add it to your `"middleware"` array in your configuration file for your iora server:

```javascript
{
  ...
  "middleware": [
    "iora-static"
  ]
  ...
}
```

Once added, at the base of your iora config, you add `"static"` to your `"base"` object (this is the directory that will be static), and a `"static"` objcet at the root:

```javascript
{
  ...
  "middleware": [
    "iora-static"
  ],
  ...
  "base": {
    ...
    "static": "/path/to/some/folder"
  },
  ...
  "static": {
    "url": "/resources",
    "options": {
      "dotfiles": "deny"
    }
  }
}
```
