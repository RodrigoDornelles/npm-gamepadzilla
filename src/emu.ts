import { ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"

function virtualKeyboard(self: ObjectGpz) {
    self.fakekeys.forEach((fakekey, index) => {
        if (self.stateNew[index] && !self.stateOld[index]) {
            window.dispatchEvent(new KeyboardEvent('keydown', fakekey))
        }
        if (!self.stateNew[index] && self.stateOld[index]) {
            window.dispatchEvent(new KeyboardEvent('keyup', fakekey))
        }
    })
}

const emu = {
    Joy: virtualKeyboard,
    Btn: virtualKeyboard
}

export { emu }
