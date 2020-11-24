const keymap = require('./keymap.json')
const fs = require('fs')

// add action space ids to key/modifiers 

let keys = Object.assign({}, keymap.keys)
let modifiers = Object.assign({}, keymap.modifiers)

const JSONSTRING = JSON.stringify({ keys, modifiers})
console.log(JSONSTRING)

fs.writeFile('./newmap.json', JSONSTRING, ERR => {
    if (ERR) {
        console.log('Error writing file', ERR)
    } else {
        console.log('Successfully wrote event')
    }
})