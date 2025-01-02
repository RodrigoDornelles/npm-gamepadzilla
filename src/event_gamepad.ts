import { ClassGpz, ObjectGpz, GamepadFSM, Vector2d, EventGpz } from "./interface";
import { handleGamepadAxis, handleGamepadButtons } from "./handlers";
import { process } from "./engine";

function getOnlineGamePads(device: Navigator) {
  return (device.getGamepads?.().filter(is => is?.connected) ?? []) as Array<Gamepad> 
}

function toggleEvent(device: Window, func: () => void) {
  const count = getOnlineGamePads(device.navigator).length
  if (count > 0) {
    device.setInterval(func, 1000 / 60)
  }
}

function installEventGamepad(device: Window, pads: Array<ObjectGpz>)
{
  let gamepadState: GamepadFSM = GamepadFSM.Offline

  const joypads = pads.filter(self => self.type == ClassGpz.Joy || self.type == ClassGpz.Dpad)
  const buttonpads = pads.filter(self => self.type == ClassGpz.Btn || self.type == ClassGpz.Btn4)

  function processButtons(buttons: Array<boolean>) {
    buttonpads.forEach(self => {
      if (self.buttons == null) {
        self.buttons = new Array(self.stateNew.length).fill(false)
      }
      self.stateNew.forEach((_, index) => {
        if (self.buttons && buttons[index] != self.stateNew[index]) {
          self.from = EventGpz.Gamepad
          self.buttons[index] = buttons[index]
        }
      })
      process(self)
    })
  }

  function processAxis(axis: Array<Vector2d>) {
    if (axis.length > 0) {
      gamepadState = GamepadFSM.Online
      joypads.forEach(self => {
        self.from = EventGpz.Gamepad
        self.axis2d = axis[0]
        process(self)
      })
    } 
    if (axis.length === 0 && gamepadState == GamepadFSM.Online) {
      gamepadState = GamepadFSM.Cleanup
      joypads.forEach(self => {
        self.from = EventGpz.Gamepad
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
