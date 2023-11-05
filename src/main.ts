import { construtors } from "./construtors";

document.addEventListener('DOMContentLoaded', () => {
    const objects = construtors()
    objects.forEach(obj => {
      obj.draw(obj)
      obj.canvas.addEventListener('mousemove', function (event) {
        const rect = obj.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        obj.mouses[0] = {x, y}
        obj.draw(obj)
      })
      obj.canvas.addEventListener("mouseleave", (event) => {
        obj.mouses.pop()
        obj.draw(obj)
      })
    })
})
