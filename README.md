<div align="center">

# :t-rex: GamepadZilla la la!

[![npm](https://img.shields.io/npm/dy/gamepadzilla?logo=npm&logoColor=fff&label=npm%20downloads)](https://www.npmjs.com/package/gamepadzilla)
[![cdn](https://img.shields.io/jsdelivr/npm/hy/gamepadzilla?logo=jsdelivr&logoColor=fff&label=cdn%20downloads)](https://www.jsdelivr.com/package/npm/gamepadzilla)

</div>

> A plug-and-play gamepad frontend framework for HTML5 mobile games, supporting both virtual and physical joysticks. _No scripting required._

 * :octocat: **source code:** <https://github.com/rodrigodornelles/npm-gamepadzilla>
 * :gorilla: **demo website:** <https://rodrigodornelles.github.io/npm-gamepadzilla>

| :video_game: Preview | :joystick: Features  |
| :------------------- | :------------------- |
[![virtual gamepad](https://raw.githubusercontent.com/RodrigoDornelles/RodrigoDornelles/master/media/gamepadzilla-1-0-1.gif)](https://rodrigodornelles.github.io/npm-gamepadzilla) | gpz is fast. _(no DOM manpulation)_<br/><br/>gpz is easy. _(no Javascript needed, use only html5 attributes)_<br/><br/>gpz is pure. _(made with only typescript without dependencies)_<br/><br/>gpz hates the van's old-man! |


### showcase ###

post your open-source game using gamepadzilla! 

| game | stack | source |
| :--- | :---- | :----: | 
| [Coco Battle Royale 2](https://psywave-games.github.io/coco-battle-royale-2) | C, Assembly 6502, WebAssembly, Html, gampadzila.js | [:octocat:repo](https://github.com/psywave-games/coco-battle-royale-2) | 

## How to use

 * import library with [npm](https://www.npmjs.com/package/gamepadzilla) or [cdn](https://www.jsdelivr.com/package/npm/gamepadzilla). :minibus:
 * create html5 **canvas** elements with class `gpz-joy` or `gpz-btn` and configure data attributes.

```html
<!DOCTYPE html>
<html>
    <head>
        <script src='https://cdn.jsdelivr.net/npm/gamepadzilla@1/dist/gamepadzilla.js'></script>
    </head>
    <body style="touch-action: none">
        <canvas
            class="gpz-joy"
            data-gpz-bind="ArrowUp ArrowLeft ArrowDown ArrowRight">
        </canvas>
        <canvas
            class="gpz-btn"
            data-gpz-bind="KeyF">
        </canvas>
    </body>
</html>
```

## How to build

if you intend to contribute, let's rock! :guitar:

### bun :rice: ###

```bash
bun run build
```

### nodejs :rage1: ###

```bash
npm install
npm run build
```

### container :whale2: ###

```bash
podman run --rm -v $(pwd):/app -w /app  -it oven/bun bun run build
```
```bash
docker run --rm -v $(pwd):/app -w /app  -it ove/bun bun run build
```

## Cheatsheet

### main classes

| html5 class | description |
| :---------: | :---------- |
| `gpz-dpad`  | virtual digital pad for directional input. |
| `gpz-joy`   | virtual stick or gamepad analog for directional input. |
| `gpz-btn`   | virtual circle buttons with various console layouts.   |


### data attributes

| html5 attribute | html5 class | description |
| :-------------: | :---------: |:----------- |
| `data-gpz-bind` | \*   | keyboard to emulate<br/>_(follows anti-clockwise button pattern like:<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>)_ |
| `data-gpz-vibrate` | \* | vibration animation when pressed for feedback | feedback vibration when interact |
| `data-gpz-color` |  `gpz-dpad`<br/>`gpz-btn` | button colors when is not pressed |
| `data-gpz-color-action` | `gpz-dpad`<br/>`gpz-btn` | buttons colors when is pressed |
| `data-gpz-size` | `gpz-dpad` | size of shapes elements |
| `data-gpz-offset` | `gpz-dpad` | size of gap in elements |
<!--

### extra classes

You can customize the canvas element by combining visibility at and a condition. Note that there are 60 available classes, and you can also modify their activation as needed.

#### examples

 * `gpz-disable-on-first-keyboard` disable first time when used keyboard
 * `gpz-hidde-on-startup` started insibible
 * `gpz-show-on-mobile` when browser is ios or android show the gamepad

| `<status>` | description | 
| :--------: | :---------- |
| `disable`  | turn off component |
| `enable`   | turn on component
| `hidde`    | turn invisible |
| `show`     | turn visibile  |

| `<condition>` | description |
| :-----------: | :---------- |
| `mobile`      | browser is a smartphone/iPhone |
| `desktop`     | browser not is a smartphone/Iphone |
| `portrait`    | display ratio is a portrait |
| `landscape`   | display ratio is a landscape |
| `on-startup`   | when page start |
| `on-gamepad`  | when gamepad connect |
| `on-keyboard` | when keyboard pressed |
| `on-interact` | when interact with browser |
| `on-mouse`    | when moved or clicked mouse |
| `on-touch`    | when touched the screen |
| `on-first-gamepad` | when gamepad connect (only first time) |
| `on-first-keyboard`| when keyboard pressed (only first time) |
| `on-first-interact`| when interact with browser (only first time) |
| `on-first-mouse`   | when moved or clicked mouse (only first time) |
| `on-first-touch`   | when touched the screen (only first time) |

-->

------------------------------------------------------------------------------------------------------------------
This project is licensed under **GNU Affero General Public License 3.0**, please read the [LICENSE](LICENSE) file.
