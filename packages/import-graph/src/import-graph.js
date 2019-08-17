const { promisify } = require('util')
const { readFile, stat } = require('fs')
const { resolve, extname, dirname, relative, isAbsolute } = require('path')
const { builtinModules } = require('module')

const readFileAsync = promisify(readFile)
const statAsync = promisify(stat)

async function createGraph (entries, options = {}, graph) {
    // Fix or check entir
    if (!Array.isArray(entries)) entries = typeof entries === 'string' && [ entries ]
    if (!entries) throw new Error('Must provide string entry or entries.')

    const { from, ignore, types, colors , patterns } = options
    const ignorePath = new RegExp(ignore)

    // Create graph (used in recursive calls)
    if (!graph) graph = { entries, nodes: [], edges: [] }

    for (let entry of entries) {
        entry = resolve(entry)
        const entryDir = dirname(entry)

        if (ignorePath.test(entry)) continue

        if (!graph.nodes[entry]) {
            const type = types[extname(entry).slice(1)]

            graph.nodes[entry] = {
                type: type,
                label: from ? relative(from, entry) : entry,
                color: colors[type] || colors.unknown
            }
        } else {
            continue
        }

        const imports = await getImports(entry, options)

        for (const imp of imports) {
            const [ impPath, type ] = await resolveModule(imp, entry, entryDir)

            // An external module (i.e. built-in or dependency)
            if (type !== 'normal') {
                // console.log(type)
                if (!graph.nodes[imp]) {
                    graph.nodes[imp] = {
                        type,
                        label: imp,
                        color: colors[type] || colors.unknown
                    }
                }

                graph.edges.push([ entry, imp ])

                continue
            }

            // Normal module (create its imports on the same graph)
            graph.edges.push([ entry, impPath ])
            await createGraph(impPath, options, graph)
        }
    }

    return graph
}

async function createImage (graph, output) {
    output.write('digraph M {\n  node [style=filled shape=box];\n\n')

    for (const node in graph.nodes) {
        const { label, color } = graph.nodes[node]
        output.write(`  "${node}" [label="${label}" color="${color}"]\n`)
    }

    output.write('\n')

    for (const [ src, dest ] of graph.edges) {
        const { color } = graph.nodes[dest]
        output.write(`  "${src}" -> "${dest}" [color="${color}" constraint=${dest.type !== 'external'}]\n`)
    }

    output.end('}')
}

async function getImports (file, options) {
    const type = options.types[extname(file).slice(1)]
    const rules = options.patterns[type]

    if (!type || !rules) {
        return []
    }

    const content = await readFileAsync(file, 'utf8')
    const matches = []

    for (const rule of rules) {
        let next = 0

        while (next !== -1) {
            const match = content.slice(next).match(rule)

            if (match) {
                next += match.index + match[0].length
                matches.push(match[1])
            } else {
                break
            }
        }
    }

    return matches
}

async function resolveModule (imp, entry, dir) {
    if (builtinModules.indexOf(imp) !== -1) {
        return [ imp, 'core' ]
    }

    const impPath = !extname(imp)
        ? resolve(dir, imp) + extname(dir)
        : resolve(dir, imp)

    try {
        const stat = await statAsync(impPath)
        if (stat.isFile()) {
            return [ impPath, 'normal' ]
        }
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e
        }
    }

    try {
        const res = await resolveModule(imp + extname(entry), entry, dir)
        if (res) {
            return res
        }
    } catch (e) {
        if (e.code === 'ENOENT') {
            return [ imp, 'external' ]
        } else {
            throw e
        }
    }
}

function graphvizStyle (object) {
    let out = ''

    for (let name in object) {
        let value = object[name]
        if (typeof value === 'object') {
            out += `${name} [ ${graphvizStyle(value)} ] `
        } else {
            out += `${name}=${value} `
        }
    }

    return out
}

module.exports = {
    createGraph,
    createImage,
    getImports,
    resolveModule,
    graphvizStyle
}