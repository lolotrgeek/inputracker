# Inputracker


## Record Macro
```
node src/recordMacro
```
Start: `ctrl`  + `f7`

Stop: `ctrl`  + `f8`

Save: `ctrl` + `f9`

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
* session replay
* session as state/action
* replay: key flag errors (capitalization in map, modifier keys, ...)