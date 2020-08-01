const robot = require('robotjs')
const fs = require('fs')
const { mouseMap, keyMap } = require('./keyMap')

function loadMacro(file) {
    fs.readFile(file, (err, data) => {
        if (err) return Error('Error writing file ', err)
        let json = '[' + data + '{}]' // do this to 'jsonify' the macro string
        let macro = JSON.parse(json)
        console.log('Successfully read macro')
        // console.log(macro)

        // end promise here
        parseEvents(macro)
    })
}

/**
 * 
 * @param {array} macro array of event objects
 */
function parseEvents(macro) {
    macro.map(event => {
        eventDecode(event)
        console.log(event)
        eventReplay(event)
    })
}

/**
 *  maps an event against it's number and assigns a name
 * @param {object} event 
 */
function eventDecode(event) {
    if (event.type === 'mouseclick') {
        mouseMap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousedown') {
        mouseMap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mouseup') {
        mouseMap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousedrag') {
        mouseMap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousewheel') {
        mouseMap.map(key => {
            if (key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    //keyboard
    if (event.type === 'keydown') {
        keyMap.map(key => {
            if (key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
            event.modified = []
            if (event.shiftKey === true) event.modified.push('shift')
            if (event.altKey === true) event.modified.push('alt')
            if (event.ctrlKey === true) event.modified.push('ctrl')
            if (event.metaKey === true) event.modified.push('command') // also winkey
        })
    }
    if (event.type === 'keyup') {
        keyMap.map(key => {
            if (key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
            event.modified = []
            if (event.shiftKey === true) event.modified.push('shift')
            if (event.altKey === true) event.modified.push('alt')
            if (event.ctrlKey === true) event.modified.push('ctrl')
            if (event.metaKey === true) event.modified.push('command') // also winkey
        })
    }
}

function eventReplay(event) {
    //mouse
    if (event.type === 'mousemove') {
        robot.moveMouse(event.x, event.y)
        // console.log('mouse move: '+ event.x + ' , ' + event.y)
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
        robot.keyTap(event.name, event.modified)
    }
    if (event.type === 'keyup') {
        robot.keyToggle(key.name, 'up')
    }

}

loadMacro('./testmacro1572531761008')