import { ObjectGpz } from "./interface";

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

        if (self.mouses.length) {
            const distance = Math.sqrt((self.mouses[0].x - centerX) ** 2 + (self.mouses[0].y - centerY) ** 2)
            if (distance < radius) {
                color = 'red'
            }
        }

        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
        drawCircle(self.ctx2d, color, centerX, centerY, radius)
    },
    Joy(self: ObjectGpz) {
        const centerX: number = self.canvas.width / 2
        const centerY: number = self.canvas.height / 2
        const radius: number = 50
        const radius2: number = radius/3
        const percentage: number = 1.5
    
        self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height)
    
        const posX: number = self.mouses[0]?.x ?? centerX
        const posY: number = self.mouses[0]?.y ?? centerY
        const distance = Math.sqrt((posX - centerX) ** 2 + (posY - centerY) ** 2)
    
        let secondCircleX = posX
        let secondCircleY = posY
    
        if ((distance / percentage) > (radius - radius2)) {
            const angle = Math.atan2(posY - centerY, posX - centerX)
            secondCircleX = centerX + (radius - radius2) * percentage * Math.cos(angle)
            secondCircleY = centerY + (radius - radius2) * percentage * Math.sin(angle)
        }
    
        drawCircle(self.ctx2d, '#aaaaaa80', centerX, centerY, radius)
        drawCircle(self.ctx2d, '#88888880', secondCircleX, secondCircleY, radius2)
    }
}

export { draw }

