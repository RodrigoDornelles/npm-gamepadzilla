import { construtors } from "./construtors";
import { handleTouch, handleMouse } from "./handlers";

document.addEventListener('DOMContentLoaded', () => {
    const touchEvents = ['touchstart', 'touchend', 'touchcancel', 'touchmove']
    const objects = construtors()
    objects.forEach(obj => {
      obj.canvas.addEventListener('mousemove', function (event) {
        obj.fingers[0] = handleMouse(event, obj.canvas)
        obj.draw(obj)
      })
      touchEvents.forEach(eventName => {
        obj.canvas.addEventListener(eventName, function (event) {
          obj.fingers[0] = handleTouch(event as TouchEvent, obj.canvas)
          if (obj.fingers[0].x == 0 && obj.fingers[0].x == 0) {
            obj.fingers.pop()
          }
          obj.draw(obj)
        })
      })
    
      obj.draw(obj)
    })
})
