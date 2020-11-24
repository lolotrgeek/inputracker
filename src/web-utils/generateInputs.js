const robot = require('robotjs')
const { keyNames, mouseNames } = require('./inputWeb')
const process = require('process')


/**
 * 
 * @reference https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289
 */
function mapMouse() {
    mouseNames.forEach(name => {
        robot.mouseToggle('up', name)
    })
}

/**
 * 
 * @reference https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289
 */
function pressKeys() {
    keyNames.forEach(name => {
        robot.keyToggle(name, 'up')
    })
}


// mapMouse()
pressKeys()