# TSL Operators

This document describes all operators supported by TSL Language, based on the implementation in `src/lexer.js`, `src/parser.js`, and `src/generator.js`.

## Arithmetic Operators

| TSL | JavaScript | Description |
|-----|-----------|-------------|
| `+` | `+` | Addition |
| `-` | `-` | Subtraction |
| `*` | `*` | Multiplication |
| `/` | `/` | Division |
| `%` | `%` | Modulo |

**Examples:**

```tsl
a = 10 + 5      # 15
b = 10 - 5      # 5
c = 10 * 5      # 50
d = 10 / 5      # 2
e = 10 % 3      # 1
```

## Comparison Operators

| TSL | JavaScript | Description |
|-----|-----------|-------------|
| `==` | `==` | Equal |
| `!=` | `!=` | Not equal |
| `<` | `<` | Less than |
| `<=` | `<=` | Less than or equal |
| `>` | `>` | Greater than |
| `>=` | `>=` | Greater than or equal |

**Examples:**

```tsl
x = 5
y = 10
equal = (x == 5)        # true
not_equal = (x == y)    # false
less = (x < y)          # true
greater = (y > x)       # true
```

## Logical Operators

| TSL | JavaScript | Description |
|-----|-----------|-------------|
| `and` | `&&` | Logical AND |
| `or` | `\|\|` | Logical OR |
| `not` | `!` | Logical NOT (prefix) |

**Examples:**

```tsl
x = 5
y = 10
result = (x > 0) and (y < 20)   # true

flag = false
result = not flag               # true
```

## Operator Precedence

Operators are evaluated from highest to lowest precedence. Operators at the same level are left-associative (except `not` which is right-associative).

| Precedence | Operators | Description |
|-----------|-----------|-------------|
| 1 (highest) | `()` | Grouping |
| 2 | `not` | Logical NOT |
| 3 | `*`, `/`, `%` | Multiplication, division, modulo |
| 4 | `+`, `-` | Addition, subtraction |
| 5 | `<`, `<=`, `>`, `>=` | Comparison |
| 6 | `==`, `!=` | Equality |
| 7 | `and` | Logical AND |
| 8 (lowest) | `or` | Logical OR |

### Precedence Examples

```tsl
# Multiplication before addition
a = 2 + 3 * 4     # 14, not 20

# Comparison before logical
if x > 10 and y < 20:
    print("valid")

# Parentheses override precedence
a = (2 + 3) * 4   # 20

# not binds tighter than and/or
result = not a or b    # equivalent to (not a) or b
```

## Generated JavaScript

All TSL operators generate valid JavaScript. The generator wraps binary expressions in parentheses for safety.

| TSL | Generated JavaScript |
|-----|---------------------|
| `a and b` | `(a && b)` |
| `a or b` | `(a \|\| b)` |
| `not x` | `(! x)` |
| `a + b` | `(a + b)` |
| `a == b` | `(a == b)` |

### Example: Full Compilation

```tsl
# TSL source
x = 10
y = 20
if x > 5 and y < 30:
    print("both true")
```

Generates:

```javascript
let x = 10;
let y = 20;
if ((x > 5) && (y < 30)) {
  console.log("both true");
}
```
