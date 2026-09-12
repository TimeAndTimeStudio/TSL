# TSL Arrays

## Array Creation

Arrays are created using square bracket syntax with comma-separated elements.

```tsl
items = [10, 20, 30]
```

Generates:

```js
let items = [10, 20, 30];
```

### Empty Array

```tsl
empty = []
```

Generates:

```js
let empty = [];
```

### Mixed Types

Arrays can hold any combination of TSL values:

```tsl
mixed = [10, "hello", true, null]
```

Generates:

```js
let mixed = [10, "hello", true, null];
```

---

## Nested Arrays

Arrays can contain other arrays:

```tsl
matrix = [[1, 2], [3, 4]]
```

Generates:

```js
let matrix = [[1, 2], [3, 4]];
```

---

## Array Access

Access an element by index using bracket notation:

```tsl
x = items[0]
```

Generates:

```js
let x = items[0];
```

Index can be a variable:

```tsl
idx = 0
x = items[idx]
```

Generates:

```js
let idx = 0;
let x = items[idx];
```

Index can be an expression:

```tsl
idx = 0
x = items[idx + 1]
```

Generates:

```js
let idx = 0;
let x = items[idx + 1];
```

---

## Array Assignment

Assign to an element by index:

```tsl
items[0] = 100
```

Generates:

```js
items[0] = 100;
```

---

## Array of Objects

Arrays can hold objects:

```tsl
people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
]
```

Generates:

```js
let people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
];
```

---

## AST Representation

| TSL Syntax | AST Node |
|------------|----------|
| `[1, 2, 3]` | `ArrayExpression` |
| `items[0]` | `ArrayAccess` |
| `items[0] = 100` | Assignment with `ArrayAccess` target |

---

## Summary

| Feature | Syntax |
|---------|--------|
| Create | `[1, 2, 3]` |
| Empty | `[]` |
| Access | `items[0]` |
| Assign | `items[0] = 100` |
| Nested | `[[1, 2], [3, 4]]` |
| Expression index | `items[i + 1]` |
| Mixed types | `[10, "hello", true, null]` |
| Array of objects | `[{ x: 1 }, { x: 2 }]` |
