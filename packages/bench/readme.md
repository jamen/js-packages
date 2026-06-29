# @jamen/bench

A [benchmark.js][benchmark.js] reporter.

![](./demo.gif)

## Usage

### `benchmark()`

Creates a `Benchmark.Suite` that does the reporting for you. See [benchmark.js's docs][benchmark-docs] for more info.

```js
let bench = benchmark()

bench.add('foobar', () => {
  foobar()
})

bench.run()
```

[benchmark.js]: https://github.com/bestiejs/benchmark.js
[benchmark-docs]: https://benchmarkjs.com/docs