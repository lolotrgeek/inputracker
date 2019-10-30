const robot = require('robotjs')
const fs = require('fs')
const { mouseMap, keyMap } = require('./keyMap')

function loadMacro(file) {
    fs.readFile(file, (err, data) => {
        if (err) return Error('Error writing file ', err)
        let json = '[' + data + '{}]'
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
        console.log(event)
        eventReplay(event)
    })
}

function decodeInput(map, input) {
    
}

function eventReplay(event) {
    //mouse
    if (event.type === 'mousemove') {
        robot.moveMouse(event.x, event.y)
    }
    if (event.type === 'mouseclick') {

    }
    if (event.type === 'mousedown') {

    }
    if (event.type === 'mouseup') {

    }
    if (event.type === 'mousedrag') {

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