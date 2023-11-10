import { ClassGpz, ObjectGpz, GamepadFSM, Vector2d } from "./interface";
import { handleGamepadAxis, handleGamepadButtons } from "./handlers";

function getOnlineGamePads(device: Navigator) {
  return (device.getGamepads?.().filter(is => is?.connected) ?? []) as Array<Gamepad> 
}

function installEventGamepad(pads: Array<ObjectGpz>, process: (self: ObjectGpz) => void)
{
  let gamepadState: GamepadFSM = GamepadFSM.Offline

  const joypads = pads.filter(self => self.type == ClassGpz.Joy)
  const buttonpads = pads.filter(self => self.type == ClassGpz.Btn)

  function processAxis(axis: Array<Vector2d>) {
    if (axis.length > 0) {
      gamepadState = GamepadFSM.Online
      joypads.forEach(self => {
        self.axis2d = axis[0]
        process(self)
      })
    } 
    if (axis.length === 0 && gamepadState == GamepadFSM.Online) {
      gamepadState = GamepadFSM.Cleanup
      joypads.forEach(self => {
        self.axis2d = {x: 0, y: 0}
        process(self)
      })
    }
  }

  function gamepadEvent() {
    const gamepads = getOnlineGamePads(navigator)
    gamepads.forEach(gamepad => {
      const axis = handleGamepadAxis(gamepad)
      const buttons = handleGamepadButtons(gamepad)
      processAxis(axis)
    })
  }

  function toggleEvent() {
    const count = getOnlineGamePads(navigator).length
    if (count > 0) {
      setInterval(gamepadEvent, 1000 / 60)
    }
  }

  window.addEventListener("gamepadconnected", toggleEvent)
}

export { installEventGamepad, getOnlineGamePads }
