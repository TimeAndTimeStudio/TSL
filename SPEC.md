# TSL Language Specification

## Status

```text
Version: 1.0
Status: Specification for v1.0
Target: JavaScript
File Extension: .tsl
```

> **SPEC.md คือ Source of Truth ของภาษา TSL**
>
> ถ้าสิ่งใดไม่ได้ระบุไว้ในไฟล์นี้ ให้ถือว่ายังไม่เป็น feature ของ TSL

---

# 1. Language Goal

TSL คือภาษาโปรแกรมขนาดเล็กที่ออกแบบมาเพื่อ:

- เขียนง่าย
- syntax อ่านง่าย
- ใช้ indentation เป็น block
- transpile เป็น JavaScript
- ทำงานบน JavaScript Runtime
- รองรับการสร้างเกมและโปรแกรมขนาดเล็ก

เป้าหมายไม่ใช่การสร้างภาษา general-purpose ขนาดใหญ่

---

# 2. Compiler Model

Compiler ต้องทำงานตามลำดับ:

```text
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

ห้ามใช้:

```text
TSL → string replacement → JavaScript
```

AST เป็น representation กลางที่ Parser และ Generator ใช้ร่วมกัน

---

# 3. Syntax Philosophy

TSL ใช้ syntax ที่ใกล้ Python แต่ไม่ใช่ Python

Block ใช้:

```text
:
INDENT
DEDENT
```

ไม่มี:

```text
end
```

ตัวอย่าง:

```tsl
if x > 10:
    print(x)
```

---

# 4. Comments

คอมเมนต์ใช้:

```tsl
# comment
```

ทุกข้อความหลัง `#` จนจบ line ถือเป็น comment

Comment ไม่มีผลต่อ AST

---

# 5. Identifiers

Identifier ต้อง:

- เริ่มด้วยตัวอักษรหรือ `_`
- ตัวถัดไปเป็นตัวอักษร ตัวเลข หรือ `_`
- case-sensitive

ตัวอย่างที่ถูกต้อง:

```tsl
x
player
player_x
_value
x2
```

ตัวอย่างที่ไม่ถูกต้อง:

```text
2x
player-name
```

---

# 6. Keywords

Reserved keywords:

```text
if
else
for
in
while
function
return
break
continue
true
false
null
and
or
not
```

Keyword ไม่สามารถใช้เป็น identifier ได้

---

# 7. Literals

## 7.1 Number

รองรับจำนวนเต็มและทศนิยม

```tsl
10
42
3.14
0.5
```

ใน JavaScript ใช้ Number

---

## 7.2 String

รองรับ string ด้วย:

```tsl
"hello"
'hello'
```

String ใช้ JavaScript string semantics

---

## 7.3 Boolean

```tsl
true
false
```

Generate เป็น:

```js
true
false
```

---

## 7.4 Null

```tsl
null
```

Generate เป็น:

```js
null
```

---

# 8. Operators

## Arithmetic

```text
+
-
*
/
%
```

## Comparison

```text
<
<=
>
>=
==
!=
```

## Logical

```text
and
or
not
```

---

# 9. Operator Precedence

จากสูงไปต่ำ:

```text
1. ()
2. not
3. *
4. /
5. %
6. +
7. -
8. <
9. <=
10. >
11. >=
12. ==
13. !=
14. and
15. or
```

Implementation ต้อง deterministic

---

# 10. Variables

Assignment ใช้:

```tsl
x = 10
```

ครั้งแรกใน scope ให้สร้าง variable

Generate:

```js
let x = 10;
```

การ assignment ซ้ำ:

```tsl
x = 20
```

Generate:

```js
x = 20;
```

ห้าม generate `let` ซ้ำสำหรับ variable เดิมใน scope เดียวกัน

---

# 11. Variable Scope

TSL ใช้ lexical scope

Function สร้าง local scope

Block สามารถสร้าง scope ตาม JavaScript block semantics

