import { expect, test } from "bun:test"
import { handleMouse, handleTouch, handleGamepadAxis, handleGamepadButtons } from '../src/handlers'

const handleMouseMock = (ev: any, el: any) => handleMouse(ev, el)
const handleTouchMock = (ev: any, el: any) => handleTouch(ev, el)
const handleGamepadAxisMock = (g: any) => handleGamepadAxis(g)
const handleGamepadButtonsMock = (g: any) => handleGamepadButtons(g)

test('handleMouse should return an array with one Vector2d', () => {
  const event = {clientX: 20, clientY: 30}
  const element = {getBoundingClientRect: () => ({left: 10, top: 5})}
  const result = handleMouseMock(event, element)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({ x: 10, y: 25 })
})

test('handleTouch should return an array of Vector2d', () => {
  const element = { getBoundingClientRect: () => ({ left: 10, top: 5 }) }
  const event = {touches: [{ clientX: 10, clientY: 20 }, { clientX: 30, clientY: 40 }]}
  const result = handleTouchMock(event, element)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({ x: 0, y: 15 })
  expect(result[1]).toEqual({ x: 20, y: 35 })
})

test('handleGamepadAxis should return an array of Vector2d', () => {
  const gamepad = {axes: [0.5, 0.7, 0, 0, -0.1, 0]}
  const result = handleGamepadAxisMock(gamepad)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({ x: 0.5, y: 0.7 })
  expect(result[1]).toEqual({ x: -0.1, y: 0 })
})

test('handleGamepadButtons should return an array of pressed button indices', () => {
  const gamepad = {buttons: [{ pressed: false }, { pressed: false }, { pressed: true }]}
  const result = handleGamepadButtonsMock(gamepad)
  expect(result).toHaveLength(1)
  expect(result[0]).toBe(2)
})
