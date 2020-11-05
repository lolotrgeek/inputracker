const robot = require('robotjs')
const ioHook = require('iohook')
const fs = require('fs')
const { keyNames, mouseNames } = require('./inputNames')
const EventEmitter = require('events')
const process = require('process')
const myEmitter = new EventEmitter()

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
function mapMouse() {
    let mousemap = []
    let index = 0
    // robot.setKeyboardDelay(1)
    // robot.setMouseDelay(1)
    // startKeyListeners('test', mousemap)

    ioHook.start()
    ioHook.on('mouseup', event => {
        myEmitter.emit('mouse', {...event, index})
        index++
    })
    myEmitter.on('mousedone', () => {
        ioHook.stop()
        saveMap(JSON.stringify(mousemap), './mousemap.json')
    })
    robot.mouseToggle('up', mouseNames[index])

    myEmitter.on('mouse', event => {
        // console.log(`${event.index+1}/${mouseNames.length} : `, { "name": mouseNames[event.index], "number": event.button })
        // console.log('next:', mouseNames[index+1] )
        mousemap.push({ "name": mouseNames[event.index], "number": event.button })
        if(index + 1 >= mouseNames.length) {
            myEmitter.emit('done')
            console.log('done') 
        } else {
            robot.mouseToggle('up', mouseNames[index+1])
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
        myEmitter.emit('heard', {...event, index})
        index++
    })
    myEmitter.on('done', () => {
        ioHook.stop()
        saveMap(JSON.stringify(keymap), './keymap.json')
    })
    robot.keyToggle(keyNames[index], 'up')

    myEmitter.on('heard', event => {
        console.log(`${event.index+1}/${keyNames.length} : `, { "name": keyNames[event.index], "number": event.keycode })
        keymap.push({ "name": keyNames[event.index], "number": event.keycode })
        if(index + 1 >= keyNames.length) {
            myEmitter.emit('done')
            console.log('done')
            return
        } else {
            robot.keyToggle(keyNames[index+1], 'up')
        }
        // console.log(keyNames[index], event.keycode);
    });
}

// mapMouse()
mapKeys()

// process.exit()