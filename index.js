const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js")

/**
 * 
 * @param {number} fps frames per second
 */
function framerate(fps) {
    return 1000 / fps
}

// console.log(framerate(30))

function capture() {
    setInterval(() => {
        screen.capture(`${Date.now()}`, '.png', './screenshots')
    }, framerate(30))
}

capture()