ห้ามสร้าง VM

---

# 12. If

Syntax:

```tsl
if condition:
    statement
```

ตัวอย่าง:

```tsl
if x > 10:
    print(x)
```

Generate:

```js
if (x > 10) {
    console.log(x);
}
```

---

# 13. Else

Syntax:

```tsl
if condition:
    statement
else:
    statement
```

Generate เป็น JavaScript `if/else`

---

# 14. For

Syntax:

```tsl
for variable in expression:
    statement
```

ตัวอย่าง:

```tsl
for i in range(10):
    print(i)
```

Generate:

```js
for (let i of range(10)) {
    console.log(i);
}
```

---

# 15. While

Syntax:

```tsl
while condition:
    statement
```

Generate เป็น JavaScript `while`

---

# 16. Break

ใช้ได้เฉพาะใน loop:

```tsl
break
```

ถ้าอยู่นอก loop:

```text
Semantic Error
```

---

# 17. Continue

ใช้ได้เฉพาะใน loop:

```tsl
continue
```

ถ้าอยู่นอก loop:

```text
Semantic Error
```

---

# 18. Functions

ประกาศ function:

```tsl
function add(a, b):
    return a + b
```

Generate:

```js
function add(a, b) {
    return a + b;
}
```

---

# 19. Function Call

ตัวอย่าง:

```tsl
result = add(10, 20)
```

Generate:

```js
let result = add(10, 20);
```

รองรับ:

- zero arguments
- one argument
- multiple arguments
- nested calls

---

# 20. Return

ใช้ใน function:

```tsl
return value
```

หรือ:

```tsl
return
```

`return` นอก function เป็น semantic error

---

# 21. Arrays

สร้าง array:

```tsl
items = [10, 20, 30]
```

Generate:

```js
let items = [10, 20, 30];
```

Index:

```tsl
x = items[0]
```

Generate:

```js
let x = items[0];
```

---

# 22. Objects

Object แบบพื้นฐาน:

```tsl
player = {
    x: 100,
    y: 200
}
```

Generate:

```js
let player = {
    x: 100,
    y: 200
};
```

Object v1.0 ไม่มี:

```text
class
method syntax
inheritance
generic object system
```

---

# 23. Member Access

รองรับ:

```tsl
player.x
```

Generate:

```js
player.x
```

---

# 24. Function Values

Function สามารถถูกใช้งานเป็น JavaScript function value ตามความสามารถของ backend

ไม่มีระบบ function type แบบ static

---

# 25. Runtime

Runtime ต้องมีเฉพาะ helper ที่ TSL ต้องใช้

ขั้นต่ำ:

```text
print()
range()
```

---

# 26. print()

```tsl
print(value)
```

v1.0 สามารถ map เป็น:

```js
console.log(value);
```

ไม่จำเป็นต้องสร้าง abstraction หากไม่จำเป็น

---

# 27. range()

```tsl
range(10)
```

ให้ผล:

```text
0
1
2
3
...
9
```

Reference implementation:

```js
function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}
```

---

# 28. Engine API

Engine API ขั้นพื้นฐาน:

```text
clear()
draw_rect(x, y, width, height)
draw_circle(x, y, radius)
draw_line(x1, y1, x2, y2)
```

Compiler ไม่ต้องรู้ graphics implementation

Compiler เพียง generate function call

---

# 29. Render Model

TSL สามารถกำหนด:

```tsl
function update():
    ...

function draw():
    ...
```

Runtime เป็นผู้เรียก:

```text
update()
draw()
```

ตาม frame loop

Render implementation ไม่ควรอยู่ใน compiler

---

# 30. Error Categories

ระบบ error แบ่งเป็น:

```text
Lexer Error
Parser Error
Semantic Error
Generator Error
```

ทุก compiler error ควรระบุ:

```text
filename
line
column
message
```

เมื่อทำได้ ควรแสดง source line และ pointer

---

# 31. AST

