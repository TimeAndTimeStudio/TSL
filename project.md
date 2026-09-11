# TSL Language & JavaScript Transpiler

## Development Plan — Phase 0 → 100%

> เอกสารนี้ออกแบบสำหรับใช้เป็นแผนงานหลักให้ AI coding agent โดยเฉพาะ Qwen3.6-35B-A3B พัฒนา TSL ได้อย่างเป็นขั้นตอน
>
> เป้าหมายหลัก: **สร้างภาษา TSL ขนาดเล็ก → AST → JavaScript**
>
> หลักการ: **Small, Deterministic, Explicit, Testable, No Scope Creep**

---

# 0. AI DEVELOPMENT CONTRACT

AI ที่ทำงานกับโปรเจกต์นี้ต้องปฏิบัติตามกฎต่อไปนี้

## 0.1 ห้ามทำงานเกิน Phase

AI ต้องทำเฉพาะ Phase ปัจจุบัน

```text
Current Phase
    ↓
Inspect
    ↓
Implement
    ↓
Test
    ↓
Verify
    ↓
Review
    ↓
STOP
```

ห้ามทำ Phase ถัดไปเอง

ห้ามเพิ่ม feature เพราะเห็นว่าน่าจะมีประโยชน์

---

## 0.2 ห้ามเดา Specification

ถ้า specification ยังไม่ได้กำหนด:

```text
DO NOT GUESS
DO NOT INVENT
DO NOT EXTEND
```

ให้เลือก implementation ที่เล็กที่สุด หรือบันทึกเป็น unresolved specification

---

## 0.3 ห้ามเปลี่ยน Scope

ห้ามเพิ่ม:

- feature ใหม่
- syntax ใหม่
- runtime API ใหม่
- abstraction ใหม่
- dependency ใหม่
- architecture ใหม่

โดยไม่มีการแก้ specification อย่างชัดเจน

---

## 0.4 แก้ให้น้อยที่สุด

หลักการ:

```text
Smallest Correct Change
```

ห้าม refactor ไฟล์ที่ไม่เกี่ยวข้อง

ห้าม rewrite ระบบเดิมโดยไม่มีเหตุผล

---

## 0.5 ต้องตรวจของจริง

ก่อนแก้ไข:

```text
Inspect existing code
Inspect project structure
Inspect tests
Inspect package.json
```

ห้ามเดาจากชื่อไฟล์

---

## 0.6 ทุกการเปลี่ยนแปลงต้องทดสอบ

หลังแก้:

```text
Run targeted test
Run related tests
Run full test suite when appropriate
```

ถ้า test fail:

```text
STOP
DIAGNOSE
FIX
TEST AGAIN
```

---

# 1. PROJECT GOAL

TSL คือ programming language ขนาดเล็กที่ compile/transpile เป็น JavaScript

Architecture:

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
  Validation
      ↓
 JavaScript Generator
      ↓
 JavaScript
      ↓
 Runtime
```

เป้าหมายไม่ใช่การสร้างภาษา general-purpose ขนาดใหญ่

เป้าหมายคือ:

```text
Simple Syntax
+
Small Compiler
+
Small Runtime
+
Basic Graphics API
```

---

# 2. HARD SCOPE

## 2.1 Language Features

v1.0 รองรับเฉพาะ:

```text
Variables
Numbers
Strings
Booleans
Null
Arithmetic
Comparison
Logical Operators
Assignment
If
Else
For
While
Function
Return
Break
Continue
Function Call
Array
Basic Object
Indentation
```

---

# 2.2 Explicitly Out of Scope

ห้ามทำใน v1.0:

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
Complex Module System
Package Manager
Macros
Decorators
Async System
Promises as language feature
Threads
Coroutines
Pattern Matching
Destructuring
Operator Overloading
Metaprogramming
Optimizer
Compiler Plugin System
IDE
LSP
Debugger
Full ECS
```

ถ้าไม่ได้เขียนไว้ใน Scope ถือว่า **ไม่มี**

