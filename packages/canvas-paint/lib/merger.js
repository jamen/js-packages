var Paint = require('./')

module.exports = Merger

function Merger (layers, context) {
  var physical = context.canvas
  return function render () {
    var width = physical.width
    var height = physical.height
    context.clearRect(0, 0, width, height)
    for (var i = 0, max = layers.length; i < max; i++) {
      var layer = layers[i]
      Paint.render(layer)
      context.drawImage(layer.context.canvas, 0, 0, width, height)
    }
  }
}
