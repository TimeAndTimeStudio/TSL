# Getting Started with TSL

TSL is a small programming language that transpiles to JavaScript. It uses indentation for blocks and colon (`:`) to mark block start, with no `end` keyword.

## Installation

```bash
npm install
```

Or install globally:

```bash
npm install -g .
```

## Quick Start

Create a `.tsl` file:

```tsl
# Hello World
print("Hello, World!")
```

Compile and view generated JavaScript:

```bash
node src/cli.js hello.tsl
```

Output:

```text
Loaded: hello.tsl
Compilation successful!

--- Generated JavaScript ---
console.log("Hello, World!");
--- End of Generated Code ---
```

Build to a `.js` file:

```bash
node src/cli.js hello.tsl -o hello.js
```

Or with global install:

```bash
tsl hello.tsl
tsl build hello.tsl -o hello.js
```

Check syntax without output:

```bash
tsl check hello.tsl
```

Show version:

```bash
tsl --version
```

Output: `TSL v1.0.0`

## Language Basics

### Variables

Variables are declared with `=`. The first assignment in a scope generates `let`:

```tsl
name = "TSL"
version = 1
is_ready = true
nothing = null

print(name)
```

Reassignment does not add `let`:

```tsl
x = 10
x = 20  # reassignment, no 'let'
```

### Comments

```tsl
# This is a comment
```

Everything after `#` to end of line is ignored.

### Data Types

**Numbers** — integers and decimals:

```tsl
x = 10
y = 3.14
```

**Strings** — single or double quotes:

```tsl
a = "hello"
b = 'world'
```

**Booleans:**

```tsl
flag = true
```

**Null:**

```tsl
value = null
```

### Operators

**Arithmetic:** `+`, `-`, `*`, `/`, `%`

```tsl
sum = a + b
diff = a - b
product = a * b
quotient = a / b
remainder = a % b
```

**Comparison:** `<`, `<=`, `>`, `>=`, `==`, `!=`

```tsl
if x == 10:
    print("equal")
```

**Logical:** `and`, `or`, `not`

```tsl
if x > 0 and y < 10:
    print("in range")

if not flag:
    print("false")
```

### Control Flow

**If / Else:**

```tsl
x = 15

if x > 10:
    print("big")
else:
    print("small")
```

**While:**

```tsl
counter = 3

while counter > 0:
    print(counter)
    counter = counter - 1
```

**For / In:**

```tsl
for i in range(5):
    print(i)
```

**Break / Continue:**

```tsl
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

### Functions

```tsl
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

### Arrays

```tsl
numbers = [1, 2, 3, 4, 5]
first = numbers[0]
last = numbers[4]
```

### Objects

```tsl
player = { x: 100, y: 200, name: "Hero" }
```

### Member Access

```tsl
matrix = { rows: 3, cols: 4, data: [1, 2, 3] }
print(matrix.rows)
print(matrix.data[0])
```

## Built-in Helpers

### print()

Prints a value to stdout (maps to `console.log`):

```tsl
print("Hello")
print(x)
```

### range()

Generates a sequence of integers:

```tsl
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
```

## Block Syntax

Blocks start with `:` and are defined by indentation (spaces):

```tsl
if x > 10:
    print("big")
    if x > 20:
        print("very big")
    else:
        print("between 10 and 20")
else:
    print("small")
```

- No `end` keyword
- Indentation defines nesting level
- Use spaces (tabs are not supported)

## CLI Reference

| Command | Description |
|---------|-------------|
| `node src/cli.js <file.tsl>` | Compile and show generated JavaScript |
| `node src/cli.js <file.tsl> -o <output.js>` | Compile and write to file |
| `node src/cli.js --version` | Show version |
| `tsl <file.tsl>` | Same as above (global install) |
| `tsl build <file.tsl> [-o <output.js>]` | Build to JavaScript |
| `tsl check <file.tsl>` | Check syntax only |
| `tsl --version` | Show version |

## Error Reporting

Errors include:

- Error type (Lexer Error, Parser Error, Semantic Error, Generator Error)
- Filename
- Line number
- Column number
- Source line with pointer

Example:

```
Parser Error: Expected ':' at line 1:0
> if x > 10
  ^
```

## Generated JavaScript

TSL compiles to valid, readable JavaScript:

| TSL | JavaScript |
|-----|------------|
| `x = 10` | `let x = 10;` |
| `if x > 10:` | `if (x > 10) {` |
| `else:` | `} else {` |
| `for i in range(5):` | `for (let i of range(5)) {` |
| `while x > 0:` | `while (x > 0) {` |
| `function foo(a, b):` | `function foo(a, b) {` |
| `return x` | `return x;` |
| `print(x)` | `console.log(x);` |
| `break` | `break;` |
| `continue` | `continue;` |

## Keywords

Reserved keywords (cannot be used as identifiers):

```
if  else  for  in  while  function  return  break  continue  pass
true  false  null  and  or  not
```

## Identifiers

- Start with a letter or `_`
- Followed by letters, digits, or `_`
- Case-sensitive

Valid: `x`, `player`, `player_x`, `_value`, `x2`
Invalid: `2x`, `player-name`

## Examples

See the `examples/` directory for full working examples:

- `examples/hello.tsl` — Hello World
- `examples/variables.tsl` — Variables and types
- `examples/if.tsl` — If / Else
- `examples/for.tsl` — For / In loop
- `examples/while.tsl` — While loop
- `examples/functions.tsl` — Functions and return
- `examples/arrays.tsl` — Arrays
- `examples/objects.tsl` — Objects
- `examples/member_access.tsl` — Member access
- `examples/break_continue.tsl` — Break and continue
- `examples/logical.tsl` — Logical operators
- `examples/recursion.tsl` — Recursive functions
- `examples/fibonacci.tsl` — Fibonacci
- `examples/bubble_sort.tsl` — Bubble sort
