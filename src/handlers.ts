import { Vector2d } from "./interface";

function handleMouse(event: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [{x, y}] as Array<Vector2d>
}

function handleTouch(event: TouchEvent, element: HTMLElement) {
    const fingers: Array<Vector2d> = []
    const rect = element.getBoundingClientRect()

    Array.from(event.touches).forEach(touch => {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        fingers.push({x, y})
    })

    return fingers
}

function handleGamepadAxis(gamepad: Gamepad) {
    const axis: Array<Vector2d> = []

    const lastOddAxisIndex = gamepad.axes.length - 1;
    for (let pivot = 0; pivot < lastOddAxisIndex; pivot += 2) {
        if (gamepad.axes[pivot] !== 0 || gamepad.axes[pivot + 1] !== 0) {
            axis.push({x: gamepad.axes[pivot], y: gamepad.axes[pivot+1]})
        }
    }

    return axis
}

function handleGamepadButtons(gamepad: Gamepad) {
    return gamepad.buttons.map((is, button) => is.pressed && button).filter(id => id !== false) as Array<number>
}

export {handleMouse, handleTouch, handleGamepadAxis, handleGamepadButtons}
