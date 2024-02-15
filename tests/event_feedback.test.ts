import { expect, test, jest } from "bun:test";
import { InstallEventFeedback, vibration } from "../src/event_feedback";

const vibrationMock = (a: any, b: any) => vibration(a, b);
const InstallEventFeedbackMock = (a: any, b: any) => InstallEventFeedback(a, b);

test("vibration: calls device.vibrate with correct parameters", () => {
    const device = {
        vibrate: jest.fn(),
    };

    const gpz = {
        stateOld: [false, false, false],
        stateNew: [true, false, false],
        canvas: {
            dataset: {
                gpzVibrate: '200 100',
            },
        },
    };

    vibrationMock(gpz, device);

    expect(device.vibrate).toHaveBeenCalledWith([200, 100])
})

test("vibration: calls device.vibrate without parameters", () => {
    const device = {
        vibrate: jest.fn(),
    };

    const gpz = {
        stateOld: [false, false, false],
        stateNew: [true, false, false],
        canvas: {
            dataset: {},
        },
    }
    
    vibrationMock(gpz, device);

    expect(device.vibrate).toHaveBeenCalledWith([200])
})

test("InstallEventFeedback: install success", () => {
    const device = {
        navigator: {
            vibrate: jest.fn(),
        },
    };

    const gpz = [
        {
            chain: []
        }
    ]

    InstallEventFeedbackMock(device, gpz)

    expect(gpz[0].chain).toHaveLength(1)
});

test("InstallEventFeedback: install failed", () => {
    const device = {
        navigator: {},
    };

    const gpz = [
        {
            chain: []
        }
    ]

    InstallEventFeedbackMock(device, gpz)

    expect(gpz[0].chain).toHaveLength(0)
})
