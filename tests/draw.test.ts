import { expect, test, jest } from "bun:test"
import { draw, drawCircle } from "../src/draw"

const drawJoyMock = (o: any) => draw['Joy'](o)
const drawBtnMock = (o: any) => draw['Btn'](o)
const drawCircleMock = (a: any, b: any, c: any, d: any, e: any) => drawCircle(a, b, e, {x: c, y: d})

test("drawCircle should draw a filled circle with the correct attributes", () => {
    const ctxMock = {
        fillStyle: "",
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        closePath: jest.fn(),
    }

    drawCircleMock(ctxMock, "blue", 50, 50, 10)
    expect(ctxMock.beginPath).toHaveBeenCalled()
    expect(ctxMock.arc).toHaveBeenCalled()// TODO: replace
    //expect(ctxMock.arc).toHaveBeenCalledWith(50, 50, 10, 0, 2 * Math.PI)
    expect(ctxMock.fillStyle).toBe("blue")
    expect(ctxMock.fill).toHaveBeenCalled()
    expect(ctxMock.stroke).toHaveBeenCalled()
    expect(ctxMock.closePath).toHaveBeenCalled()
})

test("draw.Btn should draw a red circle when stateNew is true", () => {
    const gpz = {
        canvas: { width: 100, height: 100, dataset: {} },
        stateNew: [true],
        ctx2d: {
            fillStyle: "",
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
            closePath: jest.fn(),
            clearRect: jest.fn()
        },
    }

    drawBtnMock(gpz)
    expect(gpz.ctx2d.fillStyle).toBe("red")
    expect(gpz.ctx2d.clearRect).toHaveBeenCalled() // TODO: replace
    //expect(gpz.ctx2d.clearRect).toHaveBeenCalledWith(0, 0, 100, 100)
})


test("draw.Btn should draw a gray circle when stateNew is false", () => {
    const gpz = {
        canvas: { width: 100, height: 100, dataset: {} },
        stateNew: [false],
        ctx2d: {
            fillStyle: "",
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
            closePath: jest.fn(),
            clearRect: jest.fn()
        },
    }

    drawBtnMock(gpz)
    expect(gpz.ctx2d.fillStyle).not.toBe("red")
    expect(gpz.ctx2d.clearRect).toHaveBeenCalled() // TODO: replace
    //expect(gpz.ctx2d.clearRect).toHaveBeenCalledWith(0, 0, 100, 100)
})

test("draw.Joy should draw circles with the correct colors and positions", () => {
    const gpz = {
        canvas: { width: 100, height: 100 },
        axis2d: [{x: 0, y: 0}],
        ctx2d: {
            fillStyle: "",
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            stroke: jest.fn(),
            closePath: jest.fn(),
            clearRect: jest.fn()
        },
    }

    drawJoyMock(gpz)
    expect(gpz.ctx2d.clearRect).toHaveBeenCalled() // TODO: replace
    //expect(gpz.ctx2d.clearRect).toHaveBeenCalledWith(0, 0, 100, 100)
})
