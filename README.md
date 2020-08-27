# Inputracker


## Record Macro
```
node src/recordMacro
```
Start : `ctrl`  + `f8`

Stop : `ctrl`  + `f7`


## Replay Macro
```
node src/replayMacro
```


## Goals
1. record inputs
2. take screenshots of interactions
3. be resource efficient

## Dependencies
https://github.com/wilix-team/iohook

https://github.com/oliver-moran/jimp

https://github.com/octalmage/robotjs

https://github.com/bencevans/screenshot-desktop

## Todo
* make collection async and/or threaded
* speed up macro replay (maybe skip frames)
* generate keymap
* replay: key flag errors (capitalization in map, modifier keys, ...)
* replay: mousedrag errors (misses dragging) 