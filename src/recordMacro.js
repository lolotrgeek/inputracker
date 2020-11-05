'use strict'
const ioHook = require('iohook')
const fs = require('fs')

const timestamp = Date.now().toString()
const events = []

function saveMacro(jsonString, file) {
    // if (!file) file = './testmacro' + timestamp
    if (!file) file = './testmacro'
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            // console.log('Successfully wrote ' + jsonString)
            console.log('Success!')
        }
    })
}

function saveEvent(event) {
    // console.log(event)
    events.push(event)
}

function recordMacro() {
    console.log('Recording Macro: press `ctrl + f9` to save.')
    // record events
    ioHook.on('keyup', event => saveEvent(event))
    ioHook.on('keydown', event => saveEvent(event))
    // ioHook.on('mouseclick', event => saveEvent(event))
    ioHook.on('mousedown', event => saveEvent(event))
    ioHook.on('mouseup', event => saveEvent(event))
    ioHook.on('mousemove', event => saveEvent(event))
    ioHook.on('mousewheel', event => saveEvent(event))
    ioHook.on('mousedrag', event => saveEvent(event))


    // input control
    // TODO: these need to bind from a keymap
    /**
     * start `ctrl` + `f7`
     */
    ioHook.registerShortcut([29, 65], (keys) => {
        console.log('Shortcut start called:', keys)
        ioHook.start()
    });

    /**
     * stop `ctrl` + `f8`
     */
    ioHook.registerShortcut([29, 66], (keys) => {
        console.log('Shortcut stop called:', keys)
        ioHook.stop()
    });

    /**
     * save `ctrl` + `f9`
     */
    ioHook.registerShortcut([29, 67], (keys) => {
        console.log('Shortcut save called:', keys)
        ioHook.stop()
        console.log('Saving...')
        saveMacro(JSON.stringify(events))
    });

    // Register and start hook
    ioHook.start()

    // Alternatively, pass true to start in DEBUG mode.
    // ioHook.start(true)
}


module.exports = {recordMacro}