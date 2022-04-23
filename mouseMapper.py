from pynput import mouse
mousemap = {"left": 1, "right": 2, "middle": 3}
actions = []

def on_move(x, y):
    # actions.append({"x": x, "y": y})
    print('Pointer moved to {0}'.format(
        (x, y)))

def on_click(x, y, button, pressed):
    btn_name = str(button).startswith('Button.')
    if btn_name is True:
        btn = str(str(button).split('.')[1])
        print(btn, mousemap[btn])
    else:
        print('{0} at {1}'.format(
            'Pressed', button if pressed else 'Released', button,
            (x, y)))
    if not pressed:
        # Stop listener
        print(actions)
        return False

def on_scroll(x, y, dx, dy):
    actions.append({"dx": dx, "dy": dy})
    print('Scrolled {0}.'.format ('down' if dy < 0 else 'up'), dx, dy)

# Collect events until released
with mouse.Listener(
        on_move=on_move,
        on_click=on_click,
        on_scroll=on_scroll) as listener:
    listener.join()

# ...or, in a non-blocking fashion:
# listener = mouse.Listener(
#     on_move=on_move,
#     on_click=on_click,
#     on_scroll=on_scroll)
# listener.start()