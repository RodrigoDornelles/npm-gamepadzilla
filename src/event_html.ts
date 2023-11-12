import { ObjectGpz } from "./interface";


function InstallEventHtml(device: Window, pads: Array<ObjectGpz>, process: (self: ObjectGpz) => void)
{
    pads.forEach(process)
}

export { InstallEventHtml }
