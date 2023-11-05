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

export {handleMouse, handleTouch}
