from multiprocessing import Process, Queue
from pynput import mouse , keyboard
from screenshots import save, grab
from tracker import on_click, on_press, on_scroll, on_move , on_release

def record(queue) :
    # Collect events until released
    with mouse.Listener(
            on_move=on_move,
            on_click=on_click,
            on_scroll=on_scroll) as listener:
        listener.join()

    # ...or, in a non-blocking fashion:
    listener = mouse.Listener(
        on_move=on_move,
        on_click=on_click,
        on_scroll=on_scroll)
    listener.start()

    # Collect events until released
    with keyboard.Listener(
            on_press=on_press,
            on_release=on_release) as keylisten:
        keylisten.join()

    # ...or, in a non-blocking fashion:
    keylisten = keyboard.Listener(
        on_press=on_press,
        on_release=on_release)
    keylisten.start()
    
if __name__ == "__main__":
    # The screenshots queue
    queue = Queue()  # type: Queue

    record(queue)

    # 3 processes: one for parsing inputs, one for grabing and one for saving PNG files
    Process(target=save, args=(queue,)).start()