# TSL Language Specification

> **Quick Reference** — For the complete specification, see `SPEC.md` in the project root.
>
> This document is based on the actual implementation (v1.0.0). No features beyond what is implemented are documented.

---

## Version

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Target | JavaScript |
| Extension | `.tsl` |
| Runtime | Node.js |

---

## Language Overview

TSL is a small, indentation-based scripting language that transpiles to JavaScript.

It is designed for:
- Simplicity
- Readability
- Game and small program prototyping

---

## Syntax

### Blocks

TSL uses indentation for block structure, not braces or keywords.

```tsl
if x > 10:
    print(x)
```

Block delimiters:
- `:` at end of header line
- Indentation (spaces) for body
- Dedent to close block

No `end` keyword.

### Comments

```tsl
# This is a comment
```

Everything after `#` to end of line is a comment. Comments do not appear in the AST.

### Case Sensitivity

TSL is **case sensitive**. `print` is not the same as `Print`.

### Identifiers

- Must start with a letter or `_`
- Followed by letters, digits, or `_`
- Examples: `x`, `player`, `player_x`, `_value`, `x2`
- Cannot be a reserved keyword

### Reserved Keywords

```
if      else       for       in        while
function return   break     continue  pass
true    false      null      and       or        not
```

Keywords cannot be used as identifiers.

---

## Data Types

### Numbers

Integers and floating-point numbers.

```tsl
10
42
3.14
0.5
```

Generated as JavaScript `Number`.

### Strings

Double or single quotes.

```tsl
"hello"
'world'
```

Escape sequences: `\n`, `\t`, `\\`, `\"`, `\'`.

Generated as JavaScript `string`.

### Booleans

```tsl
true
false
```

Generated as JavaScript `true` / `false`.

### Null

```tsl
null
```

Generated as JavaScript `null`.

### Arrays

```tsl
items = [10, 20, 30]
x = items[0]
```

Generated as JavaScript arrays.

### Objects

```tsl
player = {
    x: 100,
    y: 200
}
```

Generated as JavaScript objects.

Object literals use space-wrapped braces: `{ key: value }`.

v1.0 does **not** support:
- `class`
- method syntax
- inheritance
- generic object system

### Member Access

```tsl
player.x
```

Generated as `player.x`.

---

## Operators

### Arithmetic

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

### Comparison

| Operator | Description |
|----------|-------------|
| `<` | Less than |
| `<=` | Less than or equal |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `==` | Equal |
| `!=` | Not equal |

### Logical

| Keyword | JavaScript | Description |
|---------|------------|-------------|
| `and` | `&&` | Logical AND |
| `or` | `||` | Logical OR |
| `not` | `!` | Logical NOT |

### Operator Precedence (high to low)

```
1.  ()
2.  not
3.  *
4.  /
5.  %
6.  +
7.  -
8.  <
9.  <=
10. >
11. >=
12. ==
13. !=
14. and
15. or
```

---

## Variables

### Declaration

First assignment in a scope creates a variable with `let`:

```tsl
x = 10
```

Generates: `let x = 10;`

### Reassignment

Subsequent assignments use bare assignment:

```tsl
x = 20
```

Generates: `x = 20;`

The compiler tracks declared variables per scope to avoid duplicate `let`.

### Scope

- Lexical scope
- Each function creates a new scope
- Variables declared with first assignment are function-scoped (via `let`)

---

## Control Flow

### If / Else

```tsl
if x > 10:
    print("big")
else:
    print("small")
```

Generates:

```js
if (x > 10) {
    console.log("big");
} else {
    console.log("small");
}
```

### For (for...of)

```tsl
for i in range(10):
    print(i)
```

Generates:

```js
for (let i of range(10)) {
    console.log(i);
}
```

### While

```tsl
while x < 10:
    x = x + 1
```

Generates:

```js
while (x < 10) {
    x = x + 1;
}
```

### Break

Exits the innermost loop.

```tsl
break
```

Using `break` outside a loop is a **Semantic Error**.

### Continue

Skips to the next iteration of the innermost loop.

```tsl
continue
```

Using `continue` outside a loop is a **Semantic Error**.

### Pass

No-op statement. Generates a JavaScript comment.

```tsl
pass
```

Generates: `// pass`

---

## Functions

### Declaration

```tsl
function add(a, b):
    return a + b
```

Generates:

```js
function add(a, b) {
    return a + b;
}
```

### Call

```tsl
result = add(10, 20)
```

Generates:

```js
let result = add(10, 20);
```

Supports: zero arguments, one argument, multiple arguments, nested calls.

### Return

```tsl
return value
```

or:

```tsl
return
```

Using `return` outside a function is a **Semantic Error**.

---

## Built-in Helpers

### print(...args)

