var btoa = require('./')

var Suite = require('benchmark').Benchmark.Suite
var bench = new Suite('btoa')

// var text = `Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.`

var text = 'Hello world!'

var officialBtoa = require('btoa')
bench.add('official btoa ', function () {
  officialBtoa(text)
})

var dustinBtoa = btoa.dustin
bench.add('dustin btoa   ', function () {
  dustinBtoa(text)
})

var brandonBtoa = btoa.brandon
bench.add('brandon btoa  ', function () {
  brandonBtoa(text)
})

var jamenBtoa = btoa.jamen
bench.add('jamen btoa    ', function () {
  jamenBtoa(text)
})

bench.on('error', console.error)

bench.on('cycle', function(event) {
  console.log(String(event.target))
})

bench.run()
