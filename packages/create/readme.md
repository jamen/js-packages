# @jamen/create

Functions for scaffolding projects.

The goal is to replace tools like [Yeoman](https://github.com/yeoman/yo) and [Generate](https://github.com/generate/generate) with npm's `npm init <generator>` scripts:

```
npm init @jamen/js
# Or
npx @jamen/create-js
```

Because these are just CLI scripts, this package gives functions for prompting, writing files, and installing dependencies.

## Install

```
npm i @jamen/create
```

## Usage

This package has many functions, but not a function that puts them all together. Instead, you create your own "template function" that follows this pattern:

```js
async function create () {
    // Get CLI options
    const options = await cli({
        flags: {
            alias: { n: 'name' }
        },
        questions: flags => [
            {
                message: 'This is an example',
                name: 'example',
                type: 'text'
            }
        ]
    })

    // Write files
    await write({
        input: resolve(__dirname, 'files'),
        output: options.output,
        files: [
            {
                input: 'package.json',
                output: 'package.json',
                write: writeJson
            }
        ]
    })

    // Install dependencies
    await npmInstall({
        output: options.output,
        dependencies: [ 'foobar' ],
        devDependencies: [ 'bazqux' ]
    })
}
```

### `cli(options)`

This function collects all the options your template needs from the command-line.

The options are `{ flags, questions }`. The `flags` are options given to [`mri`](https://www.npmjs.com/package/mri) for parsing the arguments, and questions is a list given to [`prompts`](https://www.npmjs.com/package/prompts)

Sometimes questions will depend on flags, so the `questions` can be a function that accepts the flags and returns a list, instead of just a list. `[ ... ]` versus `flags => [ ... ]`.

It returns a Promise of an object with all options your template will use.

```js
const options = await cli({
    flags: {
        alias: { n: 'name' }
    },
    questions: flags => [
        {
            message: 'This is an example',
            name: 'example',
            type: 'text'
        }
    ]
})
```

### `write(options)`

This function writes a list of files, given an input and output directory, and different functions used to write the files in special ways.

The options are `{ input, output, files }`. The `input` is where the source files are coming from, and the `output` are where the files are going to. `files` contains all the relative paths to and from each, along with an optional special write function (e.g. `writeTemplate` or `writeJson`).

It returns a Promise that resolves once all the file operations have finished.

```js
await write({
    input: resolve(__dirname, 'files'),
    output: options.output,
    files: [
        {
            input: 'readme.md',
            output: 'readme.md'
        }
        {
            input: 'package.json',
            output: 'package.json',
            write: writeJson
        }
    ]
})
```

### `writeNormal(input, output)

A simple write function, copying `input` to `output`. Its used by default in `write`.

If the file being written already exists, the function becomes `writeConfirm` instead, prompting if it should be overwritten first. This also applies to the other specialized `write` functions, so it wont be mentioned further.

```js
{
    input: 'readme.md',
    output: 'readme.md',
    write: writeNormal
}
```

### `writeTemplate(options)(input, output)`

Writes a template from the input to the output, rendering it along the way.

The template has access to all the `options` you give it.

```js
{
    input: 'readme.md',
    output: 'readme.md'.
    write: writeTemplate(options)
}
```

### `writeUniqueLines(input, output)`

Write unique lines from input to output. This preserves the output file. Useful with a `.gitignore` for example.

```js
{
    input: '.gitignore',
    output: '.gitignore',
    write: writeUniqueLines
}
```

### `writeJson()`

Writes a JSON input into the JSON output, merging them together. This preserves the output file. Useful with a `package.json` for example.

```js
{
    input: 'package.json',
    output: 'package.json',
    write: writeJson
}
```

### `writeJsonTemplate(options)(input, output)`

Basically `writeTemplate` + `writeJson`.

```js
{
    input: 'package.json',
    output: 'package.json',
    write: writeJsonTemplate(options)
}
```

### `writeConfirm(input, output)`

Confirms if the file should be written. This is used throughout some other write functions, so if the file already exists, it can gracefull overwrite or skip the operation.

```js
{
    input: 'readme.md',
    output: 'readme.md',
    write: writeConfirm
}
```

### `npmInstall(options)`

Install dependencies with npm.

The options are `{ output, dependencies, devDependencies }`. The dependencies are installed into the `output` directory.

It returns a promise that is resolved once install is finished.

```js
await npmInstall({
    output: options.output,
    dependencies: [ 'foobar' ],
    devDependencies: [ 'bazqux' ]
})
```

### `npmName(name)`

Turn strings into npm package names. For example, prompt input or file paths.

```js
npmName('Foo Bar') === 'foo-bar'
```