---

# 3. IMPLEMENTATION PRINCIPLES

## 3.1 Prefer JavaScript Backend

TSL semantics ควร map ไป JavaScript ให้ตรงที่สุด

ตัวอย่าง:

```tsl
x = 10
```

→

```js
let x = 10;
```

---

## 3.2 No String Replacement Compiler

ห้าม:

```text
TSL
 ↓
replace()
 ↓
JavaScript
```

ต้องใช้:

```text
Source
 ↓
Lexer
 ↓
Parser
 ↓
AST
 ↓
Generator
```

---

## 3.3 AST เป็น Contract กลาง

Lexer และ Generator ไม่ควรสื่อสารกันโดยตรง

Parser สร้าง AST

Generator อ่าน AST

---

## 3.4 Deterministic Output

Source เดิมต้อง generate JavaScript แบบ deterministic

```text
same source
    ↓
same AST
    ↓
same JS
```

---

# 4. PROJECT STRUCTURE

เริ่มต้นด้วย:

```text
tsl/
├── src/
│   ├── lexer.js
│   ├── parser.js
│   ├── ast.js
│   ├── validator.js
│   ├── generator.js
│   ├── compiler.js
│   └── cli.js
│
├── runtime/
│   └── runtime.js
│
├── examples/
│   └── hello.tsl
│
├── tests/
│   ├── lexer/
│   ├── parser/
│   ├── validator/
│   ├── generator/
│   ├── runtime/
│   └── integration/
│
├── docs/
├── SPEC.md
├── README.md
└── package.json
```

ห้ามเพิ่ม folder architecture ใหม่โดยไม่มีเหตุผล

---

# PHASE 0 — SPEC FOUNDATION

## 0%

กำหนด specification ขั้นต่ำก่อนเขียน compiler

สร้าง:

```text
SPEC.md
```

ต้องกำหนด:

```text
File extension
Comments
Identifiers
Literals
Operators
Blocks
Indentation
Statements
Expressions
Functions
Arrays
Objects
Scope
Runtime behavior
Errors
```

### Rule

Specification ต้องเล็ก

ถ้ากำหนดได้ง่ายด้วย JavaScript semantics ให้ใช้ JavaScript semantics

### Done

```text
[ ] SPEC.md มีอยู่
[ ] syntax พื้นฐานชัดเจน
[ ] semantics พื้นฐานชัดเจน
[ ] ไม่มี unresolved core decision
```

---

# PHASE 1 — SKELETON

## 5%

สร้าง project structure

สร้าง CLI ขั้นต่ำ:

```bash
node src/cli.js hello.tsl
```

ต้อง:

```text
read file
validate extension
catch errors
exit with correct status
```

### Done

```text
[ ] project structure
[ ] CLI
[ ] file loading
[ ] error handling
[ ] minimal README
```

---

# PHASE 2 — LEXER

## 10%

สร้าง Lexer เท่านั้น

รองรับ:

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

## Indentation

ตัวอย่าง:

```tsl
if x:
    print(x)
```

ต้องได้:

```text
IF
IDENTIFIER
COLON
NEWLINE
INDENT
IDENTIFIER
LPAREN
IDENTIFIER
RPAREN
NEWLINE
DEDENT
EOF
```

### Lexer Constraints

ห้าม:

```text
AST logic
Parser logic
Semantic validation
JavaScript generation
```

### Done

```text
[ ] tokens correct
[ ] indentation correct
[ ] line correct
[ ] column correct
[ ] invalid character error
[ ] lexer tests pass
```

---

# PHASE 3 — AST

## 15%

กำหนด AST ก่อน parser ใหญ่เกินไป

Nodes:

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

Assignment

IfStatement
WhileStatement
ForStatement

FunctionDeclaration
ReturnStatement
BreakStatement
ContinueStatement
```

ทุก node ต้องมี source location อย่างน้อย:

```text
line
column
```

### Done

```text
[ ] AST constructors/factories
[ ] consistent structure
[ ] source location
[ ] AST tests
```

---

# PHASE 4 — PARSER EXPRESSIONS

## 20%

เริ่มจาก expression ก่อน statement

ลำดับ:

```text
Primary
 ↓
