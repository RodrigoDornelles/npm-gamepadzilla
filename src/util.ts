import { Keycode, KeycodeMap, Vector2d, Range } from "./interface"

function interpolation(num: number, input: Range, output: Range): number {
    return (num - input.min) * (output.max - output.min) / (input.max - input.min) + output.min;
}

function clamp(num: number, range: Range): number {
    return Math.min(Math.max(num, range.min), range.max)
}

function normalize(num: number): number {
    return interpolation(clamp(num, {min: 0, max: 1}), {min: 0, max: 1}, {min: -1, max: 1})
}

function desnormalize(num: number): number {
    return interpolation(clamp(num, {min: -1, max: 1}), {min: -1, max: 1}, {min: 0, max: 1})
}

function nestFinger(center: Vector2d, fingers: Array<Vector2d>): {dis: number, pos: Vector2d} {
    if (fingers.length == 0) {
        return {dis: 0, pos: center}
    }

    let shortestDistance : number = Number.MAX_SAFE_INTEGER
    let closestFinger: Vector2d = fingers[0]

    fingers.forEach(finger => {
        const distance = Math.sqrt((finger.x - center.x) ** 2 + (finger.y - center.y) ** 2)
        if (distance < shortestDistance) {
            shortestDistance = distance
            closestFinger = finger
        }
    })

    return {dis: shortestDistance, pos: closestFinger}
}

function getKeyCodes(from: KeycodeMap, txt: string) {
    const tokens = txt.trim().split(' ').filter(token => token in from)
    const keycodes: Array<Keycode> = []

    tokens.forEach(token => {
        keycodes.push({
            code: token,
            key: from[token].key,
            keyCode: from[token].keyCode,
        })
    })

    return keycodes
}

export {nestFinger, getKeyCodes, clamp, interpolation, normalize, desnormalize}