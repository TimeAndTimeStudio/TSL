# TSL Language Syntax Reference

## Overview

TSL (Turing Scripting Language) is a small, Python-inspired scripting language that compiles to JavaScript. It uses indentation-based blocks and a colon (`:`) to mark block boundaries.

**File extension:** `.tsl`

---

## 1. Comments

Lines beginning with `#` are comments. Everything after `#` to the end of the line is ignored.

```tsl
# This is a comment
x = 10  # inline comment is also supported
```

---

## 2. Identifiers

An identifier is a name used for variables, functions, and properties.

**Rules:**
- Must start with a letter (`a-z`, `A-Z`) or underscore (`_`)
- Subsequent characters may be letters, digits (`0-9`), or underscores
- Case-sensitive: `x` and `X` are different identifiers

**Valid examples:**
```tsl
x
player
player_x
_value
x2
myVar
```

**Invalid examples:**
```tsl
2x       # cannot start with a digit
player-name  # hyphens are not allowed
```

Identifiers cannot be keywords (see section 3).

---

## 3. Keywords

The following words are reserved and cannot be used as identifiers:

| Keyword    | Purpose               |
|------------|-----------------------|
| `if`       | Conditional           |
| `else`     | Conditional alternate |
| `for`      | Loop                  |
| `in`       | Loop iterable         |
| `while`    | Loop                  |
| `function` | Function definition   |
| `return`   | Return from function  |
| `break`    | Exit loop             |
| `continue` | Skip to next iteration |
| `pass`     | No-op placeholder     |
| `true`     | Boolean literal       |
| `false`    | Boolean literal       |
| `null`     | Null literal          |
| `and`      | Logical AND           |
| `or`       | Logical OR            |
| `not`      | Logical NOT           |

---

## 4. Literals

### 4.1 Numbers

Integers and floating-point numbers are supported. Both compile to JavaScript `Number`.

```tsl
x = 10
y = 42
z = 3.14
w = 0.5
```

### 4.2 Strings

Strings use double quotes (`"`) or single quotes (`'`). Both forms are equivalent.

```tsl
name = "Hello, World!"
greeting = 'Hello, World!'
```

**Escape sequences:**

| Escape | Meaning   |
|--------|-----------|
| `\\n`  | Newline   |
| `\\t`  | Tab       |
| `\\`   | Backslash |
| `\\"`  | Double quote |
| `\\'`  | Single quote |

```tsl
message = "Line 1\nLine 2"
path = "C:\\Users\\name"
quote = "She said \"hi\""
```

### 4.3 Booleans

```tsl
is_active = true
is_done = false
```

### 4.4 Null

```tsl
value = null
```

---

## 5. Operators

### 5.1 Arithmetic

| Operator | Meaning |
|----------|---------|
| `+`      | Addition |
| `-`      | Subtraction |
| `*`      | Multiplication |
| `/`      | Division |
| `%`      | Modulo |

```tsl
sum = 10 + 5
diff = 10 - 5
prod = 10 * 5
quot = 10 / 5
rem = 10 % 3
```

### 5.2 Comparison

| Operator | Meaning |
|----------|---------|
| `<`      | Less than |
| `<=`     | Less than or equal |
| `>`      | Greater than |
| `>=`     | Greater than or equal |
| `==`     | Equal (loose) |
| `!=`     | Not equal |

```tsl
is_equal = (x == 10)
is_greater = (x > 5)
```

### 5.3 Logical

| Operator | Meaning |
|----------|---------|
| `and`    | Logical AND |
| `or`     | Logical OR |
| `not`    | Logical NOT (unary, prefix) |

```tsl
result = (x > 0) and (x < 10)
flag = true or false
negated = not true
```

### 5.4 Assignment

| Operator | Meaning |
|----------|---------|
| `=`      | Assign value |

```tsl
x = 10
x = x + 1  # reassignment
```

First assignment in a scope creates a new variable (`let`). Reassignment uses plain assignment.

---

## 6. Operator Precedence

From highest to lowest:

| Precedence | Operators                        |
|------------|----------------------------------|
| 1 (highest)| `()` grouping                    |
| 2          | `not`                            |
| 3          | `*`, `/`, `%`                   |
| 4          | `+`, `-`                         |
| 5          | `<`, `<=`, `>`, `>=`            |
| 6          | `==`, `!=`                       |
| 7          | `and`                            |
| 8 (lowest) | `or`                             |

