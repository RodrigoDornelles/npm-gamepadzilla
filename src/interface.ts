export enum EventGpz {
    Startup,
    Touch,
    Gamepad,
    Keyboard
}

export enum GamepadFSM {
    Offline = 0,
    Online = 1,
    Cleanup = 2
}

export enum TouchEvents {
    Start = 'touchstart',
    Move = 'touchmove',
    End = 'touchend',
    Cancel = 'touchcancel'
}

export enum MouseEvents {
    Move = 'mousemove',
    Leave = 'mouseleave'
}

export interface Range {
    min: number,
    max: number
}

export interface Vector2d {
    x: number,
    y: number
}

export enum ClassGpz {
    Joy = '.gpz-joy',
    Btn = '.gpz-btn',
}

export interface Keycode {
    key: string,
    code: string,
    keyCode: number
}

export type KeycodeMap = {
    [key: string]: {
        key: string,
        keyCode: number
    }
}

export interface ObjectGpz {
    type: ClassGpz,
    from: EventGpz,
    emu(self: ObjectGpz): void,
    core(self: ObjectGpz): void,
    draw(self: ObjectGpz): void,
    canvas: HTMLCanvasElement,
    ctx2d: CanvasRenderingContext2D,
    stateNew: Array<boolean>
    stateOld: Array<boolean>
    fingers: Array<Vector2d>
    fakekeys: Array<Keycode>
    axis2d: Vector2d | null
    buttons: Array<boolean> | null
    chain: Array<(self: ObjectGpz) => void>
}