Call
 ↓
Unary
 ↓
Multiplication
 ↓
Addition
 ↓
Comparison
 ↓
Equality
 ↓
Logical AND
 ↓
Logical OR
```

รองรับ:

```text
number
string
boolean
null
identifier
array
object
(...)
function call
unary
binary
```

### Done

```text
[ ] parse literals
[ ] parse identifiers
[ ] parse calls
[ ] parse arrays
[ ] parse objects
[ ] parse unary
[ ] parse binary
[ ] precedence tests pass
```

---

# PHASE 5 — PARSER STATEMENTS

## 25%

รองรับ:

```text
assignment
if
else
for
while
function
return
break
continue
```

Block syntax:

```tsl
if x > 10:
    print(x)
```

ใช้:

```text
NEWLINE
INDENT
DEDENT
```

ไม่มี:

```text
end
```

### Done

```text
[ ] statement parsing
[ ] block parsing
[ ] indentation nesting
[ ] parser errors
[ ] parser tests
```

---

# PHASE 6 — VALIDATOR

## 30%

ตรวจ semantic rules ที่จำเป็นเท่านั้น

ตัวอย่าง:

```tsl
break
```

นอก loop:

```text
Semantic Error: break outside loop
```

ตัวอย่าง:

```tsl
continue
```

นอก loop:

```text
Semantic Error: continue outside loop
```

ตัวอย่าง:

```tsl
return 10
```

นอก function:

```text
Semantic Error: return outside function
```

### Validator ต้องตรวจ

```text
return context
break context
continue context
function structure
```

ยังไม่ทำ:

```text
advanced type checking
data flow analysis
optimization
```

### Done

```text
[ ] semantic errors detected
[ ] line/column correct
[ ] invalid AST rejected
```

---

# PHASE 7 — JS GENERATOR CORE

## 40%

แปลง AST เป็น JavaScript

รองรับ:

```text
literals
identifiers
binary
unary
calls
arrays
objects
assignment
```

ตัวอย่าง:

```tsl
x = 10
```

→

```js
let x = 10;
```

### Variable Rule

Assignment ครั้งแรกใน scope:

```js
let x = ...
```

Assignment ต่อไป:

```js
x = ...
```

อย่าใช้:

```js
let x = ...
let x = ...
```

### Done

```text
[ ] expressions
[ ] assignment
[ ] arrays
[ ] objects
[ ] calls
[ ] generator tests
```

---

# PHASE 8 — CONTROL FLOW GENERATOR

## 50%

รองรับ:

```text
if
else
for
while
break
continue
```

ตัวอย่าง:

```tsl
if x > 10:
    print(x)
```

→

```js
if (x > 10) {
    console.log(x);
}
```

For:

```tsl
for i in range(10):
    print(i)
```

→

```js
for (let i of range(10)) {
    console.log(i);
}
```

### Done

```text
[ ] if
[ ] else
[ ] for
[ ] while
[ ] break
[ ] continue
[ ] tests
```

---

# PHASE 9 — FUNCTION GENERATOR

## 55%

รองรับ:

```tsl
function add(a, b):
    return a + b
