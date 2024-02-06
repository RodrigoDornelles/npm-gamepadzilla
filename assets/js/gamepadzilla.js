// src/interface.ts
var EventGpz;
(function(EventGpz2) {
  EventGpz2[EventGpz2["Startup"] = 0] = "Startup";
  EventGpz2[EventGpz2["Touch"] = 1] = "Touch";
  EventGpz2[EventGpz2["Gamepad"] = 2] = "Gamepad";
  EventGpz2[EventGpz2["Keyboard"] = 3] = "Keyboard";
})(EventGpz || (EventGpz = {}));
var GamepadFSM;
(function(GamepadFSM2) {
  GamepadFSM2[GamepadFSM2["Offline"] = 0] = "Offline";
  GamepadFSM2[GamepadFSM2["Online"] = 1] = "Online";
  GamepadFSM2[GamepadFSM2["Cleanup"] = 2] = "Cleanup";
})(GamepadFSM || (GamepadFSM = {}));
var TouchEvents;
(function(TouchEvents2) {
  TouchEvents2["Start"] = "touchstart";
  TouchEvents2["Move"] = "touchmove";
  TouchEvents2["End"] = "touchend";
  TouchEvents2["Cancel"] = "touchcancel";
})(TouchEvents || (TouchEvents = {}));
var MouseEvents;
(function(MouseEvents2) {
  MouseEvents2["Move"] = "mousemove";
  MouseEvents2["Leave"] = "mouseleave";
})(MouseEvents || (MouseEvents = {}));
var ClassGpz;
(function(ClassGpz2) {
  ClassGpz2["Joy"] = ".gpz-joy";
  ClassGpz2["Btn"] = ".gpz-btn";
  ClassGpz2["Dpad"] = ".gpz-dpad";
})(ClassGpz || (ClassGpz = {}));

// src/emu.ts
var virtualKeyboard = function(device, self) {
  self.fakekeys.forEach((fakekey, index) => {
    if (self.stateNew[index] && !self.stateOld[index]) {
      device.dispatchEvent(new device.KeyboardEvent("keydown", fakekey));
    }
    if (!self.stateNew[index] && self.stateOld[index]) {
      device.dispatchEvent(new device.KeyboardEvent("keyup", fakekey));
    }
  });
};
var emu = {
  Joy: (self) => virtualKeyboard(window, self),
  Btn: (self) => virtualKeyboard(window, self),
  Dpad: (self) => virtualKeyboard(window, self)
};

// src/util.ts
var interpolation = function(num, input, output) {
  return (num - input.min) * (output.max - output.min) / (input.max - input.min) + output.min;
};
var clamp = function(num, range) {
  return Math.min(Math.max(num, range.min), range.max);
};
var normalize = function(num) {
  return interpolation(clamp(num, { min: 0, max: 1 }), { min: 0, max: 1 }, { min: -1, max: 1 });
};
var desnormalize = function(num) {
  return interpolation(clamp(num, { min: -1, max: 1 }), { min: -1, max: 1 }, { min: 0, max: 1 });
};
var nestFinger = function(center, fingers) {
  if (fingers.length == 0) {
    return { dis: 0, pos: center };
  }
  let shortestDistance = Number.MAX_SAFE_INTEGER;
  let closestFinger = fingers[0];
  fingers.forEach((finger) => {
    const distance = Math.sqrt((finger.x - center.x) ** 2 + (finger.y - center.y) ** 2);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestFinger = finger;
    }
  });
  return { dis: shortestDistance, pos: closestFinger };
};
var getKeyCodes = function(from, txt) {
  const tokens = txt.trim().split(" ").filter((token) => (token in from));
  const keycodes = [];
  tokens.forEach((token) => {
    keycodes.push({
      code: token,
      key: from[token].key,
      keyCode: from[token].keyCode
    });
  });
  return keycodes;
};
function tokens(attribute, defaultValue, count) {
  const value = attribute ? attribute : defaultValue;
  const splited = value.split(" ");
  const values = splited.length === count ? splited : new Array(count).fill(splited[0]);
  return values;
}

