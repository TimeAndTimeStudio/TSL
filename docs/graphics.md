# TSL Engine API

## Status

```text
Version: 1.0
Phase: 21 — Documentation
Backend: JavaScript (Node.js)
```

---

## Core Principle

TSL is a transpiler, not a game engine.

TSL compiles TSL source code to JavaScript. Graphics and rendering functionality must be provided by the JavaScript environment (browser, Node.js, or custom runtime).

The compiler does NOT:

- Understand graphics functions
- Validate graphics calls
- Provide graphics documentation
- Include any rendering code

---

## How Function Calls Work

TSL function calls compile directly to JavaScript function calls with no transformation.

```tsl
draw_rect(10, 20, 50, 50)
```

Generates:

```js
draw_rect(10, 20, 50, 50);
```

```tsl
draw_circle(100, 200, 30)
```

Generates:

```js
draw_circle(100, 200, 30);
```

```tsl
draw_line(0, 0, 100, 100)
```

Generates:

```js
draw_line(0, 0, 100, 100);
```

```tsl
clear()
```

Generates:

```js
clear();
```

The compiler treats all function calls the same way: it generates the call with the arguments as-is. No special handling exists for any function name.

---

## Engine API Reference

The following functions are expected by TSL programs that produce graphics:

### `clear()`

Clears the screen or canvas before each frame.

```tsl
clear()
```

Generates:

```js
clear();
```

### `draw_rect(x, y, width, height)`

Draws a rectangle at the specified position with the given dimensions.

```tsl
draw_rect(10, 20, 50, 50)
```

Generates:

```js
draw_rect(10, 20, 50, 50);
```

### `draw_circle(x, y, radius)`

Draws a circle at the specified position with the given radius.

```tsl
draw_circle(100, 200, 30)
```

Generates:

```js
draw_circle(100, 200, 30);
```

### `draw_line(x1, y1, x2, y2)`

Draws a line from one point to another.

```tsl
draw_line(10, 20, 100, 200)
```

Generates:

```js
draw_line(10, 20, 100, 200);
```

---

## Render Model

TSL programs that produce graphics follow a render loop pattern. The program defines `update()` and `draw()` functions. The runtime calls them each frame.

### Standard Pattern

```tsl
function update():
    # update game state

function draw():
    clear()
    draw_rect(10, 10, 50, 50)
```

Generates:

```js
function update() {
  # update game state
}

function draw() {
  clear();
  draw_rect(10, 10, 50, 50);
}
```

### Frame Loop

The frame loop is NOT part of the compiler. It is provided by the runtime environment:

```js
function frameLoop() {
  update();
  draw();
  requestAnimationFrame(frameLoop);
}
frameLoop();
```

---

## Architecture

The separation of concerns:

```
TSL Source
    ↓
TSL Compiler (transpile only)
    ↓
JavaScript
    ↓
Runtime / Engine (graphics, input, audio, etc.)
```

The compiler's responsibility ends at generating valid JavaScript. Everything after that — rendering, input handling, audio, physics — is the responsibility of the runtime or engine.

---

## Compiler Behavior

The compiler:

- Generates function calls exactly as written
- Does not check if a function exists
- Does not validate argument count or types
- Does not add any runtime helpers for graphics

If a graphics function is not defined in the JavaScript environment, it will produce a JavaScript `ReferenceError` at runtime. This is expected behavior — the compiler is not responsible for defining graphics functions.

### Example: Undefined Function

```tsl
draw_rect(10, 20, 50, 50)
```

Generates:

```js
draw_rect(10, 20, 50, 50);
```

If `draw_rect` is not defined in the JavaScript environment, JavaScript will throw:

```
ReferenceError: draw_rect is not defined
```

This is correct behavior. The compiler does not define `draw_rect`.

---

## Comparison: Compiler vs Runtime

| Responsibility | Compiler | Runtime / Engine |
|---------------|----------|-----------------|
| Transpile TSL to JavaScript | Yes | No |
| Validate syntax | Yes | No |
| Generate function calls | Yes | No |
| Define `draw_rect` | No | Yes |
| Define `draw_circle` | No | Yes |
| Define `clear` | No | Yes |
| Define `draw_line` | No | Yes |
| Frame loop | No | Yes |
| Input handling | No | Yes |
| Audio | No | Yes |

---

## Example: Complete Minimal Game

### TSL Source

```tsl
x = 100
y = 100
speed = 2

function update():
    x = x + speed

function draw():
    clear()
    draw_rect(x, y, 50, 50)
```

### Generated JavaScript

```js
let x = 100;
let y = 100;
let speed = 2;

function update() {
  x = x + speed;
}

function draw() {
  clear();
  draw_rect(x, y, 50, 50);
}
```

### Required Runtime

The JavaScript environment must provide:

- `clear()` — clears the canvas
- `draw_rect(x, y, width, height)` — draws a rectangle

Without these, the program will throw runtime errors. This is expected.

---

## Out of Scope

The following are NOT part of TSL compiler:

```text
Graphics rendering
Canvas drawing
Sprite management
Animation system
Input handling
Audio playback
Physics engine
Collision detection
Asset loading
Resource management
```

These are engine concerns, not compiler concerns.

---

## Summary

- TSL transpiles to JavaScript
- Graphics functions are called as plain JavaScript function calls
- The compiler does not understand or validate graphics calls
- Engine API is provided by the runtime, not the compiler
- The render model uses `update()` and `draw()` functions
- The frame loop is provided by the runtime
