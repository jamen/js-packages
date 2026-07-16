# js-packages

An archive of my JavaScript packages, written between **2015 and 2021**.

This is a monorepo of ~150 small, mostly single-purpose npm packages I built
over the years — utilities, streaming primitives, CSS and UI experiments, build
tooling, servers, and a handful of full applications. Most were published to npm
(under `jamen`, `@jamen/*`, `@finepoint/*`, and `@audio/*`) and are MIT licensed
unless noted otherwise. They're preserved here as-is, both as a personal history
and in case any are still useful to someone.

Each package lives in its own folder under [`packages/`](packages/) with its own
`package.json`, license, and (usually) tests.

- **pull-streams** — a large family of `pull-*` modules for streaming files,
  audio, builds, and IPC.
- **Callbags** — a later take on the same streaming ideas.
- **CSS as data** — parsing, collapsing, and representing CSS through plain
  objects (`rpv`, `vss`, the `css-*` set).
- **Hyperapp & hyperscript** — view layers, `h(...)` helpers, HMR, prerendering,
  and persistence.
- **Audio & WebAssembly** — decoding audio, Cubeb bindings, and WASM-friendly
  canvas/audio functions.
- **Build & dev tooling** — a Make-inspired build tool, scaffolders, dist
  helpers, and a dev server.
- **Parsers & types** — an ESTree toolkit, a general-purpose parser (`guru`),
  and a from-scratch type checker (`typling`).

## Packages

### Pull-streams

