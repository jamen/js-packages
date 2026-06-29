
# pull-prop

> Map an object's property with a stream

```js
pull(
  values([
    { foo: { bar: 123 } },
    { foo: { bar: 321 } },
    { foo: { bar: 333 } }
  ]),
  prop('foo.bar', () => pull(
    map(bar => bar * 3)
  ))
  drain(obj => {
    // ...
  })
)
```

## Install

```sh
npm install --save pull-property

# with yarn
yarn add pull-property
```

## Usage

### `prop(name, transform)`

A through stream that takes and gives objects, replacing a certain property on them.

 - `name`: The property you are mapping (resolved by [`object-path`](https://www.npmjs.com/package/object-path))
 - `transform`: A function that returns a through stream, which maps the property

An psuedo example with [`pull-files`](https://npmjs.com/pull-files):

```js
pull(
  read('lib/**/*.js'),
  // Map `data` with buf -> buf streams:
  prop('data', () => pull(
    map(babel.transformSync),
    map(uglify.compileSync),
    // ...
  )),
  write('out', err => {
    if (err) throw err
  })
)
```

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

