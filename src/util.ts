import { Keycode, KeycodeMap, Vector2d } from "./interface"

function interpolation(num: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max)
}

function normalize(num: number): number {
    return interpolation(clamp(num, 0, 1), 0, 1, -1, 1)
}

function desnormalize(num: number): number {
    return interpolation(clamp(num, -1, 1), -1, 1, 0, 1)
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