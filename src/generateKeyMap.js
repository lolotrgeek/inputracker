const robot = require('robotjs')
const ioHook = require('iohook')
const fs = require('fs')
const { keyNames, mouseNames } = require('./inputNames')
const process = require('process')

function saveMap(jsonString, file) {
    if (!file) file = './keymap.json'
    // if (!file) file = './testmacro' + timestamp
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote ' + jsonString)
        }
    })
}

/**
 * 
 * @reference https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289
 */
function mapInputEvent() {
    let keymap = []
    let mousemap = []
    robot.setKeyboardDelay(1)
    ioHook.start()
    // // press every key, wait for event
    keyNames.map(keyname => {
        ioHook.on('keyup', event => {
            keymap.push({ "name": keyname, "number": event.keycode })
            console.log(' mapped', { "name": keyname, "number": event.keycode })
        })
        robot.keyToggle(keyname, 'up')
        ioHook.removeAllListeners('keyup')
    })
    // press every mousebutton, map button name to button number
    mouseNames.map(name => {
        ioHook.on('mouseup', event => {
            mousemap.push({ "name": name, "number": event.button })
            console.log(' mapped', { "name": keyname, "number": event.button })
        })
        robot.mouseToggle('up', name)
        ioHook.removeAllListeners('mouseup')
    })
    ioHook.stop()
    saveMap(JSON.stringify(keymap), './keymap.json')
    saveMap(JSON.stringify(mousemap), './mousemap.json')
}

mapInputEvent()
process.exit()