A large family of [pull-stream](https://github.com/pull-stream/pull-stream)
modules for building streaming pipelines.

| Package | Description |
| --- | --- |
| [`pull-map`](packages/pull-map) | Create sync, async, or through maps in pull-streams |
| [`pull-await`](packages/pull-await) | Await promises in a pull-stream |
| [`pull-prop`](packages/pull-prop) | Select a property and replace inside an object |
| [`pull-splitter`](packages/pull-splitter) | Split a stream into other streams using filters |
| [`pull-imux`](packages/pull-imux) | Transform stream composed of smaller duplex streams |
| [`pull-regenerate`](packages/pull-regenerate) | A source that masks other sources over its lifetime |
| [`pull-collect-promise`](packages/pull-collect-promise) | Sink that collects values into an array, then returns a promise |
| [`pull-drain-cont`](packages/pull-drain-cont) | Sink that drains a source stream's data |
| [`pull-task`](packages/pull-task) | A task system for pull-streams |
| [`pull-prompt`](packages/pull-prompt) | Command-line prompt functions for pull-stream |
| [`pull-spawn-process`](packages/pull-spawn-process) | Use pull-streams with `child_process.spawn` stdio |
| [`pull-electron-ipc`](packages/pull-electron-ipc) | Pull stream for Electron IPC |
| [`pull-fs-meta`](packages/pull-fs-meta) | File-system functions with a separated metadata system |
| [`pull-vinyl`](packages/pull-vinyl) | Read and write `Vinyl` objects in the file system |
| [`vinyl-write`](packages/vinyl-write) | Write Vinyl objects to the file system |
| [`pull-concat-files`](packages/pull-concat-files) | Concat pull-stream files into one |
| [`pull-create-html`](packages/pull-create-html) | Create an HTML file from JS and CSS file streams |
| [`pull-bundle-js`](packages/pull-bundle-js) | Bundle JS files inside a pull-stream with Browserify |
| [`pull-browserify`](packages/pull-browserify) | Browserify functions for pull-stream |
| [`pull-minify`](packages/pull-minify) | Minify JS and CSS files inside a pull-stream |
| [`pull-minify-js`](packages/pull-minify-js) | Minify JavaScript files or buffers inside a pull-stream |
| [`pull-minify-css`](packages/pull-minify-css) | Minify CSS files or buffers inside a pull-stream |
| [`pull-couchdb`](packages/pull-couchdb) | Pull-streams for reading and writing in CouchDB |
| [`pull-audio-generator`](packages/pull-audio-generator) | Generate audio as a pull-stream source |
| [`pull-audio-gain`](packages/pull-audio-gain) | Transform volume of audio in a pull-stream |
| [`pull-audio-speaker`](packages/pull-audio-speaker) | Output to speaker as a pull-stream sink |

### Callbags

| Package | Description |
| --- | --- |
| [`callbag-github`](packages/callbag-github) | Use streaming APIs from GitHub as Callbags |
| [`callbag-reddit`](packages/callbag-reddit) | Reddit observable as a callbag |
| [`callbag-couchdb`](packages/callbag-couchdb) | A Callbag sink for CouchDB |

### CSS & styling

| Package | Description |
| --- | --- |
| [`css-parse-declarations`](packages/css-parse-declarations) | Parse CSS declarations into a simple array |
| [`css-collapse-values`](packages/css-collapse-values) | Collapse CSS values into their shortest form |
| [`css-truncate-values`](packages/css-truncate-values) | Truncate CSS numbers while retaining the original value |
| [`css-get-unit`](packages/css-get-unit) | Get the unit of a CSS value |
| [`rpv`](packages/rpv) | Represent CSS through objects |
| [`to-rpv`](packages/to-rpv) | Parse normal CSS to an RPV tree |
| [`vss`](packages/vss) | Virtual Style Sheets — enable data-binding with CSS |
| [`fss`](packages/fss) | "Next generation CSS" experiment |
| [`dist-css`](packages/dist-css) | Create a dist version of your CSS |

### UI & view layers

Hyperscript helpers, Hyperapp add-ons, and small template engines.

| Package | Description |
| --- | --- |
| [`h2dom`](packages/h2dom) | Create DOM nodes using `h(...)` functions |
| [`h2array`](packages/h2array) | Create compact array nodes from `h(...)` calls |
| [`h2spec`](packages/h2spec) | Hyperscript spec helpers |
| [`html-to-hyperapp`](packages/html-to-hyperapp) | Parse HTML into JSON that resembles Hyperapp nodes |
| [`hyperapp-head`](packages/hyperapp-head) | Patch Hyperapp `<head>` nodes |
| [`hyperapp-page`](packages/hyperapp-page) | Page/routing helper for Hyperapp |
| [`hyperapp-prerender`](packages/hyperapp-prerender) | Prerendering for `hyperapp-page` |
| [`hyperapp-persist`](packages/hyperapp-persist) | Persist an app's state to the next session |
| [`hyperapp-hmr`](packages/hyperapp-hmr) | Reload modules while preserving app state |
| [`svelte-router`](packages/svelte-router) | Svelte router with a store and components |
| [`avo`](packages/avo) | Functions for building UI in JavaScript |
| [`arzo`](packages/arzo) | An experimental component idea |
| [`pixie`](packages/pixie) | Tiny template engine (~422 bytes minified + gzipped) |
| [`pixie-cli`](packages/pixie-cli) | Create and compile Pixie templates from the command line |
| [`mist`](packages/mist) | A tiny language to convert lists to a spec.js HTML format |

### Parsers, ASTs & type checking

| Package | Description |
| --- | --- |
| [`guru`](packages/guru) | A fancy, general-purpose, modular, reusable parser |
| [`guru-common`](packages/guru-common) | Common rules for `guru` |
| [`estree-walk`](packages/estree-walk) | Walk ESTree nodes simply and fast |
| [`estree-parent`](packages/estree-parent) | Get the parent of an ESTree node |
| [`estree-modules`](packages/estree-modules) | Get info about a module from a node |
| [`babel-plugin-pull`](packages/babel-plugin-pull) | Transform the pipeline operator into `pull(...)` calls |
| [`babel-preset-esfp`](packages/babel-preset-esfp) | A Babel preset of functional-programming goodies |
| [`osia-babel`](packages/osia-babel) | Osia plugin for Babel |
| [`typling`](packages/typling) | Create and verify types from the command line |
| [`typling-core`](packages/typling-core) | Check typlings on an Esprima-style AST |
| [`eslint-plugin-typling`](packages/eslint-plugin-typling) | ESLint plugin for typling |

### Functional programming & control flow

| Package | Description |
| --- | --- |
| [`esfp`](packages/esfp) | Better functional programming in JS |
| [`lazy-o`](packages/lazy-o) | Painless chains that are lazy, functional, and fast |
| [`lazy-template`](packages/lazy-template) | Create template strings that are lazy and reusable |
| [`mower`](packages/mower) | Mow through data using a routine of functions |
| [`extending`](packages/extending) | Create extremely simple extendable objects |
| [`free-context`](packages/free-context) | Free context from a function |
| [`fast-args`](packages/fast-args) | Very fast way to turn a function's `arguments` into an array |
| [`il`](packages/il) | Simple generator to use in iteration loops |
| [`sate`](packages/sate) | Small utility for generator-based iteration stacking |
| [`bco`](packages/bco) | A better command object |
| [`osia`](packages/osia) | An elegant Promise-based tasking system |
| [`tasking`](packages/tasking) | Tiny tasking system |
| [`promise-circuit`](packages/promise-circuit) | Create a circuit-type flow for Promise functions |
| [`promise-routine`](packages/promise-routine) | Wrap a routine of Promise functions in `Promise.all` |
| [`prepared`](packages/prepared) | Prepared callback error handling |
| [`event-callback`](packages/event-callback) | Turn a pass/fail event combo into a Node-style callback |
| [`event-intercept`](packages/event-intercept) | Intercept event data before it reaches the listeners |
| [`log-cb`](packages/log-cb) | Better-looking formatting of errors and data from a callback |
| [`node-diagnose`](packages/node-diagnose) | Async and simple diagnostics system |

### Networking & servers

| Package | Description |
| --- | --- |
| [`neta`](packages/neta) | A modern, decentralized, customizable chatting client |
| [`neta-message`](packages/neta-message) | Encode and decode Neta messages |
| [`neta-server`](packages/neta-server) | Neta's official server tool |
| [`iora`](packages/iora) | Create modular HTTP servers |
| [`iora-static`](packages/iora-static) | A static-file aspect for `iora` servers |
| [`rela`](packages/rela) | Create and manage an independent WebSocket server for API systems |
| [`rela-json`](packages/rela-json) | JSON-event middleware for `rela` |
| [`hyperserver`](packages/hyperserver) | Route some actions through your server, and elsewhere offline |
| [`http-kit`](packages/http-kit) | HTTP API kit |
| [`ws-utils`](packages/ws-utils) | Functions for using WebSockets on Node.js |
| [`ws-rate-limit`](packages/ws-rate-limit) | Rate-limiting utility for `ws` |
| [`spocket`](packages/spocket) | Socket with easy message encoding and decoding |
| [`email-router`](packages/email-router) | A router for email addresses |
| [`loudnode`](packages/loudnode) | Forum middleware (MongoDB + Mustache) for a customizable forum system |
| [`sagepay`](packages/sagepay) | Sage Pay server integration protocol for Node.js |

### Audio, canvas & WebAssembly

| Package | Description |
| --- | --- |
| [`audio`](packages/audio) | Audio primitives |
| [`audio-decode-wav`](packages/audio-decode-wav) | Decode a WAV buffer into an Audio object |
| [`audio-decode-wasm`](packages/audio-decode-wasm) | Decode streams of audio with WebAssembly |
| [`node-cubeb`](packages/node-cubeb) | Node.js bindings for Cubeb (Firefox's audio library) |
| [`canvas-wasm`](packages/canvas-wasm) | Canvas functions suitable for WebAssembly |
| [`canvas-paint`](packages/canvas-paint) | A graphics experiment |
| [`wasmify`](packages/wasmify) | Require WebAssembly modules with Browserify |

### The `hmu` info suite & registry tools

`hmu` ("hit me up") is a modular tool for looking up information across services.

| Package | Description |
| --- | --- |
| [`hmu`](packages/hmu) | A tool all about information |
| [`hmu-core`](packages/hmu-core) | Run HMU requests and get raw output |
| [`hmu-plugin`](packages/hmu-plugin) | Plugin utilities for normalizing output |
| [`hmu-gh`](packages/hmu-gh) | Check GitHub username availability |
| [`hmu-npm`](packages/hmu-npm) | Check npm package availability |
| [`hmu-http`](packages/hmu-http) | Fetch the HTTP status of a server |
| [`domain-check`](packages/domain-check) | Module and CLI for checking a domain's availability |
| [`npm-random-feed`](packages/npm-random-feed) | A feed of random names and whether they're free or taken |
| [`npm-dl-package`](packages/npm-dl-package) | Download a package from npm's registry by name/version/tag |
| [`iana`](packages/iana) | Perform IANA functions through Node |

### Build & developer tooling

| Package | Description |
| --- | --- |
| [`build`](packages/build) | Tool for building web projects (inspired by GNU Make) |
| [`serve-dev`](packages/serve-dev) | ZEIT `serve` remade with auto-reloading and Make rebuilding |
| [`dist-js`](packages/dist-js) | Create a dist version of your JS |
| [`import-graph`](packages/import-graph) | Create import graphs with Graphviz |
| [`markdown-to-code`](packages/markdown-to-code) | Literate programming with markdown code blocks |
| [`ecodoc`](packages/ecodoc) | Manage docs across multiple packages |
| [`bp`](packages/bp) | Create boilerplate templates and scaffold them |
| [`create`](packages/create) | Functions for scaffolding projects |
| [`create-js`](packages/create-js) | Scaffold a new JavaScript project |
| [`generator-devjs`](packages/generator-devjs) | DevJS's Yeoman generator |
| [`generator-z`](packages/generator-z) | Multiplex Yeoman generators |
| [`gulp-pug-1`](packages/gulp-pug-1) | Gulp plugin for compiling Pug templates |
| [`gulp-toast`](packages/gulp-toast) | Group project configurations |
| [`rollup-plugin-browser-extension`](packages/rollup-plugin-browser-extension) | Rollup plugin for browser extensions |
| [`bench`](packages/bench) | A benchmark.js reporter |
| [`tape-benchmark`](packages/tape-benchmark) | Benchmarking functions for tape |
| [`fii`](packages/fii) | Install package versions globally/concurrently and symlink them locally |
| [`lavish`](packages/lavish) | Better `npm install` using a global cache and symlinking |
| [`refig`](packages/refig) | Manage configuration files with Promise objects |
| [`json-config-reader`](packages/json-config-reader) | Read and cache JSON configurations |
| [`require-glob`](packages/require-glob) | Require files using the resolve pattern, but with globs |
| [`args-from`](packages/args-from) | Turn a package.json field into CLI args |
| [`slice-file-cli`](packages/slice-file-cli) | Generate a module that slices a file between a given range |

### Data & small utilities

| Package | Description |
| --- | --- |
| [`json-assign`](packages/json-assign) | `Object.assign` for JSON files |
| [`data-state`](packages/data-state) | Fast state built on top of typed arrays |
| [`ca-formats`](packages/ca-formats) | Decode cellular-automata formats to `[x1, y1, …, xn, yn]` values |
| [`pos`](packages/pos) | Turn coordinate positions (under 2¹⁵) into a single index |
| [`combin`](packages/combin) | Create an array of string combinations |
| [`node-concat`](packages/node-concat) | Concatenate items |
| [`template-path`](packages/template-path) | Resolve a template string as a path |
| [`lorem`](packages/lorem) | Create N bytes of lorem ipsum text |
| [`fake-word`](packages/fake-word) | Create fake words for names or tests |
| [`btoa`](packages/btoa) | base64 encoding |

### Experiments & odds and ends

| Package | Description |
| --- | --- |
| [`browser-window`](packages/browser-window) | A helpful `BrowserWindow` wrapper |
| [`cordlr-color`](packages/cordlr-color) | Turn hex/rgb/hsl color codes into a PNG image |
| [`se-advanced-bar`](packages/se-advanced-bar) | StackExchange advanced bar |
| [`google.com`](packages/google.com) | A tool for searching google.com |
| [`etmo`](packages/etmo) | Use Atom and Emacs as one editor |
