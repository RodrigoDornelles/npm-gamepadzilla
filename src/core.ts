import { ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"

const core = {
    Joy(self: ObjectGpz) {
    },
    Btn(self: ObjectGpz) {
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const btn = nestFinger(center, self.fingers)
        self.stateOld = [...self.stateNew]
        self.stateNew[0] = btn.dis !== 0 && btn.dis < (50/3)
    }
}

export { core }
