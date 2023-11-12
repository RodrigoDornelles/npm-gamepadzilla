import { expect, test } from "bun:test";
import { core } from "../src/core";
import { EventGpz } from "../src/interface";

const coreJoyMock = (o: any) => core['Joy'](o)
const coreBtnMock = (o: any) => core['Btn'](o)

test("core joy: 1100 -> 000 (touch)", () => {
  const gpz = {
    from: EventGpz.Touch,
    canvas: { getBoundingClientRect: () => ({ width: 100, height: 100, left: 0, top: 0 }) },
    fingers: [],
    stateOld: [false, false, false, false],
    stateNew: [true, true, false, false],
    axis2d: { x: 5, y: 5 },
  }

  coreJoyMock(gpz)
  expect(gpz.stateOld).toEqual([true, true, false, false])
  expect(gpz.stateNew).toEqual([false, false, false, false])
  expect(gpz.axis2d).toEqual({ x: 0, y: 0 })
})

test("core gpz: click on button (touch)", () => {
    const gpz = {
      from: EventGpz.Touch,
      canvas: { width: 100, getBoundingClientRect: () => ({ width: 100, height: 100, left: 0, top: 0 }) },
      fingers: [{x: 51, y: 51}],
      stateOld: [true],
      stateNew: [false],
    }
  
    coreBtnMock(gpz)
    expect(gpz.stateOld).toEqual([false])
    expect(gpz.stateNew).toEqual([true])
})
