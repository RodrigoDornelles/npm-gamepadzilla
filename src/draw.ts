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

      drawCircle(self.ctx2d, 'yellow', centerX, centerY, radius)
    },
    Joy(self: ObjectGpz) {
        const centerX: number = self.canvas.width / 2
        const centerY: number = self.canvas.height / 2
        const radius: number = 50

        drawCircle(self.ctx2d, 'green', centerX, centerY, radius)
        drawCircle(self.ctx2d, 'green', centerX, centerY, radius/3)
    }
}

export { draw }

