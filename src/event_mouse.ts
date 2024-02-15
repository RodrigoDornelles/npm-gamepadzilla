import { EventGpz, ObjectGpz } from "./interface";
import { TouchEvents, MouseEvents } from "./interface";
import { handleMouse } from "./handlers";
import { process } from "./engine";

function InstallEventMouse(device: Window, pads: Array<ObjectGpz>)
{
    pads.forEach(self => {
        function eventClean(event: MouseEvent) {
            self.from = EventGpz.Touch
            self.fingers = []
            process(self)
        }

        function eventMove(event: MouseEvent) {
            self.from = EventGpz.Touch
            self.fingers = [...handleMouse(event, self.canvas)]
            process(self)
        }

        function disableMouse(event: TouchEvent) {
            self.canvas.removeEventListener(MouseEvents.Move, eventMove)
            self.canvas.removeEventListener(MouseEvents.Leave, eventClean)
            device.removeEventListener(TouchEvents.Start, disableMouse)
        }

        device.addEventListener(TouchEvents.Start, disableMouse)
        self.canvas.addEventListener(MouseEvents.Move, eventMove)
        self.canvas.addEventListener(MouseEvents.Leave, eventClean)
    })
}

export { InstallEventMouse }
