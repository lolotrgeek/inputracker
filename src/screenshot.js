'use strict'
const robot = require("robotjs")
const Jimp = require('jimp')
const screenshot = require('screenshot-desktop')

/**
 * 
 * @param {string} filename use MIME type .bmp .jpeg .png .tiff .gif
 * @todo bitmap saves incorrect colors
 * @todo doesn't capture mouse pixels
 * @todo consider making async/promise based
 */
function robotjs_takeScreenshot(filename) {
    if (!filename) return Error('give filename')
    if (typeof filename !== 'string') return Error('filname must be a string')
    let img = robot.screen.capture(0, 0)
    let width = img.width
    let height = img.height
    console.log(img.width)
    new Jimp({ data: img.image, width, height }, (err, image) => image.write(filename))
}

/**
 * 
 * @param {string} filename use MIME type .bmp .jpeg .png .tiff .gif
 * @todo consider making async/promise based
 */
async function takeScreenshotSave(filename) {
    if (!filename) return Error('give filename')
    if (typeof filename !== 'string') return Error('filname must be a string')
    try {
        let displays = await screenshot.listDisplays()
        // displays: [{ id, name }, { id, name }]
        console.log(displays)
        displays.forEach(async (display, index) => {
            let imgPath = await screenshot({ screen: display.id, filename: filename + index + '.png' })
            console.log(imgPath)
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * 
 * @todo consider making async/promise based
 */
function takeScreenshot() {
    screenshot.all().then((imgs) => {
        console.log(imgs)
    }).catch((err) => {
        console.log(err)
    })
}
module.exports = { takeScreenshot, takeScreenshotSave }