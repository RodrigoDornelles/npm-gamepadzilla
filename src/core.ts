import { EventGpz, ObjectGpz, Vector2d } from "./interface"
import { nestFinger } from "./util"
import { normalize } from "./util"

const core = {
    Joy(self: ObjectGpz) {
        const deadZone = 0.18;
        self.stateOld = [...self.stateNew];
        if (self.from === EventGpz.Touch) {
            const bound = self.canvas.getBoundingClientRect()
            const center: Vector2d = {x: bound.width / 2, y: bound.height / 2}
            const stick = nestFinger(center, self.fingers)
            const dirX = normalize(stick.pos.x / bound.width)
            const dirY = normalize(stick.pos.y / bound.height)
            self.axis2d = { x: dirX, y: dirY }
        }
        if (self.axis2d) {
            const { x, y } = self.axis2d
            self.stateNew = [
                y < -deadZone,
                x < -deadZone,
                y > deadZone,
                x > deadZone
            ]
        }
    },    
    Btn(self: ObjectGpz) {
        self.stateOld = [...self.stateNew]
        if (self.from == EventGpz.Touch) {
            const bound = self.canvas.getBoundingClientRect()
            const center: Vector2d = {x: bound.width / 2, y: bound.height / 2}
            const resize = bound.width/self.canvas.width
            const btn = nestFinger(center, self.fingers)
            self.stateNew[0] = btn.dis !== 0 && btn.dis < (25 * resize)
        }
        if (self.from == EventGpz.Gamepad) {
            self.stateNew = self.buttons ?? []
        }
    }
}

export { core }