AST ขั้นต่ำ:

```text
Program

NumberLiteral
StringLiteral
BooleanLiteral
NullLiteral

Identifier

ArrayExpression
ObjectExpression

UnaryExpression
BinaryExpression
CallExpression
MemberExpression

Assignment

IfStatement
WhileStatement
ForStatement

FunctionDeclaration
ReturnStatement
BreakStatement
ContinueStatement
```

ทุก node ควรเก็บ source location

---

# 32. Lexer Tokens

Lexer ต้องรองรับ:

```text
IDENTIFIER
NUMBER
STRING

PLUS
MINUS
STAR
SLASH
PERCENT

EQUAL
EQUAL_EQUAL
NOT_EQUAL

LESS
LESS_EQUAL
GREATER
GREATER_EQUAL

AND
OR
NOT

LPAREN
RPAREN
LBRACKET
RBRACKET
LBRACE
RBRACE

COMMA
DOT
COLON

NEWLINE
INDENT
DEDENT

EOF
```

---

# 33. Indentation

Lexer ต้องเปลี่ยน indentation เป็น:

```text
INDENT
DEDENT
```

ตัวอย่าง:

```tsl
if x:
    if y:
        print(x)
    print(y)
print(x)
```

ต้องจัดการ nesting และ DEDENT ให้ถูกต้อง

ใช้ spaces เป็นหลัก

การรองรับ tabs ต้องกำหนด implementation ให้ deterministic

ห้ามผสม indentation แบบที่ทำให้ความหมายกำกวม

---

# 34. Generator Rules

Generator ต้อง:

- generate valid JavaScript
- generate deterministic output
- preserve semantics
- ไม่เพิ่ม behavior ที่ไม่มีใน TSL
- ไม่ใช้ string replacement เป็น compiler architecture

---

# 35. Runtime Architecture

Runtime แยกจาก compiler

```text
Compiler
    ↓
JavaScript
    ↓
Runtime
    ↓
Engine
```

Compiler ไม่ควรฝัง graphics implementation ลงใน AST

---

# 36. CLI

ต้องรองรับ:

```bash
tsl game.tsl
tsl build game.tsl
tsl build game.tsl -o game.js
tsl check game.tsl
tsl --version
```

---

# 37. Out of Scope

ห้ามถือว่า feature ต่อไปนี้เป็นส่วนหนึ่งของ v1.0:

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
Modules แบบซับซ้อน
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

# 38. Specification Rule

ถ้าความต้องการใหม่ขัดกับ SPEC:

```text
SPEC มี priority สูงกว่า task
```

ถ้าต้องการเปลี่ยน language behavior:

```text
แก้ SPEC ก่อน
จากนั้นจึงแก้ implementation
```

ห้ามแก้ implementation เพื่อให้เกิด behavior ใหม่โดยไม่แก้ specification

---

# 39. v1.0 Definition of Done

TSL v1.0 ต้องมี:

```text
[ ] Lexer
[ ] Parser
[ ] AST
[ ] Validator
[ ] JavaScript Generator
[ ] Variables
[ ] Numbers
[ ] Strings
[ ] Booleans
[ ] Null
[ ] Arithmetic
[ ] Comparison
[ ] Logical Operators
[ ] If
[ ] Else
[ ] For
[ ] While
[ ] Break
[ ] Continue
[ ] Functions
[ ] Return
[ ] Calls
[ ] Arrays
[ ] Basic Objects
[ ] Runtime
[ ] Basic Engine API
[ ] Render Loop
[ ] CLI
[ ] Error System
[ ] Tests
[ ] Documentation
```

---

# 40. Final Principle

TSL v1.0 ต้องเป็น:

```text
Small
Simple
Predictable
Deterministic
Easy to compile
Easy to understand
Easy to test
```

เมื่อมีทางเลือกหลายแบบ:

> เลือกวิธีที่ง่ายที่สุดซึ่งตรงกับ SPEC