import { expect, test } from "bun:test";
import { getOnlineGamePads } from "../src/event_gamepad"

const getOnlineGamePadsMock = (n: any) => getOnlineGamePads(n as Navigator)

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
