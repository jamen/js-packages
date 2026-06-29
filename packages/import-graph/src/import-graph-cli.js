#!/usr/bin/env node

const parseArgs = require('mri')
const { createWriteStream } = require('fs')
const { createGraph, createImage } = require('./import-graph.js')

const defaults = {
    types: {
        js: 'javascript',
        es6: 'javascript',
        es: 'javascript',
        mjs: 'javascript',
        json: 'json',
        ts: 'typescript',
        css: 'css',
        scss: 'css',
        sass: 'css',
        less: 'css',
        styl: 'css',
        wasm: 'webassembly',
        wat: 'webassembly',
        c: 'webassembly',
        cpp: 'webassembly',
        cc: 'webassembly',
        rs: 'webassembly',
        html: 'html'
    },
    colors: {
        // Categories
        javascript: '#a3be8c',
        json: '#a3be8c',
        typescript: '#96b5b4',
        css: '#b48ead',
        webassembly: '#8fa1b3',
        html: '#ebcb8b',
        // Extras
        external: '#a7adba',
        core: '#eff1f5',
        unknown: '#d08770'
    },
    patterns: {
        javascript: [
            /import.+from\s*['"](.*)['"]/,
            /export.+from\s*['"](.*)['"]/,
            /require\(['"](.*)['"]\)/
        ],
        typescript: [
            /import.+from\s*['"](.*)['"]/,
            /export.+from\s*['"](.*)['"]/,
            /require\(['"](.*)['"]\)/
        ],
        json: [
            /"main"\s*:\s*"(.*)"/,
            /"module"\s*:\s*"(.*)"/,
            /"jsnext:main"\s*:\s*"(.*)"/,
            /"bin"\s*:\s*"(.*)"/,
            /"typings"\s*:\s*"(.*)"/
        ],
        css: [
            /@import ['"]?(.*)['"]?/
        ]
    },
    from: process.cwd(),
    ignore: 'node_modules|\\.git',
    keep: false
}

async function main (argv) {
    const input = parseArgs(argv, {
        alias: {
            from: 'f',
            output: 'o',
            ignore: 'i'
        }
    })

    let options = Object.assign({}, defaults, input)
    let entries = options._

    if (Array.isArray(options.ignore)) {
        options.ignore = options.ignore.join('|')
    }

    if (!options.keep && options.ignore !== defaults.ignore) {
        options.ignore += '|' + defaults.ignore
    }

    if (!entries.length) {
        entries.push('package.json')
    }

    await createImage(
        await createGraph(entries, options),
        options.output
            ? createWriteStream(options.output)
            : createWriteStream(null, { fd: 1 })
    )
}

main(process.argv.slice(2)).catch(err => {
    console.error(err)
    process.exit(1)
})