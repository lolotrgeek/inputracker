const robot = require('robotjs')
const ioHook = require('iohook')
const fs = require('fs')
const process = require('process')
const EventEmitter = require('events')
const Emitter = new EventEmitter()

// const { mousemap, keymap } = require('./keyMap_manual')
const keymap = require('./maps/keymap.json')
const mousemap = require('./maps/mousemap.json')

function loadMacro(file) {
    fs.readFile(file, (err, data) => {
        if (err) return Error('Error reading file ', err)
        // let json = '[' + data + '{}]' // do this to 'jsonify' the macro string
        // let macro = JSON.parse(json)
        let macro = JSON.parse(data)
        console.log('Successfully read macro')
        // console.log(macro)

        // end promise here
        parseEvents(macro)
    })
}

/**
 * lift all keys
 */
function clearKeys() {
    robot.setKeyboardDelay(1)
    mousemap.map(key => {
        robot.mouseToggle('up', key.name)
    })
    keymap.map(key => {
        robot.keyToggle(key.name, 'up')
    })
    console.log('keys cleared')
}

/**
 * 
 * @param {array} macro array of event objects
 */
function parseEvents(macro) {
    macro.forEach((event, index) => {
        eventDecode(event)
        eventReplay(event)
        if (index + 1 >= macro.length) {
            Emitter.emit('replaydone')
        }
    })
}

/**
 *  Assign names to input numbers
 * @param {object} event 
 */
function eventDecode(event) {
    if (event.type === 'mouseclick') {
        mousemap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousedown') {
        mousemap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mouseup') {
        mousemap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousewheel') {
        mousemap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    //keyboard
    if (event.type === 'keydown') {
        keymap.map(key => {
            if (key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
            event.modified = []
            if (event.shiftKey === true) event.modified.push('shift')
            if (event.altKey === true) event.modified.push('alt')
            if (event.ctrlKey === true) event.modified.push('control')
            if (event.metaKey === true) event.modified.push('command') // also winkey
        })
    }
    if (event.type === 'keyup') {
        keymap.map(key => {
            if (key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
            event.modified = []
            if (event.shiftKey === true) event.modified.push('shift')
            if (event.altKey === true) event.modified.push('alt')
            if (event.ctrlKey === true) event.modified.push('control')
            if (event.metaKey === true) event.modified.push('command') // also winkey
        })
    }
}

function eventReplay(event) {
    robot.setMouseDelay(5)
    robot.setKeyboardDelay(5)
    //mouse
    if (event.type === 'mousemove') {
        robot.moveMouse(event.x, event.y)
        // console.log('mouse move: '+ event.x + ' , ' + event.y)
    }
    if (event.type === 'mousedown') {
        robot.mouseToggle('down', event.name)
        // console.log('mouse click button: ' + event.name)
    }
    if (event.type === 'mouseup') {
        robot.mouseToggle('up', event.name)
        // console.log('mouse click button: ' + event.name)

    }
    if (event.type === 'mouseclick') {
        robot.mouseClick(event.name)
        // console.log('mouse click button: ' + event.name)
    }
    // if (event.type === 'mousedown') 
    // if (event.type === 'mouseup') 
    if (event.type === 'mousedrag') {
        robot.dragMouse(event.x, event.y)
    }
    if (event.type === 'mousewheel') {
        robot.scrollMouse(event.x, event.y)
    }
    //keyboard
    if (event.type === 'keydown') {
        // console.log(event)
        robot.keyToggle(event.name, 'down', event.modified)
    }
    if (event.type === 'keyup') {
        // console.log(event)
        robot.keyToggle(event.name, 'up', event.modified)
    }

}

/**
 * 
 * @param {string} path points to the macro file
 */
function replayMacro(path) {
    console.log('Ready to Replay Macro: `ctrl + f7` to start. `ctrl + f8` to stop.')
    /**
     * start `ctrl` + `f7`
     */
    ioHook.registerShortcut([29, 65], (keys) => {
        console.log('Shortcut start called:', keys)
        loadMacro(path)
    });

    /**
     * stop `ctrl` + `f8`
     * TODO: does not register during a macro, cannot stop while playing...
     */
    ioHook.registerShortcut([29, 66], (keys) => {
        console.log('Shortcut stop called:', keys)
        Emitter.emit('exit')
    });

    ioHook.start()

    Emitter.on('replaydone', () => {
        Emitter.emit('exit')
    })

    // https://stackoverflow.com/a/14032965
    process.stdin.resume();
    function exitHandler() {
        clearKeys()
        process.exit()
    }

    //do something when app is closing
    Emitter.on('exit', exitHandler.bind(null));

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null));
    process.on('SIGUSR2', exitHandler.bind(null));

    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null));
}

module.exports = { replayMacro }