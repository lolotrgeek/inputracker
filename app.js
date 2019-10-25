'use strict'
const ioHook = require('iohook')
const robot = require("robotjs")
const Jimp = require('jimp')

const events = []

/**
 * 
 * @param {string} filename use MIME type .bmp .jpeg .png .tiff .gif
 * @todo bitmap saves incorrect colors
 * @todo consider making async/promise based
 */
function takeScreenshot(filename) {
  if(!filename) filename = Date.now().toString() + '.png'
  console.log(filename)
  let img = robot.screen.capture(0, 0)
  let width = img.width
  let height = img.height
  new Jimp({ data: img.image, width, height }, (err, image) => image.write(filename))
}

function onMouseClick (event) {
  console.log(event)
  takeScreenshot()
}

// timestamp and put event in database
ioHook.on('mousemove', event => console.log(event))
ioHook.on('keydown', event => console.log(event))
ioHook.on('mouseclick', event => onMouseClick(event))
ioHook.on('mousewheel', event => console.log(event))



// input control
ioHook.registerShortcut([29, 65], (keys) => {
  console.log('Shortcut stop called:', keys)
  ioHook.stop()
});

ioHook.registerShortcut([29, 66], (keys) => {
  console.log('Shortcut start called:', keys)
  ioHook.start()
});

// Register and start hook
ioHook.start()


// Alternatively, pass true to start in DEBUG mode.
  // ioHook.start(true)