'use strict'
const ioHook = require('iohook')
const screenshot = require('screenshot-desktop')
const fs = require('fs')

const SESSIONSTART = Date.now()
const EVENTS = []
let INTERVAL

function storeSession(JSONSTRING, FILE) {
    if (!FILE) FILE = './events'
    fs.writeFile(FILE, JSONSTRING, ERR => {
        if (ERR) {
            console.log('Error writing file', ERR)
        } else {
            console.log('Successfully wrote event')
        }
    })
}

function saveEvent(event) {
    // console.log(event)
    EVENTS.push(event)
}

/**
 * 
 * @param {number} fps frames per second
 */
function setFramerate(fps) {
    return 1000 / fps
}

function recordScreen() {
    console.log('recording...')
    let fps = setFramerate(30)
    INTERVAL = setTimeout(() => {
        screenshot.all().then((IMG) => {
            saveEvent(JSON.stringify({ timestamp: Date.now(), screenshot: IMG }))
        }).catch((ERR) => {
            console.log(ERR)
        })
    }, fps)
}

function recordEvents() {
    console.log('Recording Macro: press `ctrl + f9` to save.')
    // record events
    ioHook.on('keyup', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('keydown', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('mousedown', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('mouseup', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('mousemove', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('mousewheel', event => saveEvent({...event, timestamp: Date.now()}))
    ioHook.on('mousedrag', event => saveEvent({...event, timestamp: Date.now()}))
    recordScreen()
    // input control
    // TODO: these need to bind from a keymap

    /**
     * stop `ctrl` + `f8`
     */
    ioHook.registerShortcut([29, 66], (keys) => {
        console.log('Shortcut stop called:', keys)
        ioHook.stop()
        clearInterval(INTERVAL)
    });

    /**
     * save `ctrl` + `f9`
     */
    ioHook.registerShortcut([29, 67], (keys) => {
        console.log('Shortcut save called:', keys)
        ioHook.stop()
        clearInterval(INTERVAL)
        console.log('Saving...')
        storeSession(JSON.stringify(EVENTS)) // TODO: pipe this via buffer...
    });

    // Register and start hook
    ioHook.start()

    // Alternatively, pass true to start in DEBUG mode.
    // ioHook.start(true)
}

module.exports = { recordEvents }