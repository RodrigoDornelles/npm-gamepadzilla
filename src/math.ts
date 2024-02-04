import { Vector2d } from "./interface"

export function angleInRadians(angleInDegrees: number) {
    return (angleInDegrees * Math.PI) / 180;
}

export function polyTransform(poly: Vector2d[], offset: Vector2d, size: Vector2d, angle: number): Vector2d[] {
    const centerX = poly.reduce((sum, point) => sum + point.x, 0) / poly.length
    const centerY = poly.reduce((sum, point) => sum + point.y, 0) / poly.length
  
    const transformedPoly = poly.map((point) => {
      const scaledX = point.x * size.x
      const scaledY = point.y * size.y
  
      const translatedX = scaledX - centerX
      const translatedY = scaledY - centerY
  
      const rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle)
      const rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle)
  
      const finalX = rotatedX + centerX + offset.x
      const finalY = rotatedY + centerY + offset.y
  
      return { x: finalX, y: finalY }
    })
  
    return transformedPoly
}
