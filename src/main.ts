import { construtors } from "./construtors";
import { InstallEngine } from "./engine";
import { InstallEventFeedback } from "./event_feedback";
import { installEventGamepad } from "./event_gamepad"
import { InstallEventMouse } from "./event_mouse";
import { InstallEventTouch } from "./event_touch";
import { InstallEventHtml } from "./event_html";

document.addEventListener('DOMContentLoaded', () => {
    const pads = construtors()
    InstallEngine(pads)
    InstallEventHtml(window, pads)
    InstallEventTouch(window, pads)
    InstallEventMouse(window, pads)
    installEventGamepad(window, pads)
    InstallEventFeedback(window, pads)
})
