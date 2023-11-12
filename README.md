<div align="center">

# :t-rex: GamepadZilla la la!

</div>

> A plug-and-play gamepad frontend framework for HTML5 mobile games, supporting both virtual and physical joysticks. _No scripting required._

| :video_game: Preview | :joystick: Features  |
| :------------------- | :------------------- |
[![virtual gamepad](https://raw.githubusercontent.com/RodrigoDornelles/RodrigoDornelles/master/media/gamepadzilla-1-0-1.gif)](https://rodrigodornelles.github.io/npm-gamepadzilla) | gpz is fast. _(no DOM manpulation)_<br/><br/>gpz is easy. _(no Javascript needed, use only html5 attributes)_<br/><br/>gpz is pure. _(made with only typescript without dependencies)_<br/><br/>gpz hates the van's old-man! |

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

## Cheatsheet

### main classes

| html5 class | description |
| :---------: | :---------- |
| `gpz-joy`   | virtual stick or gamepad analog for directional input. |
| `gpz-btn`   | virtual circle buttons with various console layouts.   |


### data attributes

| html5 attribute | html5 class | description |
| :-------------: | :---------: |:----------- |
| `data-gpz-bind` | `gpz-joy`<br/>`gpz-btn`   | keyboard to emulate _(follows anti-clockwise button pattern such as <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>)_ |

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