// src/core.ts
var core2dAxis = function(self) {
  const deadZone = 0.18;
  self.stateOld = [...self.stateNew];
  if (self.from === EventGpz.Touch) {
    const bound = self.canvas.getBoundingClientRect();
    const center = { x: bound.width / 2, y: bound.height / 2 };
    const stick = nestFinger(center, self.fingers);
    const dirX = normalize(stick.pos.x / bound.width);
    const dirY = normalize(stick.pos.y / bound.height);
    self.axis2d = { x: dirX, y: dirY };
  }
  if (self.axis2d) {
    const { x, y } = self.axis2d;
    self.stateNew = [
      y < -deadZone,
      x < -deadZone,
      y > deadZone,
      x > deadZone
    ];
  }
};
var core = {
  Joy: core2dAxis,
  Dpad: core2dAxis,
  Btn(self) {
    self.stateOld = [...self.stateNew];
    if (self.from == EventGpz.Touch) {
      const bound = self.canvas.getBoundingClientRect();
      const center = { x: bound.width / 2, y: bound.height / 2 };
      const resize = bound.width / self.canvas.width;
      const btn = nestFinger(center, self.fingers);
      self.stateNew[0] = btn.dis !== 0 && btn.dis < 25 * resize;
    }
    if (self.from == EventGpz.Gamepad) {
      self.stateNew = self.buttons ?? [];
    }
  }
};

// src/math.ts
function angleInRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
function polyTransform(poly, offset, size, angle) {
  const centerX = poly.reduce((sum, point) => sum + point.x, 0) / poly.length;
  const centerY = poly.reduce((sum, point) => sum + point.y, 0) / poly.length;
  const transformedPoly = poly.map((point) => {
    const scaledX = point.x * size.x;
    const scaledY = point.y * size.y;
    const translatedX = scaledX - centerX;
    const translatedY = scaledY - centerY;
    const rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle);
    const rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle);
    const finalX = rotatedX + centerX + offset.x;
    const finalY = rotatedY + centerY + offset.y;
    return { x: finalX, y: finalY };
  });
  return transformedPoly;
}
// geometry.json
var geometry_default = {
  dpad: [
    {
      x: 0,
      y: 0
    },
    {
      x: -1,
      y: -1
    },
    {
      x: -1,
      y: -3
    },
    {
      x: 1,
      y: -3
    },
    {
      x: 1,
      y: -1
    },
    {
      x: 0,
      y: 0
    }
  ]
};