```

→

```js
function add(a, b) {
    return a + b;
}
```

ต้องรองรับ:

```text
parameters
arguments
return
local variables
nested calls
```

Recursion ใช้ JavaScript behavior โดยตรง

### Done

```text
[ ] function declaration
[ ] parameters
[ ] calls
[ ] return
[ ] local scope
[ ] recursion
[ ] tests
```

---

# PHASE 10 — VARIABLE SEMANTICS

## 60%

กำหนดและทดสอบ:

```text
declaration
assignment
reassignment
function scope
block scope
```

### Initial Strategy

ใช้ JavaScript semantics ให้มากที่สุด

ไม่สร้าง custom variable runtime

ไม่สร้าง environment VM

ไม่สร้าง symbol runtime ที่ซับซ้อน

### Done

```text
[ ] scope rules documented
[ ] generated JS matches rules
[ ] variable tests pass
```

---

# PHASE 11 — DATA TYPES

## 65%

รองรับเพียง:

```text
number
string
boolean
null
array
object
function
```

ไม่มี static typing

ไม่มี generic

ไม่มี class

### Done

```text
[ ] literals
[ ] arrays
[ ] objects
[ ] function values
[ ] tests
```

---

# PHASE 12 — RUNTIME

## 70%

Runtime ต้องเล็กที่สุด

ตัวอย่าง:

```js
function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}

function print(value) {
    console.log(value);
}
```

Runtime มีเฉพาะสิ่งที่ JavaScript ไม่มีและ TSL จำเป็นต้องมี

### Runtime Rules

ห้ามนำ:

```text
framework
engine
npm package
complex abstraction
```

เข้ามาโดยไม่จำเป็น

### Done

```text
[ ] print
[ ] range
[ ] required helpers only
[ ] runtime tests
```

---

# PHASE 13 — MATH

## 72%

รองรับ operator:

```text
+
-
*
/
%
<
<=
>
>=
==
!=
and
or
not
```

Grouping:

```tsl
x = (10 + 20) * 2
```

### สำคัญ

ถ้า operator map ไป JavaScript ได้ตรง:

```text
TSL → JavaScript operator
```

ไม่ต้องสร้าง math runtime เพิ่ม

### Done

```text
[ ] precedence
[ ] arithmetic
[ ] comparison
[ ] logical
[ ] grouping
[ ] tests
```

---

# PHASE 14 — ENGINE API

## 78%

เริ่มจาก API น้อยที่สุด:

```text
clear()
draw_rect()
draw_circle()
draw_line()
```

Compiler ไม่ implement graphics

Generator เพียง generate call

```tsl
draw_rect(100, 100, 50, 50)
```

→

```js
draw_rect(100, 100, 50, 50);
```

### Engine implementation

อยู่ใน runtime/engine layer

Compiler ไม่ควรรู้ graphics implementation

### Done

```text
[ ] API definitions
[ ] JS calls generated
[ ] engine implementation
[ ] basic rendering test
```

---

# PHASE 15 — RENDER LOOP

## 82%

เพิ่ม execution model แบบง่าย

ตัวอย่าง:

```tsl
function update():
    x = x + 1

function draw():
    clear()
    draw_rect(x, 100, 50, 50)
```

Runtime เป็นผู้เรียก:

```text
update()
draw()
```

ตาม frame loop

### ห้าม

```text
ECS
scene graph
event framework
scheduler
complex game loop abstraction
```

### Done

```text
[ ] update works
[ ] draw works
[ ] frame loop works
[ ] browser example works
```

---

# PHASE 16 — ERROR SYSTEM

## 85%

Error ต้องมี:

```text
type
filename
line
column
source line
message
```

ตัวอย่าง:

```text
TSL Parser Error

game.tsl:12:8

draw_rect(x y 100 100)
            ^

Expected ','
```

ประเภท:

```text
Lexer Error
Parser Error
Semantic Error
Generator Error
Runtime Error
```

### Error Rules

ข้อความต้อง:

```text
specific
short
actionable
```

ห้าม:

```text
generic "Something went wrong"
```

### Done

```text
[ ] line
[ ] column
[ ] source context
[ ] clear message
[ ] all major error types
```

---

# PHASE 17 — CLI

## 88%

รองรับ:

```bash
tsl game.tsl
```

```bash
tsl build game.tsl
```

```bash
tsl build game.tsl -o game.js
```

```bash
tsl check game.tsl
```

```bash
tsl --version
```

### CLI Constraints

CLI ต้อง:

```text
small
predictable
Unix-friendly
```

ไม่ต้องสร้าง interactive shell

### Done

```text
[ ] build
[ ] check
[ ] output
[ ] version
[ ] exit codes
[ ] CLI tests
```

---

# PHASE 18 — INTEGRATION

## 92%

ทดสอบ:

```text
.tsl
 ↓
