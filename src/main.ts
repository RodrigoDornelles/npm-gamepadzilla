import { construtors } from "./construtors";
import { handleTouch, handleMouse } from "./handlers";

document.addEventListener('DOMContentLoaded', () => {
    const touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel']
    const objects = construtors()
    
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
      obj.canvas.addEventListener('mouseleave', eventClean)
      obj.canvas.addEventListener('mousemove', eventMouse)
      touchEvents.forEach(eventName => obj.canvas.addEventListener(eventName, (event) => eventTouch(event as TouchEvent)))
    
      obj.draw(obj)
    })
})