// src/draw.ts
function drawCircle(ctx, fill, r, pos) {
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = fill;
}
var draw = {
  Btn(self) {
    const centerX = self.canvas.width / 2;
    const centerY = self.canvas.height / 2;
    const radius = 25;
    const color1 = self.canvas.dataset.gpzColor ?? "#88888880";
    const color2 = self.canvas.dataset.gpzColorAction ?? "red";
    const color = self.stateNew[0] ? color2 : color1;
    self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height);
    drawCircle(self.ctx2d, color, radius, { x: centerX, y: centerY });
  },
  Joy(self) {
    const radius = 50;
    const radius2 = radius / 3;
    const percentage = 1.5;
    const center = { x: self.canvas.width / 2, y: self.canvas.height / 2 };
    const fakeFinger = {
      x: desnormalize(self.axis2d.x) * self.canvas.width,
      y: desnormalize(self.axis2d.y) * self.canvas.height
    };
    const stick = nestFinger(center, [fakeFinger]);
    if (stick.dis / percentage > radius - radius2) {
      const angle = Math.atan2(stick.pos.y - center.y, stick.pos.x - center.x);
      stick.pos.x = center.x + (radius - radius2) * percentage * Math.cos(angle);
      stick.pos.y = center.y + (radius - radius2) * percentage * Math.sin(angle);
    }
    self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height);
    drawCircle(self.ctx2d, "#aaaaaa80", radius, { x: center.x, y: center.y });
    drawCircle(self.ctx2d, "#88888880", radius2, { x: stick.pos.x, y: stick.pos.y });
  },
  Dpad(self) {
    const offset = Number(self.canvas.dataset.gpzOffset ?? 6);
    const sizeArr = tokens(self.canvas.dataset.gpzSize, "16", 2).map((n) => Number(n));
    const size2D = { x: sizeArr[0], y: sizeArr[1] };
    const center = { x: self.canvas.width / 2, y: self.canvas.height / 2 };
    const color1 = tokens(self.canvas.dataset.gpzColor, "#aaaaaa80", 4);
    const color2 = tokens(self.canvas.dataset.gpzColorAction, "#44444480", 4);
    const colors = self.stateNew.map((state, index) => state ? color2[index] : color1[index]);
    const pads = [
      polyTransform(geometry_default["dpad"], { x: center.x, y: center.y - offset }, size2D, angleInRadians(0)),
      polyTransform(geometry_default["dpad"], { x: center.x - offset, y: center.y }, size2D, angleInRadians(270)),
      polyTransform(geometry_default["dpad"], { x: center.x, y: center.y + offset }, size2D, angleInRadians(180)),
      polyTransform(geometry_default["dpad"], { x: center.x + offset, y: center.y }, size2D, angleInRadians(90))
    ];
    self.ctx2d.clearRect(0, 0, self.canvas.width, self.canvas.height);
    pads.forEach((pad, index) => {
      self.ctx2d.beginPath();
      self.ctx2d.moveTo(pad[0].x, pad[0].y);
      pad.forEach((poly) => {
        self.ctx2d.lineTo(poly.x, poly.y);
      });
      self.ctx2d.fillStyle = colors[index];
      self.ctx2d.fill();
      self.ctx2d.fillStyle = "black";
      self.ctx2d.stroke();
      self.ctx2d.closePath();
    });
  }
};
// keycodes.json
var keycodes_default = {
  Backspace: {
    key: "Backspace",
    keyCode: 8
  },
  Tab: {
    key: "Tab",
    keyCode: 9
  },
  Enter: {
    key: "Enter",
    keyCode: 13
  },
  ShiftLeft: {
    key: "Shift",
    keyCode: 16
  },
  ControlLeft: {
    key: "Control",
    keyCode: 17
  },
  AltLeft: {
    key: "Alt",
    keyCode: 18
  },
  CapsLock: {
    key: "CapsLock",
    keyCode: 20
  },
  Escape: {
    key: "Escape",
    keyCode: 27
  },
  Space: {
    key: " ",
    keyCode: 32
  },
  PageUp: {
    key: "PageUp",
    keyCode: 33
  },
  PageDown: {
    key: "PageDown",
    keyCode: 34
  },
  End: {
    key: "End",
    keyCode: 35
  },
  Home: {
    key: "Home",
    keyCode: 36
  },
  ArrowLeft: {
    key: "ArrowLeft",
    keyCode: 37
  },
  ArrowUp: {
    key: "ArrowUp",
    keyCode: 38
  },
  ArrowRight: {
    key: "ArrowRight",
    keyCode: 39
  },
  ArrowDown: {
    key: "ArrowDown",
    keyCode: 40
  },
  Delete: {
    key: "Delete",
    keyCode: 46
  },
  Digit0: {
    key: "0",
    keyCode: 48
  },
  Digit1: {
    key: "1",
    keyCode: 49
  },
  Digit2: {
    key: "2",
    keyCode: 50
  },
  Digit3: {
    key: "3",
    keyCode: 51
  },
  Digit4: {
    key: "4",
    keyCode: 52
  },
  Digit5: {
    key: "5",
    keyCode: 53
  },
  Digit6: {
    key: "6",
    keyCode: 54
  },
  Digit7: {
    key: "7",
    keyCode: 55
  },
  Digit8: {
    key: "8",
    keyCode: 56
  },
  Digit9: {
    key: "9",
    keyCode: 57
  },
  KeyA: {
    key: "a",
    keyCode: 65
  },
  KeyB: {
    key: "b",
    keyCode: 66
  },
  KeyC: {
    key: "c",
    keyCode: 67
  },
  KeyD: {
    key: "d",
    keyCode: 68
  },
  KeyE: {
    key: "e",
    keyCode: 69
  },
  KeyF: {
    key: "f",
    keyCode: 70
  },
  KeyG: {
    key: "g",
    keyCode: 71
  },
  KeyH: {
    key: "h",
    keyCode: 72
  },
  KeyI: {
    key: "i",
    keyCode: 73
  },
  KeyJ: {
    key: "j",
    keyCode: 74
  },
  KeyK: {
    key: "k",
    keyCode: 75
  },
  KeyL: {
    key: "l",
    keyCode: 76
  },
  KeyM: {
    key: "m",
    keyCode: 77
  },
  KeyN: {
    key: "n",
    keyCode: 78
  },
  KeyO: {
    key: "o",
    keyCode: 79
  },
  KeyP: {
    key: "p",
    keyCode: 80
  },
  KeyQ: {
    key: "q",
    keyCode: 81
  },
  KeyR: {
    key: "r",
    keyCode: 82
  },
  KeyS: {
    key: "s",
    keyCode: 83
  },
  KeyT: {
    key: "t",
    keyCode: 84
  },
  KeyU: {
    key: "u",
    keyCode: 85
  },
  KeyV: {
    key: "v",
    keyCode: 86
  },
  KeyW: {
    key: "w",
    keyCode: 87
  },
  KeyX: {
    key: "x",
    keyCode: 88
  },
  KeyY: {
    key: "y",
    keyCode: 89
  },
  KeyZ: {
    key: "z",
    keyCode: 90
  },
  F1: {
    key: "F1",
    keyCode: 112
  },
  F2: {
    key: "F2",
    keyCode: 113
  },
  F3: {
    key: "F3",
    keyCode: 114
  },
  F4: {
    key: "F4",
    keyCode: 115
  },
  F5: {
    key: "F5",
    keyCode: 116
  },
  F6: {
    key: "F6",
    keyCode: 117
  },
  F7: {
    key: "F7",
    keyCode: 118
  },
  F8: {
    key: "F8",
    keyCode: 119
  },
  F9: {
    key: "F9",
    keyCode: 120
  },
  F10: {
    key: "F10",
    keyCode: 121
  },
  F11: {
    key: "F11",
    keyCode: 122
  },
  F12: {
    key: "F12",
    keyCode: 123
  }
};

