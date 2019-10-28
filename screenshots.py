import mss
import mss.tools
from PIL import Image

def grab(queue):
    # type: (Queue) -> None

    rect = {"top": 0, "left": 0, "width": 600, "height": 800}

    with mss.mss() as sct:
        for _ in range(1_000):
            queue.put(sct.grab(rect))

    # Tell the other worker to stop
    queue.put(None)


def save(queue):
    # type: (Queue) -> None

    number = 0
    output = "screenshots/file_{}.png"
    to_png = mss.tools.to_png

    while "there are screenshots":
        img = queue.get()
        if img is None:
            break

        # Uses Pillow for tensorflow RGB conversion
        # Image.frombytes('RGB', im.size, im.bgra, 'raw', 'BGRX').tobytes()

        to_png(img.rgb, img.size, output=output.format(number))
        number += 1