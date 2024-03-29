import { ObjectGpz, EventGpz } from "./interface";
import { TouchEvents } from "./interface";
import { handleTouch } from "./handlers";
import { process } from "./engine";

function InstallEventTouch(device: Window, pads: Array<ObjectGpz>)
{
    pads.forEach(self => {
        function eventMove(event: TouchEvent) {
            self.from = EventGpz.Touch
            self.fingers = [...handleTouch(event, self.canvas)]
            process(self)
        }

        Object.values(TouchEvents).forEach(eventName => {
            self.canvas.addEventListener(eventName, eventMove)
        })
    })
}

export { InstallEventTouch }
