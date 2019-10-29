'use strict'
const ioHook = require('iohook')
const {takeScreenshot} = require('./screenshot')

const events = []


function onMouseClick (event) {
  let timestamp = Date.now().toString()
  let filename = timestamp  + '.jpg'
  console.log([timestamp, event])
  takeScreenshot(filename)
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