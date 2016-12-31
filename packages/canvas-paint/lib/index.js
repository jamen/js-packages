module.exports = Paint
Paint.Merger = require('./merger')
Paint.Manager = require('./manager')
Paint.render = render
Paint.rect = rect
Paint.clear = clear
Paint.text = text
Paint.image = image

var NOOPTS = {}

function Paint (context) {
  context = context || NOOPTS
  if (context.name !== 'CanvasRenderingContext2d') {
    var options = context
    context = document.createElement('canvas').getContext('2d')
    context.canvas.width = options.width || 300
    context.canvas.height = options.height || 300
  }
  return {
    context: context,
    queue: [],
    justRendered: false
  }
}

function render (layer, force) {
  // Exit if we just rendered (nothing in queues)
  var context = layer.context
  var queue = layer.queue
  if (!queue.length && !force) return
  // Render queue
  for (var q = 0, max = queue.length; q < max; q++) {
    var request = queue[q]
    var type = request.type
    var font = request.font
    // Context styles
    if (request.align) context.textAlign = request.align
    if (request.baseline) context.textBaseline = request.baseline
    if (request.direction) context.direction = request.direction
    if (request.fill) context.fillStyle = request.fill
    if (request.stroke) context.strokeStyle = request.stroke
    if (typeof font === 'object') context.font = font.size + 'px ' + font.familiy
    else if (font) context.font = font
    if (type === 'clear') {
      context.clearRect(request.x, request.y, request.width, request.height)
    } else if (type === 'rect') {
      if (request.fill) context.fillRect(request.x, request.y, request.width, request.height)
      if (request.stroke) context.strokeRect(request.x, request.y, request.width, request.height)
    } else if (type === 'text') {
      if (request.fill) context.fillText(request.value, request.x, request.y)
      if (request.stroke) context.strokeText(request.value, request.x, request.y)
    } else if (type === 'image') {
      context.drawImage(request.value, request.x, request.y, request.width, request.height)
    }
  }
  queue.length = 0
}

function rect (layer, request) {
  request = request || {}
  request.type = 'rect'
  request.x = request.x           || 0
  request.y = request.y           || 0
  request.width = request.width   || layer.context.canvas.width
  request.height = request.height || layer.context.canvas.height
  request.fill = request.fill     || 'black'
  layer.queue.push(request)
  return request
}

function clear (layer, request) {
  request = request || {}
  request.type = 'clear'
  request.x = request.x           || 0
  request.y = request.y           || 0
  request.width = request.width   || layer.context.canvas.width
  request.height = request.height || layer.context.canvas.height
  layer.queue.push(request)
  return request
}

function text (layer, request) {
  request = request || {}
  if (typeof request === 'string') request = { value: request }
  request.type = 'text'
  request.x = request.x               || 0
  request.y = request.y               || 0
  request.value = request.value       || ''
  request.font = request.font         || '16px sans-serif'
  request.fill = request.fill         || 'black'
  request.baseline = request.baseline || 'top'
  layer.queue.push(request)
  return request
}

function image (layer, request) {
  request = request || {}
  if (request instanceof window.Image) request = { value: request }
  request.type = 'image'
  request.x = request.x           || 0
  request.y = request.y           || 0
  request.width = request.width   || request.value.width
  request.height = request.height || request.value.height
  layer.queue.push(request)
  return request
}
