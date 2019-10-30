'use strict'
const ioHook = require('iohook')
const fs = require('fs')

function saveMacro(jsonString, file) {
    if (!file) file = './ioHook_macro_' + Date.now().toString() + '.json'
    console.log(file)
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote ' + jsonString)
        }
    })
}


function recordMacro() {


    // timestamp and put event in database
    ioHook.on('any', event => saveMacro(JSON.stringify(event)))
    // ioHook.on('mousemove', event => saveMacro(JSON.stringify(event)))
    // ioHook.on('keydown', event => console.log(event))
    // ioHook.on('mouseclick', event => onMouseClick(event))
    // ioHook.on('mousewheel', event => console.log(event))


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
}


recordMacro()


// Alternatively, pass true to start in DEBUG mode.
  // ioHook.start(true)