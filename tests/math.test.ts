import { expect, test } from "bun:test"
import { angleInRadians, polyTransform } from "../src/math"
import { interpolation, clamp, normalize, desnormalize } from '../src/util' 

test('should interpolate correctly', () => {
    expect(interpolation(0.5, {min: 0, max: 1}, {min: 0, max: 10})).toBe(5)
    expect(interpolation(75, {min: 0, max: 100}, {min: 0, max: 10})).toBe(7.5)
})

test('should clamp values correctly', () => {
    expect(clamp(5, {min: 0, max: 10})).toBe(5)
    expect(clamp(-5, {min: 0, max: 10})).toBe(0)
    expect(clamp(15, {min: 0, max: 10})).toBe(10)
})

test('should normalize values correctly', () => {
    expect(normalize(0)).toBe(-1)
    expect(normalize(0.5)).toBe(0)
    expect(normalize(1)).toBe(1)
})

test('should desnormalize values correctly', () => {
    expect(desnormalize(-1)).toBe(0)
    expect(desnormalize(0)).toBe(0.5)
    expect(desnormalize(1)).toBe(1)
})

test("converts degrees to radians", () => {
    expect(angleInRadians(0)).toBe(0)
    expect(angleInRadians(90)).toBeCloseTo(Math.PI / 2)
    expect(angleInRadians(180)).toBeCloseTo(Math.PI)
    expect(angleInRadians(360)).toBeCloseTo(2 * Math.PI)
})

test("transforms a polygon correctly", () => {
    const polygon = [
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
    ]

    const offset = { x: 10, y: 10 }
    const size = { x: 2, y: 2 }
    const angle = Math.PI / 2

    const transformedPoly = polyTransform(polygon, offset, size, angle)

    expect(transformedPoly[0]).toEqual({x: 12, y: 8})
    expect(transformedPoly[1]).toEqual({x: 8, y: 8})
    expect(transformedPoly[2]).toEqual({x: 12, y: 12})
    expect(transformedPoly[3]).toEqual({x: 8, y: 12})
})
