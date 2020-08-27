'use strict'
const ioHook = require('iohook')
const screenshot = require('screenshot-desktop')
const fs = require('fs')

const SESSIONSTART = Date.now()

function saveEvent(JSONSTRING, FILE) {
  if (!FILE) FILE = './events'
  fs.appendFile(FILE, JSONSTRING, ERR => {
    if (ERR) {
      console.log('Error writing file', ERR)
    } else {
      console.log('Successfully wrote event' )
    }
  })
}


function recordEvent(EVENT) {
  let TIMESTAMP = Date.now().toString()
  screenshot.all().then((IMG) => {
    saveEvent(JSON.stringify({ timestamp: TIMESTAMP, input: EVENT, screenshot: IMG }))
  }).catch((ERR) => {
    console.log(ERR)
  })
}

function recordEvents() {
  // timestamp and put event in database
  ioHook.on('keydown', event => recordEvent(event))
  ioHook.on('mouseclick', event => recordEvent(event))
  ioHook.on('mousewheel', event => recordEvent(event))

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
}

recordEvents()