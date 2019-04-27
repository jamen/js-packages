#!/usr/bin/env node
const { cli, write, writeTemplate, writeUniqueLines, writeJsonTemplate, npmInstall } = require('@jamen/create')
const { resolve, basename } = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const execAsync = promisify(exec)

async function create () {
    // Start these in parallel right now, normalize their outputs, but await them later.
    const whoami = execAsync('npm whoami').then(x => x.stdout.trim(), () => '')
    const gitName = execAsync('git config user.name').then(x => x.stdout.trim(), () => '')
    const gitEmail = execAsync('git config user.email').then(x => x.stdout.trim(), () => '')
    const npmName = x => basename(x).toLowerCase().replace(/[_\. ]/, '-')

    // Prompt the questions
    const options = await cli({
        questions: flags => [
            {
                message: 'Are you publishing to npm?',
                name: 'public',
                type: 'confirm'
            },
            {
                message: 'What is the name?',
                name: 'name',
                type: 'text',
                initial: async (_, answers) => (
                    answers.public
                        ? `@${await whoami}/${npmName(flags.output)}`
                        : npmName(flags.output)
                )
            },
            {
                message: 'What is the description?',
                name: 'description',
                type: 'text'
            },
            {
                message: 'Who is the author?',
                name: 'author',
                type: 'text',
                initial: async () => {
                    if (await gitName) {
                        let author = await gitName
                        if (await gitEmail) author += ` <${await gitEmail}>`
                        return author
                    }
                }
            },
            {
                message: 'What is the repository?',
                name: 'repository',
                type: (_, answers) => answers.public && 'text'
            },
            {
                message: 'What is the homepage?',
                name: 'homepage',
                type: (_, answers) => answers.public && 'text',
                initial: (_, options) => {
                    const repo = options.repo
                    if (repo) {
                        if (/^http[s]?:\/\//i.test(repo)) {
                            return repo
                        } else if (/^[a-z0-9-_\.]\/[a-z0-9-_\.]$/i.test(repo)) {
                            return `https://github.com/${repo}`
                        }
                    } else {
                        return ''
                    }
                }
            },
            {
                message: 'Is it a command-line script?',
                name: 'cli',
                type: 'confirm',
                initial: false
            }
        ]
    })

    options.main = `src/${basename(options.name)}.js`

    if (options.cli) {
        options.bin = `src/${basename(options.name)}-cli.js`
    }

    // Write the files
    await write({
        input: resolve(__dirname, '../files'),
        output: options.output,
        files: [
            {
                input: 'package.json',
                output: 'package.json',
                write: writeJsonTemplate(options)
            },
            {
                input: '_.gitignore',
                output: '.gitignore',
                write: writeUniqueLines
            },
            {
                input: 'readme.md',
                output: 'readme.md',
                write: writeTemplate(options)
            },
            {
                input: 'src/project.js',
                output: options.main
            },
            options.cli && {
                input: 'src/project-cli.js',
                output: options.bin
            }
        ]
    })

    if (options.cli) {
        await npmInstall({
            output: options.output,
            dependencies: [ 'mri' ]
        })
    }
}

create()