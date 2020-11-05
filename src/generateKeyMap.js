const robot = require('robotjs')
const ioHook = require('iohook')
const fs = require('fs')
const { keyNames, mouseNames } = require('./inputNames')
const process = require('process')
const EventEmitter = require('events')
const Emitter = new EventEmitter()
const KeyEmitter = new EventEmitter()
const MouseEmitter = new EventEmitter()

/**
 * 
 * @param {string} jsonString an array string of `{name, number}` objects 
 * @param {string} type `mouse` or `key` 
 */
function saveMap(jsonString, type) {
    if (!type) console.log('Error, provide type `mouse` or `key`')
    let file = `./${type}map.json`
    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote ' + jsonString)
            Emitter.emit('saved', type)
        }
    })
}

/**
 * 
 * @reference https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289
 */
function mapMouse() {
    let mousemap = []
    let index = 0
    // robot.setKeyboardDelay(1)
    // robot.setMouseDelay(1)
    // startKeyListeners('test', mousemap)

    ioHook.start()
    ioHook.on('mouseup', event => {
        MouseEmitter.emit('mouse', { ...event, index })
        index++
    })
    MouseEmitter.on('done', () => {
        ioHook.stop()
        saveMap(JSON.stringify(mousemap), 'mouse')
    })
    robot.mouseToggle('up', mouseNames[index])

    MouseEmitter.on('mouse', event => {
        // console.log(`${event.index+1}/${mouseNames.length} : `, { "name": mouseNames[event.index], "number": event.button })
        // console.log('next:', mouseNames[index+1] )
        mousemap.push({ "name": mouseNames[event.index], "number": event.button })
        if (index + 1 >= mouseNames.length) {
            MouseEmitter.emit('done')
            console.log('done')
        } else {
            robot.mouseToggle('up', mouseNames[index + 1])
        }

    });
}

/**
 * 
 * @reference https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289
 */
function mapKeys() {
    let keymap = []
    let index = 0
    // robot.setKeyboardDelay(1)
    // robot.setMouseDelay(1)
    // startKeyListeners('test', keymap)

    ioHook.start()

    ioHook.on('keyup', event => {
        KeyEmitter.emit('heard', { ...event, index })
        index++
    })
    KeyEmitter.on('done', () => {
        ioHook.stop()
        saveMap(JSON.stringify(keymap), 'key')
    })
    robot.keyToggle(keyNames[index], 'up')

    KeyEmitter.on('heard', event => {
        console.log(`${event.index + 1}/${keyNames.length} : `, { "name": keyNames[event.index], "number": event.keycode })
        keymap.push({ "name": keyNames[event.index], "number": event.keycode })
        if (index + 1 >= keyNames.length) {
            KeyEmitter.emit('done')
            console.log('done')
            return
        } else {
            robot.keyToggle(keyNames[index + 1], 'up')
        }
        // console.log(keyNames[index], event.keycode);
    });
}


mapMouse()
Emitter.on('saved', event => {
    if (event === 'mouse') mapKeys()
    else process.exit()
})