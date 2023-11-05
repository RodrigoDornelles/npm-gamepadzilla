import {ObjectGpz, ClassGpz} from './interface'
import { draw } from './draw'

function construtors(): Array<ObjectGpz>  {
    const objects = [] as Array<ObjectGpz>
    Object.keys(ClassGpz).forEach((gpztype) => {
        Array.from(document.querySelectorAll(ClassGpz[gpztype]))
        .filter(el => el instanceof HTMLCanvasElement)
        .forEach(el => {
            objects.push({
                mouses: [],
                draw: draw[gpztype],
                type: ClassGpz[gpztype],
                canvas: el as HTMLCanvasElement,
                ctx2d: (el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
            })
        })
    })

    return objects
}

export {construtors}
