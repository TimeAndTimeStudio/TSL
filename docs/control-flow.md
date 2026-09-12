# Control Flow

Control flow statements determine the order in which code is executed. TSL supports conditional execution, loops, and loop control.

## If / Else

### Syntax

```tsl
if condition:
    statement
else:
    statement
```

### Example

```tsl
if x > 10:
    print("big")
else:
    print("small")
```

### Generated JavaScript

```js
if (x > 10) {
    print("big");
} else {
    print("small");
}
```

### Chained Conditionals

```tsl
if x > 10:
    print("big")
elif x == 10:
    print("equal")
else:
    print("small")
```

## While

### Syntax

```tsl
while condition:
    statement
```

### Example

```tsl
while i < 10:
    print(i)
    i = i + 1
```

### Generated JavaScript

```js
while (i < 10) {
    print(i);
    i = i + 1;
}
```

## For

### Syntax

```tsl
for variable in expression:
    statement
```

### Example

```tsl
for i in range(10):
    print(i)
```

### Generated JavaScript

```js
for (let i of range(10)) {
    print(i);
}
```

The `for` loop iterates over any iterable expression (arrays, ranges, etc.) using JavaScript's `for...of`.

## Break

### Syntax

```tsl
break
```

### Generated JavaScript

```js
break;
```

### Rules

- Only valid inside a loop (`while` or `for`).
- Placed outside a loop is a **semantic error**.

### Example

```tsl
for i in range(100):
    if i == 5:
        break
    print(i)
```

## Continue

### Syntax

```tsl
continue
```

### Generated JavaScript

```js
continue;
```

### Rules

- Only valid inside a loop (`while` or `for`).
- Placed outside a loop is a **semantic error**.

### Example

```tsl
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

## Pass

### Syntax

```tsl
pass
```

### Generated JavaScript

```js
// pass
```

`pass` is a no-op placeholder. It generates a JavaScript comment and has no runtime effect.

## Full Example

```tsl
i = 0
while i < 10:
    i = i + 1
    if i == 5:
        continue
    if i == 8:
        break
    print(i)
```

### Generated JavaScript

```js
i = 0;
while (i < 10) {
    i = i + 1;
    if (i == 5) {
        continue;
    }
    if (i == 8) {
        break;
    }
    print(i);
}
```

## Summary

| Statement  | TSL Syntax       | JavaScript Output | Valid Inside |
| ---------- | ---------------- | ----------------- | ------------ |
| if         | `if cond:`       | `if (cond) {}`    | any block    |
| else       | `else:`          | `else {}`         | any block    |
| while      | `while cond:`    | `while (cond) {}` | any block    |
| for        | `for v in expr:` | `for (let v of expr) {}` | any block |
| break      | `break`          | `break;`          | loops        |
| continue   | `continue`       | `continue;`       | loops        |
| pass       | `pass`           | `// pass`         | any block    |
