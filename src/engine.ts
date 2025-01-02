import { ObjectGpz } from "./interface";

function process(self: ObjectGpz) {
    self.chain.forEach(f => f(self))
}

function InstallEngine(device: Window, pads: Array<ObjectGpz>)
{   
    pads.forEach((pad) => {
        pad.chain.push(pad.core)
        pad.chain.push((self) => device.requestAnimationFrame(() => pad.draw(self)))
        pad.chain.push(pad.emu)
        process(pad)
    })
}

export { InstallEngine, process }
