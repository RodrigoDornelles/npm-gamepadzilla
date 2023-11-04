document.addEventListener('DOMContentLoaded', () => {
    const elementsWithClass = document.querySelectorAll('.gpz-joy')
    const canvasElements = Array.from(elementsWithClass).filter((element) => element instanceof HTMLCanvasElement) as Array<HTMLCanvasElement>
    const contexts2D = canvasElements.map((canvasElement) => {
      return canvasElement.getContext('2d');
    }) as Array<CanvasRenderingContext2D>

    contexts2D.forEach(ctx => {
        const centerX: number = ctx.canvas.width / 2;
        const centerY: number = ctx.canvas.height / 2;
        const radius: number = 50;
        const fillColor: string = "yellow";
        const strokeColor: string = "black";

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.fillStyle = strokeColor;
        ctx.stroke();
        ctx.closePath();
    })
})
