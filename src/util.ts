import { Keycode, Vector2d } from "./interface"
import keycodesjson from "../keycodes.json"

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

function getKeyCodes(txt: string): Array<Keycode> {
    const tokens = txt.trim().split(' ').filter(token => token in keycodesjson)
    const keycodes: Array<Keycode> = []

    tokens.forEach(token => {
        keycodes.push({
            code: token,
            key: keycodesjson[token].key,
            keyCode: keycodesjson[token].keyCode,
        })
    })

    return keycodes
}

export {nestFinger, getKeyCodes}