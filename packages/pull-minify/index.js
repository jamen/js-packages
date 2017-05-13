
const { pull, drain } = require('pull-stream')
const imux = require('pull-imux')
const { extname } = require('path')

module.exports = minify
minify.js = require('pull-minify-js')
minify.css = require('pull-minify-css')


function minify (options) {
  if (!options) options = {}
  
  const [transform, channels] = imux({
    js: file => extname(file.path) === '.js',
    css: file => extname(file.path) === '.css',
    // html: file => extname(file.path) === '.html',
  })

  pull(
    channels.js,
    minify.js(options.js),
    channels.js
  )

  pull(
    channels.css,
    minify.css(options.css),
    channels.css
  )

  return transform
}

