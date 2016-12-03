# eslint-plugin-typling

> Typling plugin for Eslint

![Preview Screenshot](preview.png)

A Typling type checker plugin for Eslint

## Installation

```sh
$ npm install --save eslint-plugin-typling
```

## Usage

Load it in your `"plugins"` array:

```js
"plugins": ["typling" /*, "react", "promise", ... */]
```

Second, add a `"typling/types"` rule to tell Eslint to create warnings to errors:

```js
"rules": {
  // Create warnings:
  "typling/types": 1,
  // Create errors:
  "typling/types": 2
}
```

And you're done

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/eslint-plugin-typling.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/eslint-plugin-typling.svg?style=flat-square)](https://travis-ci.org/jamen/eslint-plugin-typling) [![downloads](https://img.shields.io/npm/dt/eslint-plugin-typling.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package]  [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/eslint-plugin-typling
