const ioHook = require('iohook')
const keycode = require('keycode')
const robot = require('robotjs')

ioHook.start()

// https://github.com/wilix-team/iohook/pull/65
ioHook.on('keypress', event => {
    console.log(event)
    console.log(keycode(event.rawcode))
})

ioHook.on('keydown', event => {
    console.log(event)
    console.log(keycode(event.rawcode))
})

// https://github.com/octalmage/robotjs/pull/357
robot.unicodeTap(keycode('c'))

ioHook.on('keyup', event => {
    console.log('keyup: ', event)
})

robot.keyToggle('b', 'up')
