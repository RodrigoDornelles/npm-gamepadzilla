import { ClassGpz, ObjectGpz, GamepadFSM, Vector2d } from "./interface";
import { handleGamepadAxis, handleGamepadButtons } from "./handlers";

function getOnlineGamePads(device: Navigator) {
  return (device.getGamepads?.().filter(is => is?.connected) ?? []) as Array<Gamepad> 
}

function toggleEvent(device: Window, func: () => void) {
  const count = getOnlineGamePads(device.navigator).length
  if (count > 0) {
    device.setInterval(func, 1000 / 60)
  }
}

function installEventGamepad(device: Window, pads: Array<ObjectGpz>, process: (self: ObjectGpz) => void)
{
  let gamepadState: GamepadFSM = GamepadFSM.Offline

  const joypads = pads.filter(self => self.type == ClassGpz.Joy)
  const buttonpads = pads.filter(self => self.type == ClassGpz.Btn)

  function processButtons(buttons: Array<number>) {
    buttonpads.forEach(self => {
      if (!self.stateNew[0] && buttons.length > 0) {
        self.stateNew[0] = true;
        process(self)
      }
      if (self.stateNew[0] && buttons.length == 0) {
          self.stateNew[0] = false
          process(self)
      }
    })
  }

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
      const buttons = handleGamepadButtons(gamepad)
      const axis = handleGamepadAxis(gamepad)
      processButtons(buttons)
      processAxis(axis)
    })
  }

  function toggleEventGamepad(){
    toggleEvent(device, gamepadEvent)
    window.removeEventListener("gamepadconnected", toggleEventGamepad)
  }

  window.addEventListener("gamepadconnected", toggleEventGamepad)
}

export { installEventGamepad, getOnlineGamePads, toggleEvent }
