import { expect, test, jest } from "bun:test"
import { InstallEngine, process } from "../src/engine"

const processMock = (a: any) => process(a)
const InstallEngineMock = (a: any) => InstallEngine(a)

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

    InstallEngineMock(gpz)
    
    expect(gpz[0].chain[0]).toHaveBeenCalled()
    expect(gpz[0].chain[1]).toHaveBeenCalled()
    expect(gpz[0].chain[2]).toHaveBeenCalled()
    expect(gpz[1].chain[0]).toHaveBeenCalled()
    expect(gpz[1].chain[1]).toHaveBeenCalled()
    expect(gpz[1].chain[2]).toHaveBeenCalled()
})
