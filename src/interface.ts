interface Vector2d {
    x: number,
    y: number
}

enum ClassGpz {
    Joy = '.gpz-joy',
    Btn = '.gpz-btn',
}

interface ObjectGpz {
    type: ClassGpz,
    draw(self: ObjectGpz): void,
    canvas: HTMLCanvasElement,
    ctx2d: CanvasRenderingContext2D,
    fingers: Array<Vector2d>
}

export  {ClassGpz, ObjectGpz}