Lexer
 ↓
Parser
 ↓
AST
 ↓
Validator
 ↓
Generator
 ↓
.js
 ↓
Node / Browser
```

สร้าง examples:

```text
hello.tsl
variables.tsl
math.tsl
if.tsl
loops.tsl
functions.tsl
arrays.tsl
objects.tsl
graphics.tsl
game.tsl
```

### Done

```text
[ ] all examples compile
[ ] all examples run
[ ] generated JS valid
[ ] integration tests pass
```

---

# PHASE 19 — SPECIFICATION LOCK

## 95%

หยุดเพิ่ม language feature

ตรวจ:

```text
tokens
grammar
AST
semantics
operators
scope
functions
control flow
runtime
engine API
CLI
errors
```

สร้าง:

```text
SPEC.md
```

### API Lock

หลังจากนี้:

```text
NO NEW LANGUAGE FEATURES
NO NEW ENGINE API
NO NEW RUNTIME API
```

ยกเว้น bug fix ที่ไม่เปลี่ยน specification

### Done

```text
[ ] SPEC complete
[ ] implementation matches SPEC
[ ] API frozen
[ ] syntax frozen
```

---

# PHASE 20 — TEST & RELEASE CANDIDATE

## 97%

ต้องผ่าน:

```text
[ ] clean install
[ ] clean build
[ ] lexer tests
[ ] parser tests
[ ] validator tests
[ ] generator tests
[ ] runtime tests
[ ] integration tests
[ ] examples
[ ] CLI tests
[ ] error tests
```

### Regression Rule

ทุก bug ที่พบก่อน release:

```text
reproduce
→ fix
→ add test
→ rerun suite
```

ห้ามแก้ bug โดยไม่เพิ่ม regression test เมื่อเหมาะสม

---

# PHASE 21 — DOCUMENTATION

## 99%

Documentation ต้องถูกสร้าง **จาก implementation จริง**

โครงสร้าง:

```text
docs/
├── README.md
├── getting-started.md
├── syntax.md
├── language.md
├── variables.md
├── data-types.md
├── operators.md
├── control-flow.md
├── functions.md
├── arrays.md
├── objects.md
├── runtime.md
├── engine-api.md
├── graphics.md
├── render-loop.md
├── cli.md
├── errors.md
├── compiler.md
├── architecture.md
├── specification.md
└── examples.md
```

## Documentation Rules

ทุกตัวอย่างใน documentation ต้อง:

```text
compile
run
match current implementation
```

ห้ามเขียน:

```text
future feature
planned feature
imaginary API
```

## Documentation Checklist

```text
[ ] installation
[ ] getting started
[ ] language syntax
[ ] variables
[ ] data types
[ ] operators
[ ] control flow
[ ] functions
[ ] arrays
[ ] objects
[ ] runtime
[ ] engine API
[ ] graphics
[ ] render loop
[ ] CLI
[ ] errors
[ ] compiler architecture
[ ] project architecture
[ ] specification
[ ] examples
```

---

# PHASE 22 — SYSTEX v1.0

## 100%

TSL v1.0 สำเร็จเมื่อ:

## Language

```text
[✓] .tsl
[✓] indentation
[✓] variables
[✓] numbers
[✓] strings
[✓] boolean
[✓] null
[✓] arithmetic
[✓] comparison
[✓] logical operators
[✓] if
[✓] else
[✓] for
[✓] while
[✓] function
[✓] return
[✓] break
[✓] continue
[✓] function call
[✓] arrays
[✓] basic objects
```

## Compiler

```text
[✓] Lexer
[✓] Parser
[✓] AST
[✓] Validator
[✓] JavaScript Generator
[✓] deterministic output
```

## Runtime

```text
[✓] print
[✓] range
[✓] required helpers
```

## Engine

```text
[✓] clear
[✓] draw_rect
[✓] draw_circle
[✓] draw_line
[✓] render loop
```

## CLI

```text
[✓] build
[✓] check
[✓] -o
[✓] --version
[✓] correct exit codes
```

## Verification

```text
[✓] unit tests
[✓] integration tests
[✓] regression tests
[✓] examples
[✓] clean install
[✓] clean build
```

## Documentation

```text
[✓] language reference
[✓] syntax reference
[✓] API reference
[✓] CLI reference
[✓] error reference
[✓] compiler architecture
[✓] runtime documentation
[✓] engine documentation
[✓] examples
[✓] SPEC.md
```

---

# 5. FINAL ARCHITECTURE

```text
TSL
│
├── Source
│
├── Language
│   ├── Lexer
│   ├── Parser
│   ├── AST
│   └── Validator
│
├── Compiler
│   └── JavaScript Generator
│
├── Runtime
│   ├── Utilities
│   ├── Math
│   └── Engine API
│
├── Engine
│   └── Renderer
│
├── CLI
│
├── Tests
│
└── Documentation
```

---

# 6. AI EXECUTION PROTOCOL

AI ต้องทำงานตามลำดับนี้ในทุก task:

```text
1. Inspect
2. Identify relevant files
3. Read existing implementation
4. Read tests
5. Determine constraints
6. Make a small plan
7. Implement minimum change
8. Run targeted tests
9. Run related tests
10. Review diff
11. Remove unnecessary changes
12. Report result
```

---

# 7. STOP CONDITIONS

AI ต้อง STOP ทันทีเมื่อ:

```text
[ ] current phase complete
[ ] tests pass
[ ] no unresolved implementation issue
```

ห้าม:

```text
continue to next phase
add unrelated feature
refactor unrelated code
change architecture
```

---

# 8. FAILURE PROTOCOL

ถ้า command/test/build fail:

```text
FAIL
 ↓
