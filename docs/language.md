# TSL Language Reference

## Status

```text
Version: 1.0
File Extension: .tsl
Backend: JavaScript (Node.js)
```

---

## Overview

TSL is a small programming language that transpiles to JavaScript.

Design goals:

- Simple syntax
- Indentation-based blocks
- JavaScript backend
- No VM, no bytecode, no JIT
- Small and predictable

What TSL is NOT:

- Not a general-purpose language
- Not a replacement for Python or JavaScript
- Not a type system
- Not a framework

---

## Compilation Model

```
TSL Source
    ↓
Lexer (tokenize)
    ↓
Parser (AST)
    ↓
Validator (semantic checks)
    ↓
Generator (JavaScript)
    ↓
JavaScript
```

The AST is the shared representation between Parser and Generator.

---

## Syntax Rules

### Indentation

Blocks are defined by indentation.

- Use spaces (tabs are not supported)
- Indentation level determines block nesting
- A colon (`:`) starts a block
- Dedent closes a block

```tsl
if x > 10:
    print(x)
else:
    print("small")
```

### Comments

```tsl
# This is a comment
```

Everything after `#` until end of line is ignored.

### Identifiers

- Start with a letter or `_`
- Followed by letters, digits, or `_`
- Case-sensitive

```tsl
x
player
player_x
_value
x2
```

### Keywords

```text
if      else      for      in      while
function return  break    continue  pass
true    false     null     and     or      not
```

Keywords cannot be used as identifiers.

---

## Literals

### Numbers

```tsl
10
42
3.14
0.5
```

All numbers are JavaScript `Number`.

### Strings

```tsl
"hello"
'hello'
```

Supports escape sequences: `\n`, `\t`, `\\`, `\"`, `\'`.

### Booleans

```tsl
true
false
```

### Null

```tsl
null
```

---

## Operators

### Arithmetic

```text
+   -   *   /   %
```

### Comparison

```text
<   <=   >   >=   ==   !=
```

### Logical

```text
and   or   not
```

### Precedence (high to low)

```text
1.  ()
2.  not
3.  *   /   %
4.  +   -
5.  <   <=   >   >=
6.  ==   !=
7.  and
8.  or
```

---

## Variables

### Assignment

```tsl
x = 10
```

First assignment in a scope: generates `let x = 10;`

Reassignment in the same scope: generates `x = 20;`

```tsl
x = 10    # generates: let x = 10;
x = 20    # generates: x = 20;
```

### Variable Scope

- Lexical scope (JavaScript semantics)
- Function creates a local scope
- Block scope follows JavaScript block semantics

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

### For Loop

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

### While Loop

```tsl
while x > 0:
    x = x - 1
```

Generates:

```js
while (x > 0) {
    x = x - 1;
}
```

### Break

```tsl
break
```

Stops the current loop. Only valid inside a loop.

### Continue

```tsl
continue
```

Skips to the next iteration. Only valid inside a loop.

### Pass

```tsl
pass
```

No-op. Generates `// pass` (empty comment).

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
print(result)
```

Generates:

```js
let result = add(10, 20);
console.log(result);
```

### Return

```tsl
return value
return
```

`return` outside a function is a semantic error.

### Parameters

Functions accept zero or more parameters.

```tsl
function greet(name):
    print("Hello, " + name)
```

---

## Arrays

### Creation

```tsl
numbers = [1, 2, 3, 4, 5]
```

Generates:

```js
let numbers = [1, 2, 3, 4, 5];
```

### Access

```tsl
first = numbers[0]
```

Generates:

```js
let first = numbers[0];
```

---

## Objects

### Creation

```tsl
player = { x: 100, y: 200, name: "Hero" }
```

Generates:

```js
let player = { x: 100, y: 200, name: "Hero" };
```

### Member Access

```tsl
print(player.x)
print(player.name)
```

Generates:

```js
console.log(player.x);
console.log(player.name);
```

### Object Assignment

```tsl
player.x = 200
```

Generates:

```js
player.x = 200;
```

### Nested Objects

```tsl
person = { name: "Alice", age: 25, hobbies: ["reading", "coding"] }
print(person.hobbies[0])
```

Generates:

```js
console.log(person.hobbies[0]);
```

---

## Composite Access

Member access and array access can be chained:

```tsl
person.hobbies[0]
player.x.y[1]
```

Generates:

```js
person.hobbies[0]
player.x.y[1]
```

---

## Runtime Helpers

### print()

```tsl
print(value)
```

Maps to:

```js
console.log(value);
```

### range()

```tsl
range(10)
```

Returns `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`.

Reference implementation:

```js
function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}
```

---

## Error System

Errors are categorized:

```text
Lexer Error
Parser Error
Semantic Error
Generator Error
Runtime Error
```

Each compiler error includes:

```text
filename
line
column
message
```

---

## AST Nodes

The AST contains these node types:

```text
Program
NumberLiteral, StringLiteral, BooleanLiteral, NullLiteral
Identifier
ArrayExpression, ObjectExpression, Property
UnaryExpression, BinaryExpression, CallExpression
MemberExpression, ArrayAccess
Assignment
IfStatement, WhileStatement, ForStatement
FunctionDeclaration, ReturnStatement
BreakStatement, ContinueStatement
Pass, ExpressionStatement
```

Each node stores source location information.

---

## Token Types

The Lexer produces these tokens:

```text
IDENTIFIER, NUMBER, STRING

IF, ELSE, FOR, IN, WHILE, FUNCTION, RETURN,
BREAK, CONTINUE, PASS, TRUE, FALSE, NULL,
AND, OR, NOT

PLUS, MINUS, STAR, SLASH, PERCENT
EQUAL, EQUAL_EQUAL, NOT_EQUAL
LESS, LESS_EQUAL, GREATER, GREATER_EQUAL

LPAREN, RPAREN, LBRACKET, RBRACKET
LBRACE, RBRACE, COMMA, DOT, COLON

NEWLINE, INDENT, DEDENT
EOF
```

---

## CLI

```bash
tsl game.tsl
tsl build game.tsl
tsl build game.tsl -o game.js
tsl check game.tsl
tsl --version
```

---

## Out of Scope

The following are NOT part of TSL v1.0:

```text
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
Modules
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

## Example Programs

### Hello World

```tsl
# Hello World
print("Hello, World!")
```

### Variables and Conditionals

```tsl
x = 10
y = 20

if x < y:
    print("x is smaller")
else:
    print("y is smaller")
```

### Function with Return

```tsl
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

### Loop with Break

```tsl
i = 0
while true:
    i = i + 1
    if i >= 10:
        break
    print(i)
```

### Object Pattern

```tsl
function create_point(x, y):
    return { x: x, y: y }

function point_distance(p1, p2):
    dx = p2.x - p1.x
    dy = p2.y - p1.y
    return dx * dx + dy * dy

p1 = create_point(0, 0)
p2 = create_point(3, 4)
print(point_distance(p1, p2))
```
