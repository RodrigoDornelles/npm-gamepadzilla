import { construtors } from "./construtors";
import { ObjectGpz } from "./interface";
import { installEventGamepad } from "./event_gamepad"
import { InstallEventMouse } from "./event_mouse";
import { InstallEventTouch } from "./event_touch";
import { InstallEventHtml } from "./event_html";

document.addEventListener('DOMContentLoaded', () => {
    const objects = construtors()

    function update(self: ObjectGpz) {
      self.core(self)
      self.draw(self)
      self.emu(self)
    }

    InstallEventHtml(window, objects, update)
    InstallEventTouch(window, objects, update)
    InstallEventMouse(window, objects, update)
    installEventGamepad(window, objects, update)
})
