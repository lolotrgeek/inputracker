const robot = require('robotjs')
const ioHook = require('iohook')
const fs = require('fs')
const { keyNames, mouseNames } = require('./inputNames')

function saveMap(jsonString, file) {
    if (!file) file = './keyMap'
    // if (!file) file = './testmacro' + timestamp
    fs.appendFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote ' + jsonString)
        }
    })
}

let events = []

function mapInputEvent() {
    // // press every key, wait for event
    // keyNames.map(name => {
    //     ioHook.on('keydown', event => {
    //         saveMap(JSON.stringify({ "name": name, "number": event.keycode }) + ',')
    //     })
    //     ioHook.start()
    //     robot.keyTap(name)
    //     ioHook.stop()
    // })
    // press every mousebutton, map button name to button number
    mouseNames.map(name => {
        ioHook.on('mouseup', event => {
            events.push(JSON.stringify({ "name": name, "number": event.button }) + ',')
        })
        ioHook.start()
        robot.mouseClick(name)
        
    })
}
mapInputEvent()