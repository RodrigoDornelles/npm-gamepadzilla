import { ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"


const emu = {
    Joy(self: ObjectGpz) {
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const stick = nestFinger(center, self.fingers)
        const dirX = center.x - stick.pos.x
        const dirY = center.y - stick.pos.y
    
        if (stick.dis > 10) {
            if (dirX < 0) {
                window.dispatchEvent(new KeyboardEvent('keydown', self.fakekeys[1]))
            }
            else if (dirX > 0) {
                window.dispatchEvent(new KeyboardEvent('keydown', self.fakekeys[3]))
            } else {
                window.dispatchEvent(new KeyboardEvent('keyup', self.fakekeys[1]))
                window.dispatchEvent(new KeyboardEvent('keyup', self.fakekeys[3]))
            }
            if (dirY < 0) {
                window.dispatchEvent(new KeyboardEvent('keydown', self.fakekeys[0]))
            }
            else if (dirY > 0) {
                window.dispatchEvent(new KeyboardEvent('keydown', self.fakekeys[2]))
            }
            else {
                window.dispatchEvent(new KeyboardEvent('keyup', self.fakekeys[2]))
                window.dispatchEvent(new KeyboardEvent('keyup', self.fakekeys[0]))
            }
        } else {
            self.fakekeys.forEach(fakekey => {
                window.dispatchEvent(new KeyboardEvent('keyup', fakekey))
            })
        }
    },
    Btn(self: ObjectGpz) {
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const btn = nestFinger(center, self.fingers)
        if (btn.dis > (50/3)) {
            window.dispatchEvent(new KeyboardEvent('keydown', self.fakekeys[0]))
        }
        else {
            window.dispatchEvent(new KeyboardEvent('keyup', self.fakekeys[0]))
        }
    }
}

export { emu }
