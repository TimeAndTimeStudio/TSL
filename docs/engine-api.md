# TSL Engine API Reference

## Status

```text
Version: 1.0
Status: Phase 21 Documentation
Related: SPEC.md Section 28-29
```

## Architecture

TSL is a transpiler that compiles to JavaScript. TSL itself provides no engine runtime.

```text
TSL Source
    ↓ (compiler)
JavaScript
    ↓ (runtime)
Engine / Browser / Node.js
```

The compiler:

- Transpiles TSL syntax to valid JavaScript
- Does not understand engine API
- Does not validate engine function calls
- Does not include engine runtime

Any engine functionality must be provided by the JavaScript runtime environment.

---

## Runtime Helpers

TSL provides two built-in helpers. These must be available in the runtime scope.

### print(...args)

Prints all arguments to stdout.

**TSL:**

```tsl
print("Hello")
print(x, y, z)
```

**Generates:**

```js
print("Hello");
print(x, y, z);
```

**Runtime implementation (reference):**

```js
const print = (...args) => console.log(...args);
```

### range(start, end)

Returns an array of integers from `start` (inclusive) to `end` (exclusive).

**TSL:**

```tsl
for i in range(10):
    print(i)
```

**Generates:**

```js
for (let i of range(10)) {
    console.log(i);
}
```

**Runtime implementation (reference):**

```js
const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
```

---

## Engine API

The following functions are defined by the engine runtime, not by TSL. The compiler passes them through as plain JavaScript function calls.

### clear()

Clears the display/screen.

**TSL:**

```tsl
clear()
```

**Generates:**

```js
clear();
```

### draw_rect(x, y, width, height)

Draws a rectangle at position `(x, y)` with the given `width` and `height`.

**TSL:**

```tsl
draw_rect(10, 20, 50, 50)
```

**Generates:**

```js
draw_rect(10, 20, 50, 50);
```

### draw_circle(x, y, radius)

Draws a circle at position `(x, y)` with the given `radius`.

**TSL:**

```tsl
draw_circle(100, 100, 25)
```

**Generates:**

```js
draw_circle(100, 100, 25);
```

### draw_line(x1, y1, x2, y2)

Draws a line from `(x1, y1)` to `(x2, y2)`.

**TSL:**

```tsl
draw_line(0, 0, 100, 100)
```

**Generates:**

```js
draw_line(0, 0, 100, 100);
```

---

## Render Model

TSL supports a simple render loop pattern using two user-defined functions: `update()` and `draw()`.

**TSL:**

```tsl
function update():
    player_x = player_x + 1

function draw():
    clear()
    draw_rect(player_x, player_y, 32, 32)
```

The runtime is responsible for calling `update()` and `draw()` in a frame loop.

The compiler does not implement the render loop. The runtime does.

---

## Important Notes

1. **Engine API is not part of the compiler.** The compiler only generates function call syntax. It does not validate, transform, or understand engine functions.

2. **Engine API is runtime-dependent.** The actual behavior of `draw_rect()`, `clear()`, etc. is defined by the engine/runtime that executes the generated JavaScript.

3. **print() and range() are runtime helpers.** These must be provided by the runtime environment. They are not JavaScript built-ins.

4. **No engine features are implemented by TSL.** TSL is purely a transpiler. Graphics, audio, input, and all other engine functionality is outside the scope of the compiler.
