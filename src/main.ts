import { construtors } from "./construtors";
import { handleTouch, handleMouse } from "./handlers";
import { ObjectGpz } from "./interface";
import { installEventGamepad } from "./event_gamepad"

document.addEventListener('DOMContentLoaded', () => {
    const touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel']
    const objects = construtors()

    installEventGamepad(objects, (self: ObjectGpz) => {
      self.draw(self)
      self.emu(self)
    })
    
    objects.forEach(obj => {
      function eventClean() {
        obj.fingers = []
        obj.core(obj)
        obj.draw(obj)
        obj.emu(obj)
      }
      function eventMouse(event: MouseEvent) {
        obj.fingers = handleMouse(event, obj.canvas)
        obj.core(obj)
        obj.draw(obj)
        obj.emu(obj)
      }
      function eventTouch(event: TouchEvent) {
        obj.canvas.removeEventListener('mouseleave', eventClean)
        obj.canvas.removeEventListener('mousemove', eventMouse)
        obj.fingers = handleTouch(event as TouchEvent, obj.canvas)
        obj.core(obj)
        obj.draw(obj)
        obj.emu(obj)
      }
      
      obj.canvas.addEventListener('mouseleave', eventClean)
      obj.canvas.addEventListener('mousemove', eventMouse)      
      touchEvents.forEach(eventName => obj.canvas.addEventListener(eventName, (event) => eventTouch(event as TouchEvent)))
      
      obj.draw(obj)
    })
})