Use parentheses to control evaluation order:

```tsl
result = (2 + 3) * 4  # 20, not 14
```

---

## 7. Delimiters

| Symbol | Purpose |
|--------|---------|
| `(` `)` | Function call, grouping |
| `[` `]` | Array literal, array access |
| `{` `}` | Object literal |
| `,`    | Argument/element separator |
| `.`    | Member access |
| `:`    | Block delimiter |
| `=`    | Assignment |

---

## 8. Blocks (Indentation-Based)

TSL uses **colon (`:`)** and **indentation** to define blocks. There is no `end` keyword.

```tsl
if x > 10:
    print(x)
else:
    print("small")
```

**Rules:**
- A colon (`:`) marks the start of a block
- Indentation (spaces) defines the block body
- DEDENT (reducing indentation) ends the block
- Use consistent indentation (spaces recommended)

**Nested blocks:**
```tsl
if x > 10:
    if y > 5:
        print("both large")
    print("end of inner if")
print("end of outer if")
```

---

## 9. Statements

### 9.1 Variable Assignment

```tsl
x = 10
name = "Alice"
items = [1, 2, 3]
```

### 9.2 If / Else

```tsl
if condition:
    statement
else:
    statement
```

Example:
```tsl
if x > 10:
    print("big")
else:
    print("small")
```

### 9.3 For Loop

```tsl
for variable in iterable:
    statement
```

Example:
```tsl
for item in items:
    print(item)
```

### 9.4 While Loop

```tsl
while condition:
    statement
```

Example:
```tsl
while count > 0:
    print(count)
    count = count - 1
```

### 9.5 Break

Exits the innermost loop.

```tsl
while true:
    if x > 10:
        break
    x = x + 1
```

### 9.6 Continue

Skips to the next iteration of the innermost loop.

```tsl
for item in items:
    if item < 0:
        continue
    print(item)
```

### 9.7 Pass

A no-op placeholder. Generates a comment in output.

```tsl
if condition:
    pass
```

### 9.8 Return

Returns a value from a function.

```tsl
function add(a, b):
    return a + b

function empty():
    return
```

---

## 10. Functions

### 10.1 Declaration

```tsl
function name(parameters):
    body
```

Example:
```tsl
function add(a, b):
    return a + b
```

### 10.2 Function Call

```tsl
result = add(10, 20)
print(result)
```

### 10.3 Function Values

Functions are first-class values and can be passed as arguments.

```tsl
function apply(func, x):
    return func(x)
```

---

## 11. Arrays

### 11.1 Array Literal

```tsl
items = [1, 2, 3, 4, 5]
empty = []
mixed = [1, "hello", true]
```

### 11.2 Array Access

```tsl
first = items[0]
items[0] = 100
```

---

## 12. Objects

### 12.1 Object Literal

```tsl
player = { x: 100, y: 200, name: "Hero" }
```

Multi-line:
```tsl
player = {
    x: 100,
    y: 200,
    name: "Hero"
}
```

### 12.2 Member Access

```tsl
print(player.x)
player.x = 200
```

### 12.3 Nested Objects

```tsl
matrix = { rows: 3, cols: 4, data: [1, 2, 3] }
print(matrix.data[0])
```

---

## 13. Full Example

```tsl
# TSL program example
function greet(name):
    print("Hello, " + name)

count = 0
for i in range(3):
    if count == 0:
        greet("World")
    else:
        greet("Friend")
    count = count + 1
```

---

## 14. Compile Output

TSL compiles to valid JavaScript. Key transformations:

| TSL | JavaScript |
|-----|------------|
| `if cond:` | `if (cond) {` |
| `else:` | `} else {` |
| `for x in items:` | `for (let x of items)` |
| `while cond:` | `while (cond)` |
| `and` | `&&` |
| `or` | `\|\|` |
| `not x` | `(not x)` |
| First assignment | `let x = ...;` |
| Reassignment | `x = ...;` |
| `print(x)` | `console.log(x);` |
| `pass` | `// pass` |

---

## 15. Error Reporting

All compiler errors include:
- Filename
- Line number
- Column number
- Error message
- Source line (when available)

Error categories:
- **Lexer Error** — invalid characters, unterminated strings
- **Parser Error** — unexpected tokens, missing delimiters
- **Generator Error** — unknown AST nodes
