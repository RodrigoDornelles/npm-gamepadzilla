import { Vector2d } from "./interface";

function handleMouse(event: MouseEvent, element: HTMLElement): Array<Vector2d> {
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [{x, y}]
}

function handleTouch(event: TouchEvent, element: HTMLElement): Array<Vector2d> {
    const fingers: Array<Vector2d> = []
    const rect = element.getBoundingClientRect()

    Array.from(event.touches).forEach(touch => {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        fingers.push({x, y})
    })

    return fingers
}

function handleGamepadAxis(element: HTMLCanvasElement): Array<Vector2d> {
    if (!('getGamepads' in navigator)) {
        return []
    }
    const gamepads = navigator.getGamepads().filter(g => g !== null) as Array<Gamepad>
    const rect = element.getBoundingClientRect()
    const width: number = rect.right - rect.left
    const height: number = rect.bottom - rect.top
    const mapValue = (value: number) => (value + 1) / 2
    const fingers: Array<Vector2d> = []

    gamepads.forEach((gamepad) => {
        const lastOddAxisIndex = gamepad.axes.length - 1;
        for (let pivot = 0; pivot < lastOddAxisIndex; pivot += 2) {
            if (gamepad.axes[pivot] !== 0 || gamepad.axes[pivot + 1] !== 0) {
                const x = mapValue(gamepad.axes[pivot]) * width
                const y = mapValue(gamepad.axes[pivot + 1]) * height
                fingers.push({x, y})
            }
        }
    })

    return fingers
}  

export {handleMouse, handleTouch, handleGamepadAxis}
