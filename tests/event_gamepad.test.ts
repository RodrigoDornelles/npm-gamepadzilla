import { expect, test, jest } from "bun:test";
import { getOnlineGamePads, toggleEvent } from "../src/event_gamepad"

const getOnlineGamePadsMock = (a: any) => getOnlineGamePads(a)
const toggleEventMock = (a: any, b: any) => toggleEvent(a, b)

test("gamepads online: null", () => {
    const navigator = {
        getGamepads: null
    }
    expect(getOnlineGamePadsMock(navigator)).toHaveLength(0);
})

test("gamepads online: empty", () => {
    const navigator = {
        getGamepads: () => []
    }
    expect(getOnlineGamePadsMock(navigator)).toHaveLength(0);
})

test("gamepads online: 2 online, 1 offline, 1 null", () => {
    const navigator = {
        getGamepads: () => [{connected: true}, {connected: false}, null, {connected: true}]
    }
    expect(getOnlineGamePadsMock(navigator)).toHaveLength(2);
})

test("toggle event: not activate", () => {
    const window = {
        navigator: {
            getGamepads: () => [{connected: false}, null]
        },
        setInterval: () => window.func(),
        func: jest.fn()
    }

    toggleEventMock(window, window.func)
    expect(window.func).not.toHaveBeenCalled()
})

test("toggle event: should be activate", () => {
    const window = {
        navigator: {
            getGamepads: () => [{connected: true}]
        },
        setInterval: () => window.func(),
        func: jest.fn()
    }

    toggleEventMock(window, window.func)
    expect(window.func).toHaveBeenCalled()
})