Prints values to stdout.

```tsl
print("Hello")
print(x, y)
```

Maps to: `console.log(...args)`

### range(n)

Returns an array `[0, 1, 2, ..., n-1]`.

```tsl
for i in range(5):
    print(i)
```

Reference implementation:

```js
function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}
```

---

## Compiler Pipeline

```
TSL Source
    ↓
Lexer
    ↓
Tokens
    ↓
Parser
    ↓
AST
    ↓
Validator
    ↓
JavaScript Generator
    ↓
JavaScript
```

### Lexer

Converts source text into tokens. Handles:
- Literals (numbers, strings)
- Identifiers and keywords
- Operators and delimiters
- Indentation (INDENT / DEDENT)
- Comments (discarded)
- Newlines

### Parser

Converts tokens into an AST.

### Validator

Checks semantic rules:
- `break` / `continue` must be inside a loop
- `return` must be inside a function

### Generator

Converts AST to valid, deterministic JavaScript.

Rules:
- Generates valid JavaScript
- Deterministic output
- Preserves semantics
- No string replacement
- No behavior not present in TSL

---

## AST Node Types

| Node | Description |
|------|-------------|
| `Program` | Root node, contains body statements |
| `NumberLiteral` | Numeric literal |
| `StringLiteral` | String literal |
| `BooleanLiteral` | Boolean literal |
| `NullLiteral` | Null literal |
| `Identifier` | Variable name |
| `ArrayExpression` | Array literal `[...]` |
| `ObjectExpression` | Object literal `{...}` |
| `Property` | Key-value pair in object |
| `UnaryExpression` | Unary operator (`not`, `-`) |
| `BinaryExpression` | Binary operator (`+`, `and`, etc.) |
| `CallExpression` | Function call |
| `MemberExpression` | Dot access (`obj.prop`) |
| `ArrayAccess` | Bracket access (`arr[0]`) |
| `Assignment` | Variable assignment |
| `IfStatement` | if / else |
| `WhileStatement` | while loop |
| `ForStatement` | for...of loop |
| `FunctionDeclaration` | function definition |
| `ReturnStatement` | return value |
| `BreakStatement` | break |
| `ContinueStatement` | continue |

Every node stores source location (`line`, `column`, `endLine`, `endColumn`).

---

## Error System

### Error Categories

| Category | Class |
|----------|-------|
| Lexer Error | `LexerError` |
| Parser Error | `ParserError` |
| Semantic Error | `ValidationError` |
| Generator Error | `GeneratorError` |
| Runtime Error | `RuntimeError` |

### Error Format

All compiler errors include:

```
filename
line
column
message
source line (when available)
```

---

## CLI

### Installation

```bash
npm install
```

### Commands

```bash
# Compile and display generated JavaScript
tsl <file.tsl>

# Build to JavaScript file
tsl build <file.tsl> -o <output.js>

# Check syntax without generating output
tsl check <file.tsl>

# Show version
tsl --version
```

Or with explicit Node:

```bash
node src/cli.js <file.tsl>
node src/cli.js build <file.tsl> -o <output.js>
node src/cli.js check <file.tsl>
node src/cli.js --version
```

### Requirements

- Input file must have `.tsl` extension
- File must exist on disk

---

## Engine API (v1.0)

Basic graphics functions. The compiler generates them as-is without understanding their implementation.

```text
clear()
draw_rect(x, y, width, height)
draw_circle(x, y, radius)
draw_line(x1, y1, x2, y2)
```

### Render Model

```tsl
function update():
    ...

function draw():
    ...
```

The runtime calls `update()` and `draw()` in a frame loop.

---

## Out of Scope (not in v1.0)

The following are **not** part of TSL v1.0:

```
Garbage Collector
VM
Bytecode
JIT
Native Compiler
Static Type System
Generics
Classes
Inheritance
Interfaces
Complex Modules
Package Manager
Macros
Decorators
Async Language
Threads
Coroutines
Pattern Matching
Destructuring
Operator Overloading
Metaprogramming
Optimizer
IDE
LSP
Debugger
Full ECS
```

---

## Design Principles

TSL v1.0 is designed to be:

```
Small
Simple
Predictable
Deterministic
Easy to compile
Easy to understand
Easy to test
```

When in doubt: **choose the simplest option that matches the specification.**

---

## Files

| File | Purpose |
|------|---------|
| `src/lexer.js` | Tokenizer |
| `src/parser.js` | Parser |
| `src/ast.js` | AST node definitions |
| `src/validator.js` | Semantic validation |
| `src/generator.js` | JavaScript code generation |
| `src/errors.js` | Error types |
| `src/cli.js` | CLI entry point |
| `SPEC.md` | Full language specification |
| `AGENTS.md` | Agent development rules |
