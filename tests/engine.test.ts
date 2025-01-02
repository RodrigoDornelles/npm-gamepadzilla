import { expect, test, jest } from "bun:test"
import { InstallEngine, process } from "../src/engine"

const processMock = (a: any) => process(a)
const InstallEngineMock = (a: any, b: any) => InstallEngine(a, b)

test("process: calls functions in chain", () => {
    const gpz = {
        chain: [
            jest.fn(),
            jest.fn(),
            jest.fn(),
        ],
    }

    processMock(gpz)

    expect(gpz.chain[0]).toHaveBeenCalled()
    expect(gpz.chain[1]).toHaveBeenCalled()
    expect(gpz.chain[2]).toHaveBeenCalled()
})

test("InstallEngine: installs chain in each pad", () => {
    const window = {
        requestAnimationFrame: (f) => f()
    }

    const gpz = [
        {
            core: jest.fn(),
            draw: jest.fn(),
            emu: jest.fn(),
            chain: []
        },
        {
            core: jest.fn(),
            draw: jest.fn(),
            emu: jest.fn(),
            chain: []
        },
    ]

    const draw1 = jest.spyOn(gpz[0], 'draw');
    const draw2 = jest.spyOn(gpz[1], 'draw');
    InstallEngineMock(window, gpz)

    expect(draw1).toHaveBeenCalled()
    expect(draw2).toHaveBeenCalled()
    expect(gpz[0].chain[0]).toHaveBeenCalled()
    expect(gpz[0].chain[2]).toHaveBeenCalled()
    expect(gpz[1].chain[0]).toHaveBeenCalled()
    expect(gpz[1].chain[2]).toHaveBeenCalled()
})
