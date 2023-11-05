import { Vector2d } from "./interface";

function handleMouse(event: MouseEvent, element: HTMLElement): Vector2d {
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x, y}
}

function handleTouch(event: TouchEvent, element: HTMLElement): Vector2d {
    if (event.touches.length > 0) {
        const rect = element.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;
        return {x, y}
    }
    return {x: 0, y: 0}
}

export {handleMouse, handleTouch}
