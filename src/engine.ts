import { ObjectGpz } from "./interface";

function process(self: ObjectGpz) {
    self.chain.forEach(f => f(self))
}

function InstallEngine(pads: Array<ObjectGpz>)
{   
    pads.forEach((pad) => {
        pad.chain.push(pad.core)
        pad.chain.push(pad.draw)
        pad.chain.push(pad.emu)
        process(pad)
    })
}

export { InstallEngine, process }
