# @jamen/import-graph

Create import graphs with [Graphviz][2].

![example][1]

## Usage

The easiest way to use it is `npx`:

```
npx @jamen/import-graph src/**.js | dot -T svg > imports.svg
```

The command takes file paths and outputs [DOT][3].

The folloing options may be supplied:

- `-i`, `--ignore <pattern>`: Omit files that match the pattern. Defaults to defaults to `node_modules` and `.git`.
- `-f`, `--from <directory>`: Change where paths in labels are relative from. Defaults to cwd.
- `-o`, `--output <file>`: Outputs to a file instead of stdout.

### What languages are supported?

This tool uses regex patterns to build the graph, making it easy to support many languages with different import syntax, without parsing every language.

The files it supports by default are:

- JavaScript ESM & Commonjs
- TypeScript
- package.json (i.e. `main` and `bin` fields)
- CSS
- SCSS/SASS
- Less.js
- Stylus

[1]: example.svg
[2]: http://graphviz.org/
[3]: https://en.wikipedia.org/wiki/DOT_(graph_description_language)