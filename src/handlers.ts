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

function handleGamepadAxis(gamepad: Gamepad): Array<Vector2d> {
    const axis: Array<Vector2d> = []

    const lastOddAxisIndex = gamepad.axes.length - 1;
    for (let pivot = 0; pivot < lastOddAxisIndex; pivot += 2) {
        if (gamepad.axes[pivot] !== 0 || gamepad.axes[pivot + 1] !== 0) {
            axis.push({x: gamepad.axes[pivot], y: gamepad.axes[pivot+1]})
        }
    }

    return axis
}

function handleGamepadButtons(gamepad: Gamepad): Array<Number> {
    return gamepad.buttons.filter(is => is.pressed).map((_, button) => button)
}

export {handleMouse, handleTouch, handleGamepadAxis, handleGamepadButtons}
