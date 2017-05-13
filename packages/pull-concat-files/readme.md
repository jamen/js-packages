
# pull-concat-files

> Concat pull-stream files into one

Simple `file -> file` concat.  Consumes all files in the stream, use something like `pull.filter` or globs beforehand.

```js
pull(
  read(__dirname + '/src/**/*.css'),
  concat('app.css'),
  write(__dirname + '/out/')
)
```

## Install

```sh
npm install --save pull-concat-files
```

```sh
yarn add pull-concat-files
```

## Usage

### `concat(path, sep?)`

Concats all files in the stream into one file under `path`.

```js
pull
  read('src/**/*.css'),
  concat('app.css'),
  write('out/')
)
```

## Also see

 - [`pull-files`] for reading and writing pull-stream files
 - [`pull-bundle`] for bundle your whole project
 - [`pull-bundle-js`] for bundling with browserify

---

Maintained by [Jamen Marz](https://git.io/jamen) (See on [Twitter](https://twitter.com/jamenmarz) and [GitHub](https://github.com/jamen) for questions & updates)

[`pull-files`]: https://github.com/jamen/pull-files
[`pull-bundle`]: https://githun.com/jamen/pull-bundle
[`pull-bundle-js`]: https://github.com/jamen/pull-bundle-js
