#!/usr/bin/env node
module.exports = main
const argv = process.argv.slice(2)
const EOL = require('os').EOL
main()

function main () {
  if (!argv[0] || !argv[1]) {
    console.error('Provide start and end arguments')
    return process.exit(1)
  }

  const start = parseInt(argv[0])
  const end = parseInt(argv[1])

  // Program heading
  const head = `module.exports=function(s,b){var i=b||0,l=s.length-i;switch(l){`

  // Generate slice cases
  let cases = ''
  for (let i = end; i-- > start;) {
    const selectors = new Array(i + 1).join('s[i++],').slice(0, -1)
    cases += `case ${i}:return [${selectors}];`
  }

  // Handle all other slice cases
  const loop = `for(var a=0,r=new Array(l);a<l;a++)r[a]=s[i+a];return r`

  // Construct file, and log
  console.log(`${head}${cases}};${loop}};`)
}
