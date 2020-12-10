from pynput import keyboard
import json
from pynputMap import keymap

# keymap = {}
keys = []
modifiers = []

# Work in Progress
# Goal: generate a readable keymap, save it to a file
# https://stackabuse.com/reading-and-writing-lists-to-a-file-in-python/
# https://stackabuse.com/reading-and-writing-json-to-a-file-in-python/


def on_release(key):
    # Convert KeyCode to char https://github.com/moses-palmer/pynput/issues/12

    modifier = str(key).startswith('Key.')
    if modifier is True:
        key = str(str(key).split('.')[1])
        modifiers.append(key)
    else:
        key = key.char
        keys.append(key)

    try:
        print(key, keymap[key])
    except KeyError:
        print('special key')
        
    if key == 'esc':
        # keymap["keys"] = keys
        # keymap["modifiers"] = modifiers
        # print(keymap)
        print(modifiers)

        # with open('keymap.txt', 'w') as filehandle:
        #     for key in keys:
        #         filehandle.write('%s\n' % key)

        return False


# Collect events until released
with keyboard.Listener(
        on_release=on_release) as listener:
    listener.join()

# ...or, in a non-blocking fashion:
# listener = keyboard.Listener(
#     on_release=on_release)
# listener.start()
