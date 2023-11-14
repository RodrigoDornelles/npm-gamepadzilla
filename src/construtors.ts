import {ObjectGpz, ClassGpz, Keycode, EventGpz} from './interface'
import { emu } from './emu'
import { core } from './core'
import { draw } from './draw'
import { getKeyCodes } from './util'
import keycodesjson from "../keycodes.json"

function construtors(): Array<ObjectGpz>  {
    const objects = [] as Array<ObjectGpz>
    Object.keys(ClassGpz).forEach((gpztype) => {
        Array.from(document.querySelectorAll(ClassGpz[gpztype]))
        .filter(el => el instanceof HTMLCanvasElement)
        .forEach(el => {
            /** @todo remove this magic string */
            const axis = gpztype == 'Joy' ? {x: 0, y: 0}: null
            const canvas = el as HTMLCanvasElement
            const context = canvas.getContext('2d') as CanvasRenderingContext2D
            const keycodes = getKeyCodes(keycodesjson, el.dataset.gpzBind)
            objects.push({
                buttons: null,
                fingers: [],
                emu: emu[gpztype],
                core: core[gpztype],
                draw: draw[gpztype],
                type: ClassGpz[gpztype],
                from: EventGpz.Startup,
                canvas: canvas,
                ctx2d: context,
                axis2d: axis,
                fakekeys: keycodes,
                stateNew: new Array(keycodes.length).fill(false),
                stateOld: new Array(keycodes.length).fill(false),
            })
        })
    })

    return objects
}

export {construtors}
