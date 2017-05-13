
# pull-minify

> Minify JS and CSS files inside a pull-stream

```js
pull(
  read(__dirname + '/src/**/*.{css,js}'),
  minify({
    css: { ... },
    js: { ... }
  }),
  // bundle, write, ftp, etc.
  write(__dirname + '/out')
)
```

## Install

```sh
npm install --save pull-minify
```

```sh
yarn add pull-minify
```

## Usage

### `minify(options)`

Minifies CSS and JS files based on extension

Options are `options.js` and `options.css` which go to `minify.js` and `minify.css`.

```js
pull(
  read(__dirname + '/src/**/*.[js,css}'),
  minify({
    js: { mangle: true, toplevel: true },
    css: { restructure: true }
  }),
  write(__dirname + '/out')
)
```

### `minify.js(options)`

### `minify.css(options)`

Convenience functions.  They are identical to:

 - [`pull-minify-js`](https://github.com/jamen/pull-minify-js)
 - [`pull-minify-css`](https://github.com/jamen/pull-minify-css)

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

