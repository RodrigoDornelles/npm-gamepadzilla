import { ObjectGpz } from "./interface";
import { TouchEvents } from "./interface";
import { handleTouch } from "./handlers";

function InstallEventTouch(device: Window, pads: Array<ObjectGpz>, process: (self: ObjectGpz) => void)
{
    pads.forEach(self => {
        function eventMove(event: TouchEvent) {
            self.fingers = [...handleTouch(event, self.canvas)]
            process(self)
        }

        Object.values(TouchEvents).forEach(eventName => {
            self.canvas.addEventListener(eventName, eventMove)
        })
    })
}

export { InstallEventTouch }
