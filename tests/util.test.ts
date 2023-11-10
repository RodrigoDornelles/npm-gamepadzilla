import { expect, test } from "bun:test"
import { nestFinger } from '../src/util' 

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
