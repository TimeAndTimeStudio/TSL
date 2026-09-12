# TSL Render Loop

## Status

```text
Version: 1.0
Phase: 21 — Documentation
Related: engine-api.md, graphics.md
```

## Core Principle

TSL does NOT have a built-in render loop or game loop.

TSL compiles to JavaScript. The render loop must be implemented in the generated JavaScript or provided by the engine runtime.

The compiler does NOT:

- Provide render loop infrastructure
- Handle frame rates or timing
- Manage game loop lifecycle
- Call `update()` or `draw()` automatically

## How It Works

TSL generates plain JavaScript. Any render loop must be written in JavaScript.

### Example: TSL Source

```tsl
function update():
    player_x = player_x + 1

function draw():
    clear()
    draw_rect(player_x, player_y, 32, 32)
```

### Generated JavaScript

```js
function update() {
    player_x = player_x + 1;
}

function draw() {
    clear();
    draw_rect(player_x, player_y, 32, 32);
}
```

The compiler generates the `update()` and `draw()` functions. It does NOT call them. The developer or runtime must call them.

## Render Loop in JavaScript

### Browser: requestAnimationFrame

```js
function frameLoop() {
    update();
    draw();
    requestAnimationFrame(frameLoop);
}
frameLoop();
```

### Node.js: setInterval

```js
function frameLoop() {
    update();
    draw();
}
setInterval(frameLoop, 1000 / 60);
```

### Node.js: No Loop

```js
update();
draw();
```

No loop. One frame. Useful for CLI or one-shot rendering.

## TSL While Loop as Render Loop

TSL's `while` loop can implement a render loop in TSL source:

```tsl
while true:
    update()
    draw()
```

Generates:

```js
while (true) {
    update();
    draw();
}
```

This is a JavaScript infinite loop. It runs on the JavaScript event loop. It will block other JavaScript execution.

## Architecture

```
TSL Source
    ↓ (compiler: transpile only)
JavaScript
    ↓ (runtime)
Render Loop (developer or engine)
    ↓
Engine API (draw_rect, clear, etc.)
```

The compiler's responsibility ends at generating JavaScript. The render loop is a runtime concern.

## Compiler Behavior

The compiler:

- Generates function calls exactly as written
- Does not inject any render loop code
- Does not wrap user code in a frame loop
- Does not provide timing or frame rate control
- Does not know about `update()` or `draw()` conventions

If a TSL program defines `update()` and `draw()`, the compiler treats them as regular functions. No special handling exists.

## Example: Complete TSL Game

### TSL Source

```tsl
player_x = 100
player_y = 100
speed = 2

function update():
    player_x = player_x + speed

function draw():
    clear()
    draw_rect(player_x, player_y, 32, 32)

while true:
    update()
    draw()
```

### Generated JavaScript

```js
let player_x = 100;
let player_y = 100;
let speed = 2;

function update() {
    player_x = player_x + speed;
}

function draw() {
    clear();
    draw_rect(player_x, player_y, 32, 32);
}

while (true) {
    update();
    draw();
}
```

### Required Runtime

The JavaScript environment must provide:

- `clear()` — clears the canvas or display
- `draw_rect(x, y, width, height)` — draws a rectangle

Without these, the program will throw a `ReferenceError` at runtime. This is expected.

## Comparison: Compiler vs Runtime

| Responsibility | Compiler | Runtime / Developer |
|---------------|----------|-------------------|
| Transpile TSL to JavaScript | Yes | No |
| Generate function calls | Yes | No |
| Implement render loop | No | Yes |
| Handle frame timing | No | Yes |
| Call `update()` and `draw()` | No | Yes |
| Provide `clear()` | No | Yes |
| Provide `draw_rect()` | No | Yes |

## Summary

- TSL does NOT have a built-in render loop
- TSL generates plain JavaScript
- The render loop must be written in JavaScript
- The compiler does not inject or manage any loop
- `update()` and `draw()` are just regular JavaScript functions
- The runtime or developer is responsible for calling them in a loop
