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
            if(key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousedown') {
        mouseMap.map(key => {
            if(key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mouseup') {
        mouseMap.map(key => {
            if(key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousedrag') {
        mouseMap.map(key => {
            if(key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'mousewheel') {
        mouseMap.map(key => {
            if(key.number === event.button) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    //keyboard
    if (event.type === 'keydown') {
        keyMap.map(key => {
            if(key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
        })
    }
    if (event.type === 'keyup') {
        keyMap.map(key => {
            if(key.number === event.keycode) {
                //add key name to event
                event.name = key.name
            }
        })
    }  
}

function eventReplay(event) {
    //mouse
    if (event.type === 'mousemove') {
        robot.moveMouse(event.x, event.y)
    }
    if (event.type === 'mouseclick') {
        robot.moveMouse(event.x, event.y)
    }
    if (event.type === 'mousedown') {

    }
    if (event.type === 'mouseup') {

    }
    if (event.type === 'mousedrag') {
        robot.dragMouse(event.x, event.y)
    }
    if (event.type === 'mousewheel') {

    }
    //keyboard
    if (event.type === 'keydown') {

    }
    if (event.type === 'keyup') {

    }

}

loadMacro('./testmacro')