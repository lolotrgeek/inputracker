'use strict'
const ioHook = require('iohook')
const fs = require('fs')

const timestamp = Date.now().toString()

function saveMacro(jsonString, file) {
    if (!file) file = './testmacro' + timestamp
    fs.appendFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote ' + jsonString)
        }
    })
}
function recordMacro() {

    // record events
    ioHook.on('mouseclick', event => saveMacro(JSON.stringify(event) + ','))
    ioHook.on('mousemove', event => saveMacro(JSON.stringify(event) + ','))
    ioHook.on('keydown', event => saveMacro(JSON.stringify(event) + ','))
    ioHook.on('mousewheel', event => saveMacro(JSON.stringify(event) + ','))


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


module.exports = {
    recordMacro : recordMacro
}
recordMacro()


