import { construtors } from "./construtors";
import { ObjectGpz } from "./interface";
import { installEventGamepad } from "./event_gamepad"
import { InstallEventMouse } from "./event_mouse";
import { InstallEventTouch } from "./event_touch";

document.addEventListener('DOMContentLoaded', () => {
    const objects = construtors()

    InstallEventTouch(window, objects, (self: ObjectGpz) => {
      self.core(self)
      self.draw(self)
      self.emu(self)
    })
    InstallEventMouse(window, objects, (self: ObjectGpz) => {
      self.core(self)
      self.draw(self)
      self.emu(self)
    })
    installEventGamepad(window, objects, (self: ObjectGpz) => {
      self.draw(self)
      self.emu(self)
    })
    objects.forEach(obj => {
      obj.draw(obj)
    })
})
