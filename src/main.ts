import { construtors } from "./construtors";

document.addEventListener('DOMContentLoaded', () => {
    const objects = construtors()
    objects.forEach(obj => {
      obj.draw(obj)
    })
})
