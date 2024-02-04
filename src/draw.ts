import { ObjectGpz, Vector2d } from "./interface";
import { nestFinger, desnormalize, tokens } from "./util";
import { angleInRadians, polyTransform } from "./math"
import geometry from "../geometry.json"

export function drawCircle(ctx: CanvasRenderingContext2D, fill: string, r: number, pos: Vector2d) {
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI)
    ctx.fillStyle = fill
    ctx.fill()
    ctx.fillStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = fill
}

const draw = {
    Btn(self: ObjectGpz) {
        const centerX: number = self.canvas.width / 2;
        const centerY: number = self.canvas.height / 2;
        const radius: number = 25;
        const color1: string = self.canvas.dataset.gpzColor ?? '#88888880'
        const color2: string = self.canvas.dataset.gpzColorAction ?? 'red'
        const color: string = self.stateNew[0]? color2: color1 
        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        drawCircle(self.ctx2d, color, radius, {x: centerX, y: centerY})
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
        drawCircle(self.ctx2d, '#aaaaaa80', radius, {x: center.x, y: center.y})
        drawCircle(self.ctx2d, '#88888880', radius2, {x: stick.pos.x, y: stick.pos.y})
    },
    Dpad(self: ObjectGpz) {
        const offset = Number(self.canvas.dataset.gpzOffset ?? 6)
        const sizeArr = tokens(self.canvas.dataset.gpzSize, '16', 2).map(n => Number(n))
        const size2D = {x: sizeArr[0], y: sizeArr[1]}
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const color1: Array<string> = tokens(self.canvas.dataset.color, '#aaaaaa80', 4)
        const color2: Array<string> = tokens(self.canvas.dataset.color, '#44444480', 4)
        const colors: Array<string> = self.stateNew.map((state, index) => state? color2[index]: color1[index])
        const pads: Array<Array<Vector2d>> = [
            polyTransform(geometry['dpad'], {x: center.x, y: center.y - offset}, size2D, angleInRadians(0)), 
            polyTransform(geometry['dpad'], {x: center.x - offset, y: center.y}, size2D, angleInRadians(270)),  
            polyTransform(geometry['dpad'], {x: center.x, y: center.y + offset}, size2D, angleInRadians(180)),  
            polyTransform(geometry['dpad'], {x: center.x + offset, y: center.y}, size2D, angleInRadians(90))  
        ]
        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        pads.forEach((pad, index) => {
            self.ctx2d.beginPath();
            self.ctx2d.moveTo(pad[0].x, pad[0].y)
            pad.forEach(poly => {
                self.ctx2d.lineTo(poly.x, poly.y)
            })
            self.ctx2d.fillStyle = colors[index]
            self.ctx2d.fill()
            self.ctx2d.fillStyle = 'black'
            self.ctx2d.stroke()
            self.ctx2d.closePath()
        })
    }
}

export { draw }
