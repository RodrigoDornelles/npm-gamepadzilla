import { ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"

const core = {
    Joy(self: ObjectGpz) {
    },
    Btn(self: ObjectGpz) {
        const bound = self.canvas.getBoundingClientRect()
        const center: Vector2d = {x: bound.width / 2, y: bound.height / 2}
        const resize = bound.width/self.canvas.width
        const btn = nestFinger(center, self.fingers)
        self.stateOld = [...self.stateNew]
        self.stateNew[0] = btn.dis !== 0 && btn.dis < (25 * resize)
    }
}

export { core }
