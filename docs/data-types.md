# TSL Data Types

## Overview

TSL has no static type system. All types follow JavaScript semantics. The compiler generates JavaScript code directly, and JavaScript handles all typing at runtime.

---

## Number

Integers and floating-point numbers are represented as JavaScript `Number`.

```tsl
x = 10
pi = 3.14
```

Generates:

```js
let x = 10;
let pi = 3.14;
```

- Integers: `0`, `10`, `42`
- Decimals: `3.14`, `0.5`
- No integer/float distinction

---

## String

Strings use JavaScript `string` semantics.

```tsl
name = "hello"
greeting = 'world'
```

Generates:

```js
let name = "hello";
let greeting = "world";
```

Both double (`"`) and single (`'`) quotes are accepted as delimiters. The generator always outputs double quotes via `JSON.stringify()`.

### Escape Sequences

| Escape | Character |
|--------|-----------|
| `\n`   | newline   |
| `\t`   | tab       |
| `\\`   | backslash |
| `\"`   | double quote |
| `\'`   | single quote |

Example:

```tsl
msg = "hello\nworld\t!"
```

Generates:

```js
let msg = "hello\nworld\t!";
```

---

## Boolean

```tsl
flag = true
disabled = false
```

Generates:

```js
let flag = true;
let disabled = false;
```

Keywords: `true`, `false`

---

## Null

```tsl
value = null
```

Generates:

```js
let value = null;
```

Keyword: `null`

---

## Arrays

```tsl
items = [10, 20, 30]
```

Generates:

```js
let items = [10, 20, 30];
```

Access by index:

```tsl
x = items[0]
```

Generates:

```js
let x = items[0];
```

---

## Objects

```tsl
player = {
    x: 100,
    y: 200
}
```

Generates:

```js
let player = { x: 100, y: 200 };
```

Member access:

```tsl
pos = player.x
```

Generates:

```js
let pos = player.x;
```

---

## Type Summary

| TSL Literal | AST Node | JavaScript |
|-------------|----------|------------|
| `10`, `3.14` | `NumberLiteral` | `10`, `3.14` |
| `"hello"`, `'hello'` | `StringLiteral` | `"hello"` |
| `true`, `false` | `BooleanLiteral` | `true`, `false` |
| `null` | `NullLiteral` | `null` |
| `[1, 2, 3]` | `ArrayExpression` | `[1, 2, 3]` |
| `{ x: 1 }` | `ObjectExpression` | `{ x: 1 }` |

---

## Type Declarations

TSL has no type declarations. Variables are created with `let` on first assignment and assigned without `let` on subsequent assignments within the same scope.

```tsl
x = 10      // generates: let x = 10;
x = 20      // generates: x = 20;
```

The generator tracks variable declarations per scope to avoid duplicate `let`.
