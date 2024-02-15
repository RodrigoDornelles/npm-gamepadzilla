import { ObjectGpz } from "./interface"

interface Keyboard extends Window {
    KeyboardEvent: new (type: string, eventInitDict?: KeyboardEventInit | undefined) => KeyboardEvent
}

function virtualKeyboard(device: Keyboard, self: ObjectGpz) {
    self.fakekeys.forEach((fakekey, index) => {
        if (self.stateNew[index] && !self.stateOld[index]) {
            device.dispatchEvent(new device.KeyboardEvent('keydown', fakekey))
        }
        if (!self.stateNew[index] && self.stateOld[index]) {
            device.dispatchEvent(new device.KeyboardEvent('keyup', fakekey))
        }
    })
}

const emu = {
    Joy: (self: ObjectGpz) => virtualKeyboard(window, self),
    Btn: (self: ObjectGpz) => virtualKeyboard(window, self),
    Dpad: (self: ObjectGpz) => virtualKeyboard(window, self),
}

export { emu, virtualKeyboard }
