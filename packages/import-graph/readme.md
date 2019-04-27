# import-graph

Create a graph of imports with [Graphviz][2].

![example][1]

## Install

```sh
npm i @jamen/import-graph
```

Or use `npx`:

```sh
npx @jamen/import-graph <options>
```

## Usage

For simple use, call it inside a directory with `package.json`. It creates DOT and is combined with  `dot` or `neato` from [Graphviz][2].

```sh
import-graph | dot -Tsvg > imports.svg
```

Any number of entries can be specified instead

```sh
import-graph lib/project.js
import-graph lib/**.js
```

### Options

Use `--ignore` or `-i` to omit files that match a pattern (defaults to `node_modules` and `.git`)

```sh
import-graph -i "dist"
```

Use `--from` or `-f` to change where the paths in labels are relative to.  Defaults to the current working directory.

```sh
import-graph lib/**.js --from lib
```

Use `--output` or `-o` if you don't want to use stdio for some reason.

```sh
import-graph -o imports.dot
```

### How does it work? What languages are supported?

It uses the file types to categorize and match files for import strings.  This is a flexible and simple way to support many languages, but this means it is only _mostly reliable_.  If there is bugged output, you can try `--ignore`, or post a bug report here.

That said, the languages supported so far are:

- JavaScript ESM & Commonjs
- TypeScript
- package.json (i.e. `main` and `bin` fields)
- CSS
- SCSS/SASS
- Less.js
- Stylus

Files that are imported by these, that are not supported, will still appear in the import graph, but they cannot be traversed for their dependencies and they are marked as a single color. Also checking for built-in modules and dependencies to visually separate them.

The patterns, colors, and supported extensions cannot be customized, as there is little need to, although this would not be hard to accomplish. If you want to add more rules or the ability to customize, contributions are welcome!

[1]: example.svg
[2]: http://graphviz.org/