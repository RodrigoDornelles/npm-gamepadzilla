import { ObjectGpz } from "./interface";

function vibration(self: ObjectGpz, device: Navigator) {
    const find = (state, index) => state && self.stateOld[index] == false
    const action = self.stateNew.findIndex(find)
    if (action !== -1) {
        const vibration = self.canvas.dataset.gpzVibrate ?? '200'
        const animation = vibration.split(' ').map(intensity => Number(intensity))
        device.vibrate(animation)
    }
}

function InstallEventFeedback(device: Window, pads: Array<ObjectGpz>)
{
    pads.forEach(self => {
        if ('navigator' in device && 'vibrate' in device.navigator) {
            self.chain.push(pad => vibration(pad, device.navigator))
        }
    })
}

export { InstallEventFeedback, vibration }
