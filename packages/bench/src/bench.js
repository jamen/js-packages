const Suite = require('benchmark').Benchmark.Suite
const { cpu, mem } = require('systeminformation')
const bytes = require('prettier-bytes')

// From https://github.com/bestiejs/benchmark.js/blob/6c0a63c15f7338086923fab47952862ee9fae1c4/benchmark.js#L792
function formatNumber(s) {
    let n = String(s).split('.')
    return n[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (n[1] ? '.' + n[1] : '')
}

// From https://github.com/dcousens/ordinal/tree/4060975c449edacf73c88df212e33c365883d471
function ordinal(i) {
    var cent = i % 100
    if (cent >= 10 && cent <= 20) return 'th'
    var dec = i % 10
    if (dec === 1) return 'st'
    if (dec === 2) return 'nd'
    if (dec === 3) return 'rd'
    return 'th'
}

function benchmark() {
    let bench = new Suite()
    let longestName = null

    bench.on('cycle', e => {
        let benchmark = e.target
        let nextBenchmark = bench[benchmark.id] // this weird, but work

        let opsec = formatNumber(benchmark.hz.toFixed(benchmark.hz < 100 ? 2 : 0))
        let rme = benchmark.stats.rme.toFixed(2)
        let size = benchmark.stats.sample.length
        let sampled = `(${size} run${size === 1 ? '' : 's'})`

        process.stdout.write(`${opsec} op/sec \xb1${rme}% ${sampled}\n`)
        if (nextBenchmark) printName(nextBenchmark)
    })

    function printName(benchmark) {
        let name = benchmark.name || ordinal(benchmark.id)
        name = name + new Array(longestName - name.length).join(' ')
        process.stdout.write(`${name} - `)
    }

    bench.on('error', e => console.error(e))

    bench.on('complete', () => console.log())

    let run = bench.run.bind(bench)

    bench.run = options => {
        for (let i = 0; i < bench.length; i++) {
            let benchmark = bench[i]
            if (benchmark.name.length > longestName) {
                longestName = benchmark.name.length + 1
            }
        }

        console.log()

        cpu(a => {
            mem(b => {
                console.log(`${a.speed} GHz ${a.manufacturer} ${a.brand}, ${bytes(b.total)} of memory`)
                console.log(`Node.js ${process.versions.node} (v8 engine ${process.versions.v8})\n`)
                printName(bench[0])
                run(options)
            })
        })
    }

    return bench
}

module.exports = benchmark