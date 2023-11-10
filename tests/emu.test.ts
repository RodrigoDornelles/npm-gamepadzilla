import { expect, test, jest } from "bun:test";
import { virtualKeyboard } from "../src/emu";

const virtualKeyboardMock = (w: any, o: any) => virtualKeyboard(w, o)

test("virtualKeyboard should dispatch keydown events when stateNew is true and stateOld is false", () => {
    const deviceMock = {
        dispatchEvent: jest.fn(),
        "KeyboardEvent": String,
    };

    const gpz = {
        fakekeys: ["KeyF"],
        stateOld: [false],
        stateNew: [true],
    };
    
    virtualKeyboardMock(deviceMock, gpz)
    expect(deviceMock.dispatchEvent).toHaveBeenCalled() // TODO: replace
    //expect(deviceMock.dispatchEvent).toHaveBeenCalledWith()
});

test("virtualKeyboard should dispatch keyup events when stateNew is false and stateOld is true", () => {
    const deviceMock = {
        dispatchEvent: jest.fn(),
        "KeyboardEvent": String,
    };

    const gpz = {
        fakekeys: ["KeyF"],
        stateOld: [true],
        stateNew: [false],
    };
    
    virtualKeyboardMock(deviceMock, gpz)
    expect(deviceMock.dispatchEvent).toHaveBeenCalled() // TODO: replace
    //expect(deviceMock.dispatchEvent).toHaveBeenCalledWith()
});

test("virtualKeyboard should not dispatch keyup events when stateNew and stateOld are both true", () => {
    const deviceMock = {
        dispatchEvent: jest.fn(),
        "KeyboardEvent": String,
    };

    const gpz = {
        fakekeys: ["KeyF"],
        stateOld: [true],
        stateNew: [true],
    };
    
    virtualKeyboardMock(deviceMock, gpz)
    expect(deviceMock.dispatchEvent).not.toHaveBeenCalled() // TODO: replace
    //expect(deviceMock.dispatchEvent).toHaveBeenCalledWith()
});

test("virtualKeyboard should not dispatch keyup events when stateNew and stateOld are both false", () => {
    const deviceMock = {
        dispatchEvent: jest.fn(),
        "KeyboardEvent": String,
    };

    const gpz = {
        fakekeys: ["KeyF"],
        stateOld: [false],
        stateNew: [false],
    };
    
    virtualKeyboardMock(deviceMock, gpz)
    expect(deviceMock.dispatchEvent).not.toHaveBeenCalled() // TODO: replace
    //expect(deviceMock.dispatchEvent).toHaveBeenCalledWith()
});
