var Paint = require('../')
var Merger = Paint.Merger

// Create canvas element
var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')
canvas.width = 300
canvas.height = 300

var corner = { position: 'absolute', top: 0, left: 0 }
Object.assign(canvas.style, corner)

var image = new window.Image()
image.src = 'https://s-media-cache-ak0.pinimg.com/564x/b5/db/f3/b5dbf33a6e0d077a3c0b530ec8d47d20.jpg'

window.onload = function () {
  document.body.appendChild(canvas)

  // Create layers
  var layers = [ Paint(), Paint(), Paint() ]

  // Paint image background
  Paint.image(layers[0], {
    value: image,
    width: 300,
    height: 250
  })

  // Paint box on 2nd layer
  var box1 = Paint.rect(layers[1], {
    x: 50, y: 50,
    fill: 'rgba(0,255,0,0.3)',
    width: 100,
    height: 100
  })

  // Clone box and paint on 3rd layer
  var box2 = Object.assign({}, box1)
  box2.fill = 'rgba(255,0,0,0.3)'
  box2.x += 50
  box2.y += 50
  Paint.rect(layers[2], box2)

  // Animate box #2's position
  // var t = 0
  // var ang = 2 * Math.PI * 5
  // setInterval(function () {
  //   box2.x += Math.sin(ang * t)
  //   console.log(box2.x.toFixed(20))
  //
  //   // Repaint:
  //   Paint.clear(layers[2])
  //   Paint.rect(layers[2], box2)
  //   t++
  // }, 50)

  // Renderer
  var render = Merger(layers, context)
  ;(function loop () {
    render()
    window.requestAnimationFrame(loop)
  })()
}
