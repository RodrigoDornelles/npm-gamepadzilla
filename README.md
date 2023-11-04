# :t-rex: GamepadZilla la la!

> **GPZ** is a plug and play virtual and physical gamepad for html5 mobile games. (no script need)

### :joystick: Features

 * gpz is fast. _(no DOM manpulation)_
 * gpz is easy. _(no Javascript needed, use only html5 attributes)_
 * gpz is pure. _(made with only typescript without denpendencies)_
 * gpz hates the van's shaft.

### :video_game: Preview

## :minibus: How to use

```html
<!DOCTYPE html>
<html>
    <head>
        <script src='gamepadzilla.js'></script>
    </head>
    <body>
        <canvas
            class="gpz-joy"
            data-gpz-bind="ArrowUp ArrowLeft ArrowDown ArrowRight">
        </canvas>
        <canvas
            class="gpz-btn"
            data-gpz-color="yellow"
            data-gpz-bind="KeyF">
        </canvas>
    </body>
</html>
```
