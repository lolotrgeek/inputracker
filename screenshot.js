const robot = require("robotjs")
const Jimp = require('jimp')

/**
 * 
 * @param {string} filename use MIME type .bmp .jpeg .png .tiff .gif
 * @todo bitmap saves incorrect colors
 * @todo consider making async/promise based
 */
function takeScreenshot(filename) {
    if(!filename) return Error('give filename')
    let img = robot.screen.capture(0, 0)
    let width = img.width
    let height = img.height
    console.log(img.width)
    new Jimp({ data: img.image, width, height }, (err, image) => image.write(filename))
}

module.exports = {
    takeScreenshot: takeScreenshot(filename)
}