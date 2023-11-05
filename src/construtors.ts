import {ObjectGpz, ClassGpz} from './interface'
import { emu } from './emu'
import { draw } from './draw'
import { getKeyCodes } from './util'

function construtors(): Array<ObjectGpz>  {
    const objects = [] as Array<ObjectGpz>
    Object.keys(ClassGpz).forEach((gpztype) => {
        Array.from(document.querySelectorAll(ClassGpz[gpztype]))
        .filter(el => el instanceof HTMLCanvasElement)
        .forEach(el => {
            objects.push({
                fingers: [],
                emu: emu[gpztype],
                draw: draw[gpztype],
                type: ClassGpz[gpztype],
                canvas: el as HTMLCanvasElement,
                ctx2d: (el as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D,
                fakekeys: getKeyCodes(el.dataset.gpzBind),
            })
        })
    })

    return objects
}

export {construtors}
