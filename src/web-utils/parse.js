const keymap = require('./keymap.json')
const fs = require('fs')

// add action space ids to key/modifiers 

let keys = Object.assign({}, keymap.keys)
// let special = Object.assign({}, keymap.special)
// let modifiers = Object.assign({}, keymap.modifiers)

const JSONSTRING = JSON.stringify({ keys, })
console.log(JSONSTRING)

fs.writeFile('./newmap.json', JSONSTRING, ERR => {
    if (ERR) {
        console.log('Error writing file', ERR)
    } else {
        console.log('Successfully wrote event')
    }
})