Inspect error
 ↓
Identify root cause
 ↓
Make smallest fix
 ↓
Run failed test again
 ↓
Run related tests
```

ห้ามแก้แบบสุ่ม

ห้ามปิด test เพื่อให้ผ่าน

ห้ามลบ functionality เพื่อหลบ error

---

# 9. DIFF DISCIPLINE

ทุก task ต้องตรวจ diff

ถาม:

```text
Does every changed line belong to this task?
```

ถ้าไม่:

```text
REMOVE IT
```

เป้าหมายคือ:

```text
small diff
clear purpose
easy review
```

---

# 10. DEFINITION OF DONE

Task หนึ่งถือว่าเสร็จเมื่อ:

```text
[ ] requested behavior implemented
[ ] specification respected
[ ] no extra feature
[ ] tests added/updated when needed
[ ] tests pass
[ ] existing tests still pass
[ ] error behavior correct
[ ] diff reviewed
```

---

# 11. CORE PHILOSOPHY

TSL ไม่พยายามเป็น:

```text
Python replacement
JavaScript replacement
general-purpose mega language
```

TSL คือ:

```text
small language
+
simple syntax
+
small compiler
+
JavaScript backend
+
small runtime
+
basic graphics
```

ดังนั้น:

> **เมื่อไม่แน่ใจ ให้เลือก implementation ที่เล็กกว่า ตรงกว่า และง่ายต่อการตรวจสอบ**

---

# 12. FINAL SUCCESS CRITERIA

TSL 100% หมายถึง:

```text
TSL Source
      ↓
Lexer
      ↓
Parser
      ↓
AST
      ↓
Validator
      ↓
Generator
      ↓
JavaScript
      ↓
Runtime
      ↓
Engine
```

และมี:

```text
Tests
CLI
Specification
Documentation
Examples
```

พร้อมใช้งานจริง

**100% ไม่ได้หมายถึง feature เยอะที่สุด**

**100% หมายถึง scope ที่กำหนดไว้ถูก implement ครบ ทดสอบครบ และ documented ครบ**