"use strict";

const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");

const square = async () => {
  await mouse.move(right(500));
  await mouse.move(down(500));
  await mouse.move(left(500));
  await mouse.move(up(500));
};

const openSpotlight = async () => {
  await keyboard.pressKey(Key.LeftSuper);
  await keyboard.pressKey(Key.Space);
  await keyboard.releaseKey(Key.Space);
  await keyboard.releaseKey(Key.LeftSuper);
};

describe("Basic test", () => {
  it("Should run a simple test", async () => {
    await square();
    await openSpotlight();
    await keyboard.type("calculator");
    await keyboard.type(Key.Return);
  });
});