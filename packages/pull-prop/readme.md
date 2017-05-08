
# pull-prop

> Select a property and replace inside an object

```js
var { select, replace } = prop('foo.bar')

pull(
  values([
    { foo: { bar: 123 } },
    { foo: { bar: 321 } },
    { foo: { bar: 333 } }
  ]),
  select
  map(bar => bar * 3),
  replace,
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

### `prop(name)`

Create `select`/`replace` streams from the prop name

### `select`

Selects the property in the stream

```js
var { select } = prop('foo')

pull(
  values([
    { foo: 123 },
    { foo: 222 },
    { foo: 321 }
  ]),
  select,
  drain(console.log)
)
```

### `replace`

Used with `select` to map over properties easier

```js
var { select, replace } = prop('foo.bar')

pull(
  values([
    { foo: { bar: 123 } },
    { foo: { bar: 321 } },
    { foo: { bar: 333 } }
  ]),
  select
  map(bar => bar * 3),
  replace,
  drain(obj => {
    // ...
  })
)
```


---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

