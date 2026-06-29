const { promisify } = require('util')
const prompts = require('prompts')
const mkdirp = require('mkdirp')
const template = require('lodash.template')
const { resolve, dirname, basename } = require('path')
const { readFile, writeFile, copyFile, constants } = require('fs')
const { spawn } = require('child_process')
const parseArgs = require('mri')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
const copyFileAsync = promisify(copyFile)
const mkdirpAsync = promisify(mkdirp)

async function write (options) {
    const input = options.input
    const output = options.output
    const files = options.files

    for (const file of files) {
        if (!file) continue

        const inputFile = resolve(input, file.input)
        const outputFile = resolve(output, file.output)
        const writer = file.write ? file.write : writeNormal

        await writer(inputFile, outputFile)
    }
}

async function cli (options) {
    const flags = parseArgs(process.argv.slice(2), options.flags)

    flags.output = resolve(flags.output || flags._[0] || process.cwd())

    let questions = options.questions

    if (typeof questions === 'function') {
        questions = await questions(flags)
    }

    const answers = await prompts(questions, {
        onCancel () {
            console.log('Stopping. Goodbye!')
            process.exit(0)
        }
    })

    return Object.assign(flags, answers)
}

async function writeNormal (input, output) {
    await mkdirpAsync(dirname(output))

    if (typeof input === 'string') {
        try {
            return await copyFileAsync(input, output, constants.COPYFILE_EXCL)
        } catch (error) {
            if (error.code !== 'EEXIST') {
                throw error
            }
        }
    }

    try {
        return await writeFileAsync(output, Buffer.from(input), { flag: 'wx' })
    } catch (error) {
        if (error.code === 'EEXIST') {
            return writeConfirm(input, output)
        }

        throw error
    }
}

function writeTemplate (options) {
    return async function (input, output) {
        if (typeof input === 'string') {
            input = await readFileAsync(input)
        }

        input = template(Buffer.from(input).toString())({ answers: options })

        try {
            await mkdirpAsync(dirname(output))
            return await writeFileAsync(output, input, { flag: 'wx' })
        } catch (error) {
            if (error.code === 'EEXIST') {
                return writeConfirm(input, output)
            }

            throw error
        }
    }
}

async function writeConfirm (input, output) {
    await mkdirpAsync(dirname(output))

    const { should } = await prompts({
        name: 'should',
        type: 'confirm',
        message: 'Overwrite ' + output + '?',
        value: false
    },  {
        onCancel () {
            console.log('Stopping. Goodbye!')
            process.exit(0)
        }
    })

    if (should) {
        if (typeof input === 'string') {
            return copyFileAsync(input, output, constants.COPYFILE_FICLONE)
        }

        return writeFileAsync(output, input)
    }
}

async function writeUniqueLines (input, output) {
    let outputData

    try {
        outputData = await readFileAsync(output, { encoding: 'utf8' })
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
    }

    if (outputData) {
        const inputData = await readFileAsync(input, { encoding: 'utf8' })

        const result = outputData.split('\n')

        for (const candidate of inputData.split('\n')) {
            if (result.indexOf(candidate) === -1) {
                result.push(candidate)
            }
        }

        await mkdirpAsync(dirname(output))
        return writeFileAsync(output, result.join('\n'))
    } else {
        return writeNormal(input, output)
    }
}

async function writeJson (input, output) {
    let outputData

    try {
        outputData = JSON.parse(await readFileAsync(output, { encoding: 'utf8' }))
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
    }

    let inputData = JSON.parse(await readFileAsync(input, { encoding: 'utf8' }))

    if (outputData) {
        inputData = Object.assign(outputData, inputData)
    }

    await mkdirpAsync(dirname(output))
    return writeFileAsync(output, JSON.stringify(inputData, null, 4))
}

function writeJsonTemplate (options) {
    return async function (input, output) {
        let outputData

        try {
            outputData = JSON.parse(await readFileAsync(output, { encoding: 'utf8' }))
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error
            }
        }

        let inputData = JSON.parse(
            template(
                await readFileAsync(input, { encoding: 'utf8' })
            )({ answers: options })
        )

        if (outputData) {
            inputData = Object.assign(outputData, inputData)
        }

        await mkdirpAsync(dirname(output))
        return writeFileAsync(output, JSON.stringify(inputData, null, 4))
    }
}

function npmName (x) {
    return basename(x).toLowerCase().replace(/[_\. ]/, '-')
}

function npmInstall (options) {
    let devsFirst = Promise.resolve()

    if (options.devDependencies) {
        devsFirst = new Promise(resolve => {
            const proc = spawn('npm', [ 'i', '-D', ...options.devDependencies ], {
                cwd: options.output,
                stdio: 'inherit'
            })

            proc.on('exit', () => {
                resolve()
            })
        })
    }

    return devsFirst.then(() => {
        if (options.dependencies) {
            return new Promise(resolve => {
                const proc = spawn('npm', [ 'i', ...options.dependencies ], {
                    cwd: options.output,
                    stdio: 'inherit'
                })

                proc.on('exit', () => {
                    resolve()
                })
            })
        }
    })
}

module.exports = {
    cli,
    write,
    writeNormal,
    writeTemplate,
    writeConfirm,
    writeUniqueLines,
    writeJson,
    writeJsonTemplate,
    npmName,
    npmInstall
}