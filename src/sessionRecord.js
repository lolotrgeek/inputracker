'use strict'
const ioHook = require('iohook')
// const screenshot = require('screenshot-desktop')
const recordScreen = require('record-screen')
const fs = require('fs')

const SESSIONSTART = Date.now()
const STATE = []
let EVENTS = []
let INTERVAL

function storeSession(JSONSTRING, FILE) {
    if (!FILE) FILE = './events.json'
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

function saveState(action) {
    // console.log(event)
    STATE.push(action)
}


/**
 * 
 * @param {number} fps frames per second
 */
function setFramerate(fps) {
    return 1000 / fps
}
function recordEvents() {
    console.log('recording events...')
    let fps = setFramerate(30)
    let timestamp
    console.log(fps)
    INTERVAL = setInterval(() => {
        timestamp = Date.now()
        saveState(JSON.stringify({ timestamp: Date.now(), screenshot: 'IMG', actions: EVENTS }))
        console.log('Cached', EVENTS.length)
        EVENTS = []
        // screenshot.all().then((IMG) => {
        //     saveState(JSON.stringify({ timestamp: Date.now(), screenshot: 'IMG' }))
        //     // console.log('Cached', EVENTS.length)
        //     // EVENTS = []
        // }).catch((ERR) => {
        //     console.log(ERR)
        // })
    }, fps)
}
function recordScreen() {
    // TODO: use ffmpeg to record, instead of bitmaps
    console.log('recording screen...')
  .then(result => {
    // Screen recording is done
    process.stdout.write(result.stdout)
    process.stderr.write(result.stderr)
  })
  .catch(error => {
    // Screen recording has failed
    console.error(error)
  })

}

function sessionRecord() {
    console.log('Recording Session: press `ctrl + f9` to save.')
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

module.exports = { sessionRecord }