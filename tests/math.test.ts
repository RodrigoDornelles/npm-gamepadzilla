import { expect, test } from "bun:test";
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
