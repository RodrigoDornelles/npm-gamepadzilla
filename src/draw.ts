import { ObjectGpz, Vector2d } from "./interface";

function nestFinger(center: Vector2d, fingers: Array<Vector2d>): {dis: number, pos: Vector2d} {
    if (fingers.length == 0) {
        return {dis: 0, pos: center}
    }

    let shortestDistance : number = Number.MAX_SAFE_INTEGER
    let closestFinger: Vector2d = fingers[0]

    fingers.forEach(finger => {
        const distance = Math.sqrt((finger.x - center.x) ** 2 + (finger.y - center.y) ** 2)
        if (distance < shortestDistance) {
            shortestDistance = distance
            closestFinger = finger
        }
    })

    return {dis: shortestDistance, pos: closestFinger}
}

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
        let color: string = '#88888880'

        self.fingers.forEach(finger => {
            const distance = Math.sqrt((finger.x - centerX) ** 2 + (finger.y - centerY) ** 2)
            if (distance < radius) {
                color = 'red'
            }
        })

        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        drawCircle(self.ctx2d, color, centerX, centerY, radius)
    },
    Joy(self: ObjectGpz) {
        const center: Vector2d = {x: self.canvas.width / 2, y: self.canvas.height / 2}
        const radius: number = 50
        const radius2: number = radius/3
        const percentage: number = 1.5    
        const stick = nestFinger(center, self.fingers)
    
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
