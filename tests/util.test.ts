import { expect, test } from "bun:test"
import { nestFinger, getKeyCodes } from '../src/util' 
import { KeycodeMap } from "../src/interface"

test('nestFinger should return center when no fingers are provided', () => {
  const center = { x: 0, y: 0 }
  const result = nestFinger(center, [])
  expect(result.dis).toBe(0)
  expect(result.pos).toEqual(center)
})

test('nestFinger should find the closest finger', () => {
  const center = { x: 0, y: 0 }
  const fingers = [
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 2, y: 2 },
  ]
  const result = nestFinger(center, fingers)
  expect(result.dis).toBeCloseTo(Math.sqrt(2))
  expect(result.pos).toEqual({ x: 1, y: 1 })
})

test("getKeyCodes should return an array of keycodes based on the provided KeycodeMap", () => {
  const keycodeMap: KeycodeMap = {
    A: { key: "A", keyCode: 65 },
    B: { key: "B", keyCode: 66 },
    C: { key: "C", keyCode: 67 },
  }

  const inputText = "A B C"
  const result = getKeyCodes(keycodeMap, inputText)

  expect(result).toHaveLength(3)
  expect(result).toEqual([
    { code: "A", key: "A", keyCode: 65 },
    { code: "B", key: "B", keyCode: 66 },
    { code: "C", key: "C", keyCode: 67 },
  ])
})

test("getKeyCodes should filter out tokens not present in the provided KeycodeMap", () => {
  const keycodeMap: KeycodeMap = {
    A: { key: "A", keyCode: 65 },
    B: { key: "B", keyCode: 66 },
  }

  const inputText = "A X B Y"
  const result = getKeyCodes(keycodeMap, inputText)

  expect(result).toHaveLength(2)
  expect(result).toEqual([
    { code: "A", key: "A", keyCode: 65 },
    { code: "B", key: "B", keyCode: 66 },
  ])
})

test("getKeyCodes should handle leading and trailing whitespaces", () => {
  const keycodeMap: KeycodeMap = {
    A: { key: "A", keyCode: 65 },
  }

  const inputText = "  A  "
  const result = getKeyCodes(keycodeMap, inputText)

  expect(result).toHaveLength(1)
  expect(result).toEqual([{ code: "A", key: "A", keyCode: 65 }])
})
