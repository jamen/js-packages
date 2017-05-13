var test = 123

console.log(test)

setTimeout(function () {
  console.log(new Error('foo'))
}, 100)

