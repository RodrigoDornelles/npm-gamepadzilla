import { expect, test } from "bun:test";
import { ClassGpz } from "../src/interface";
import { draw } from "../src/draw"
import { emu } from "../src/emu"

test("core keys", () => {
  const expected = Object.keys(ClassGpz).sort()
  const compare = Object.keys(draw).sort()
  expect(compare).toEqual(expected);
})

test("draw keys", () => {
  const expected = Object.keys(ClassGpz).sort()
  const compare = Object.keys(draw).sort()
  expect(compare).toEqual(expected);
})

test("emu keys", () => {
  const expected = Object.keys(ClassGpz).sort()
  const compare = Object.keys(emu).sort()
  expect(compare).toEqual(expected);
})
