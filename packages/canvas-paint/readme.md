# canvas-paint

> Canvas functions for painting in layers

```js
// Create a layer
var foo = Paint(canvas.getContext('2d'))

// Draw a rect on the layer
Paint.rect(foo, {
  x: 10, y: 30,
  fill: 'rgba(255, 0, 0, 0.5)',
  width: 100,
  height: 100
})

// Draw text
Paint.text(foo, {
  x: 5, y: 10,
  value: 'Hello world'
})

// Animate
;(function animate () {
  Paint.render(foo)
  window.requestAnimationFrame(anime)
})
```

Also see `Merger` and `Manager` for rendering multiple layers and canvases.

## Installation

**Note:** Library is still a work-in-progress

```sh
$ npm install --save canvas-paint
```

## Usage

### `Paint(options? | context?)`

Create a `Paint` object.  Theses are either: painted on their own, merged as layers onto a single canvas (see `Merger`), or rendered together on separate canvases (see `Manager`).

```js
// Create layer on physical canvas
var foo = Paint(canvas.getContext('2d'))

// Create a virtual canvas (which can be merged together)
var bar = Paint({ width: 100, height: 100 })

// Another lazy way to create virtual:
var qux = Paint()
```

The object is passed onto drawing functions (e.g. `Paint.rect`, `Paint.clear`, `Paint.text`) and then rendered on its own with `Paint.render` or inside a `Merger`/`Manager`.

### `Paint.rect(layer, options?)`

Draw a rect

```js
Paint.rect(foo, {
  x: 10, y: 10,
  fill: 'blue',
  stroke: 'red',
  width: 100,
  height: 100
})
```

### `Paint.text(layer, options?)`

Draw text

```js
Paint.rect(foo, {
  x: 55, y: 10,
  fill: 'blue',
  stroke: 'red',
  value: 'Hello, World!',
  font: '16px serif',
  // font alternative:
  font: {
    size: 16,
    familiy: 'serif'
  }
})
```

### `Paint.clear(layer, optoins?)`

Clear paint.  Defaults to clearing all unless given width/height.

```js
Paint.clear(foo)

// Clear area:
Paint.clear(foo, {
  x: 25, y: 25,
  width: 50,
  height: 50
})
```

### `Merger(layers, dest)`

Merge paint layers onto a destination context.

 - `layers`: An array of `Paint` objects.
 - `dest`: A context where the paint layers are drawn.

```js
// Create layers:
var foo = Paint()
var bar = Paint()
var qux = Paint()

// Create merger:
var render = Merger([foo, bar, qux], canvas.getContext('2d'))
// Call render in requestAnimationFrame
```

### `Manager(layers)`

Work in progress

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/graphics.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/Jamen%20Marz/graphics.svg?style=flat-square)](https://travis-ci.org/jamen/graphics) [![downloads](https://img.shields.io/npm/dt/graphics.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/graphics.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-paypal-green.svg?style=flat-square)](https://www.paypal.me/jamenmarz/5usd) [![follow](https://img.shields.io/github/followers/Jamen%20Marz.svg?style=social&label=Follow)](https://github.com/Jamen%20Marz)

[package]: https://npmjs.org/package/graphics
