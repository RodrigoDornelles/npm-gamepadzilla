import { ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"
import { normalize } from "./util"

const core = {
    Joy(self: ObjectGpz) {
        const bound = self.canvas.getBoundingClientRect()
        const center: Vector2d = {x: bound.width / 2, y: bound.height / 2}
        const stick = nestFinger(center, self.fingers)
        const dirX = self.fingers.length? normalize((stick.pos.x - bound.left)/bound.width): 0
        const dirY = self.fingers.length? normalize((stick.pos.y - bound.top)/bound.height): 0
        const deadZone = 0.18
        self.stateOld = [...self.stateNew]
        if (self.axis2d) {
            self.stateNew[0] = dirY < -deadZone
            self.stateNew[1] = dirX < -deadZone
            self.stateNew[2] = dirY > deadZone
            self.stateNew[3] = dirX > deadZone
            self.axis2d = {x: dirX, y: dirY}
        }
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
