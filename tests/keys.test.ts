import { expect, test } from "bun:test";
import { ClassGpz } from "../src/interface";
import { draw } from "../src/draw"

test("draw keys", () => {
  const expected = Object.keys(ClassGpz).sort()
  const compare = Object.keys(draw).sort()
  expect(compare).toEqual(expected);
})

