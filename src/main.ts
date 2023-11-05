import { construtors } from "./construtors";
import { handleTouch, handleMouse, handleGamepadAxis } from "./handlers";
import { ClassGpz, GamepadFSM } from "./interface";

document.addEventListener('DOMContentLoaded', () => {
    const touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel']
    const objects = construtors()
    let gamepadState: GamepadFSM = GamepadFSM.Offline
    
    
    objects.forEach(obj => {
      function eventClean() {
        obj.fingers = []
        obj.draw(obj)
      }
      function eventMouse(event: MouseEvent) {
        obj.fingers = handleMouse(event, obj.canvas)
        obj.draw(obj)
      }
      function eventTouch(event: TouchEvent) {
        obj.canvas.removeEventListener('mouseleave', eventClean)
        obj.canvas.removeEventListener('mousemove', eventMouse)
        obj.fingers = handleTouch(event as TouchEvent, obj.canvas)
        obj.draw(obj)
      }
      function eventGamepad() {
        const axis = handleGamepadAxis(obj.canvas)
        if (axis.length > 0) {
          gamepadState = GamepadFSM.Online
          obj.fingers = axis
          obj.draw(obj)
        }
        if (axis.length === 0 && gamepadState == GamepadFSM.Online) {
          gamepadState = GamepadFSM.Cleanup
          obj.fingers = []
          obj.draw(obj)
        }
      }

      if (obj.type == ClassGpz.Joy) {
        setInterval(eventGamepad, 1000 / 60)
      }

      obj.canvas.addEventListener('mouseleave', eventClean)
      obj.canvas.addEventListener('mousemove', eventMouse)      
      touchEvents.forEach(eventName => obj.canvas.addEventListener(eventName, (event) => eventTouch(event as TouchEvent)))
      
      obj.draw(obj)
    })
})
