enum GamepadFSM {
    Offline = 0,
    Online = 1,
    Cleanup = 2
}

interface Vector2d {
    x: number,
    y: number
}

enum ClassGpz {
    Joy = '.gpz-joy',
    Btn = '.gpz-btn',
}

interface Keycode {
    key: string,
    code: string,
    keyCode: number
}

interface ObjectGpz {
    type: ClassGpz,
    emu(self: ObjectGpz): void,
    core(self: ObjectGpz): void,
    draw(self: ObjectGpz): void,
    canvas: HTMLCanvasElement,
    ctx2d: CanvasRenderingContext2D,
    stateNew: Array<boolean>
    stateOld: Array<boolean>
    fingers: Array<Vector2d>
    fakekeys: Array<Keycode>
}

export  {ClassGpz, ObjectGpz, Vector2d, GamepadFSM, Keycode}