// src/construtors.ts
var construtors = function() {
  const objects = [];
  Object.keys(ClassGpz).forEach((gpztype) => {
    Array.from(document.querySelectorAll(ClassGpz[gpztype])).filter((el) => el instanceof HTMLCanvasElement).forEach((el) => {
      const axis = gpztype !== "Btn" ? { x: 0, y: 0 } : null;
      const canvas = el;
      const context = canvas.getContext("2d");
      const keycodes2 = getKeyCodes(keycodes_default, el.dataset.gpzBind);
      objects.push({
        buttons: null,
        fingers: [],
        emu: emu[gpztype],
        core: core[gpztype],
        draw: draw[gpztype],
        type: ClassGpz[gpztype],
        from: EventGpz.Startup,
        canvas,
        ctx2d: context,
        axis2d: axis,
        fakekeys: keycodes2,
        stateNew: new Array(keycodes2.length).fill(false),
        stateOld: new Array(keycodes2.length).fill(false),
        chain: []
      });
    });
  });
  return objects;
};

// src/engine.ts
var process = function(self) {
  self.chain.forEach((f) => f(self));
};
var InstallEngine = function(pads) {
  pads.forEach((pad) => {
    pad.chain.push(pad.core);
    pad.chain.push(pad.draw);
    pad.chain.push(pad.emu);
    process(pad);
  });
};

// src/event_feedback.ts
var vibration = function(self, device) {
  const find = (state, index) => state && self.stateOld[index] == false;
  const action = self.stateNew.findIndex(find);
  if (action !== -1) {
    const vibration2 = self.canvas.dataset.gpzVibrate ?? "200";
    const animation = vibration2.split(" ").map((intensity) => Number(intensity));
    device.vibrate(animation);
  }
};
var InstallEventFeedback = function(device, pads) {
  pads.forEach((self) => {
    if ("navigator" in device && "vibrate" in device.navigator) {
      self.chain.push((pad) => vibration(pad, device.navigator));
    }
  });
};

// src/handlers.ts
var handleMouse = function(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [{ x, y }];
};
var handleTouch = function(event, element) {
  const fingers = [];
  const rect = element.getBoundingClientRect();
  Array.from(event.touches).forEach((touch) => {
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    fingers.push({ x, y });
  });
  return fingers;
};
var handleGamepadAxis = function(gamepad) {
  const axis = [];
  const lastOddAxisIndex = gamepad.axes.length - 1;
  for (let pivot = 0;pivot < lastOddAxisIndex; pivot += 2) {
    if (gamepad.axes[pivot] !== 0 || gamepad.axes[pivot + 1] !== 0) {
      axis.push({ x: gamepad.axes[pivot], y: gamepad.axes[pivot + 1] });
    }
  }
  return axis;
};
var handleGamepadButtons = function(gamepad) {
  return gamepad.buttons.map((is, button) => is.pressed && button).filter((id) => id !== false);
};

