#!/usr/bin/env node

const parseArgs = require('mri')

const options = parseArgs(
    process.argv.slice(2),
    {
        default: {},
        alias: {},
        boolean: []
    }
)

console.log(options)