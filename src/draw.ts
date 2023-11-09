import { ObjectGpz, Vector2d } from "./interface";
import { nestFinger, desnormalize } from "./util";

function drawCircle(ctx: CanvasRenderingContext2D, fill: string, x: number, y: number, r: number) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = fill
    ctx.fill()
    ctx.fillStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

const draw = {
    Btn(self: ObjectGpz) {
        const centerX: number = self.canvas.width / 2;
        const centerY: number = self.canvas.height / 2;
        const radius: number = 25;
        const color: string = self.stateNew[0]? 'red': '#88888880'
        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        drawCircle(self.ctx2d, color, centerX, centerY, radius)
    },
    Joy(self: ObjectGpz) {
        const radius: number = 50
        const radius2: number = radius/3
        const percentage: number = 1.5
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const fakeFinger : Vector2d = {
            x: desnormalize(self.axis2d!.x) * self.canvas.width,
            y: desnormalize(self.axis2d!.y) * self.canvas.height,
        }
        const stick = nestFinger(center, [fakeFinger])
    
        if ((stick.dis / percentage) > (radius - radius2)) {
            const angle = Math.atan2(stick.pos.y - center.y, stick.pos.x - center.x)
            stick.pos.x = center.x + (radius - radius2) * percentage * Math.cos(angle)
            stick.pos.y = center.y + (radius - radius2) * percentage * Math.sin(angle)
        }
    
        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        drawCircle(self.ctx2d, '#aaaaaa80', center.x, center.y, radius)
        drawCircle(self.ctx2d, '#88888880', stick.pos.x, stick.pos.y, radius2)
    }
}

export { draw }