// src/event_gamepad.ts
var getOnlineGamePads = function(device) {
  return device.getGamepads?.().filter((is) => is?.connected) ?? [];
};
var toggleEvent = function(device, func) {
  const count = getOnlineGamePads(device.navigator).length;
  if (count > 0) {
    device.setInterval(func, 16.666666666666668);
  }
};
var installEventGamepad = function(device, pads) {
  let gamepadState = GamepadFSM.Offline;
  const joypads = pads.filter((self) => self.type == ClassGpz.Joy);
  const buttonpads = pads.filter((self) => self.type == ClassGpz.Btn);
  function processButtons(buttons) {
    buttonpads.forEach((self) => {
      if (!self.stateNew[0] && buttons.length > 0) {
        self.from = EventGpz.Gamepad;
        self.buttons = [true];
        process(self);
      }
      if (self.stateNew[0] && buttons.length == 0) {
        self.from = EventGpz.Gamepad;
        self.buttons = [false];
        process(self);
      }
    });
  }
  function processAxis(axis) {
    if (axis.length > 0) {
      gamepadState = GamepadFSM.Online;
      joypads.forEach((self) => {
        self.from = EventGpz.Gamepad;
        self.axis2d = axis[0];
        process(self);
      });
    }
    if (axis.length === 0 && gamepadState == GamepadFSM.Online) {
      gamepadState = GamepadFSM.Cleanup;
      joypads.forEach((self) => {
        self.from = EventGpz.Gamepad;
        self.axis2d = { x: 0, y: 0 };
        process(self);
      });
    }
  }
  function gamepadEvent() {
    const gamepads = getOnlineGamePads(navigator);
    gamepads.forEach((gamepad) => {
      const buttons = handleGamepadButtons(gamepad);
      const axis = handleGamepadAxis(gamepad);
      processButtons(buttons);
      processAxis(axis);
    });
  }
  function toggleEventGamepad() {
    toggleEvent(device, gamepadEvent);
    window.removeEventListener("gamepadconnected", toggleEventGamepad);
  }
  window.addEventListener("gamepadconnected", toggleEventGamepad);
};

// src/event_mouse.ts
var InstallEventMouse = function(device, pads) {
  pads.forEach((self) => {
    function eventClean(event) {
      self.from = EventGpz.Touch;
      self.fingers = [];
      process(self);
    }
    function eventMove(event) {
      self.from = EventGpz.Touch;
      self.fingers = [...handleMouse(event, self.canvas)];
      process(self);
    }
    function disableMouse(event) {
      self.canvas.removeEventListener(MouseEvents.Move, eventMove);
      self.canvas.removeEventListener(MouseEvents.Leave, eventClean);
      device.removeEventListener(TouchEvents.Start, disableMouse);
    }
    device.addEventListener(TouchEvents.Start, disableMouse);
    self.canvas.addEventListener(MouseEvents.Move, eventMove);
    self.canvas.addEventListener(MouseEvents.Leave, eventClean);
  });
};

// src/event_touch.ts
var InstallEventTouch = function(device, pads) {
  pads.forEach((self) => {
    function eventMove(event) {
      self.from = EventGpz.Touch;
      self.fingers = [...handleTouch(event, self.canvas)];
      process(self);
    }
    Object.values(TouchEvents).forEach((eventName) => {
      self.canvas.addEventListener(eventName, eventMove);
    });
  });
};

// src/event_html.ts
var InstallEventHtml = function(device, pads) {
};

// src/main.ts
document.addEventListener("DOMContentLoaded", () => {
  const pads = construtors();
  InstallEngine(pads);
  InstallEventHtml(window, pads);
  InstallEventTouch(window, pads);
  InstallEventMouse(window, pads);
  installEventGamepad(window, pads);
  InstallEventFeedback(window, pads);
});
