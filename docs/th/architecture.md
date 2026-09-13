# สถาปัตยกรรม TSL

สถาปัตยกรรมของ TSL compiler และ runtime

## ภาพรวม

TSL compiler เป็น **transpiler** ที่แปลง TSL source code เป็น JavaScript code

```
TSL Source
    ↓
Lexer  →  Tokens
    ↓
Parser  →  AST
    ↓
Validator  →  (semantic checks)
    ↓
Generator  →  JavaScript
```

---

## Components

### Lexer

**ไฟล์:** `src/lexer.js`

**หน้าที่:** แปลง TSL source code เป็น sequence ของ tokens

**วิธีการทำงาน:**

1. อ่าน source code character โดย character
2. จัดการ whitespace และ indentation
3. จัดการ string literals และ escape sequences
4. จัดการ number literals
5. จัดการ keywords และ identifiers
6. จัดการ operators และ delimiters
7. ผลิต tokens พร้อม location information

**Token Types:**

```js
{
    type: 'IDENTIFIER',
    value: 'x',
    line: 1,
    column: 1
}
```

### Parser

**ไฟล์:** `src/parser.js`

**หน้าที่:** แปลง tokens เป็น Abstract Syntax Tree (AST)

**วิธีการทำงาน:**

1. รับ tokens จาก Lexer
2. Parse statements และ expressions
3. สร้าง AST nodes พร้อม location information
4. จัดการ operator precedence สำหรับ expressions
5. จัดการ block structure ผ่าน indentation

**AST Node Types:**

```js
{
    type: 'Assignment',
    left: { type: 'Identifier', name: 'x' },
    right: { type: 'NumberLiteral', value: 10 },
    location: { line: 1, column: 1, endLine: 1, endColumn: 6 }
}
```

### Validator

**ไฟล์:** `src/validator.js`

**หน้าที่:** ตรวจสอบ semantic errors ใน AST

**วิธีการทำงาน:**

1. ใช้อินเตอร์เฟซเดียวกันกับ Generator
2. ตรวจสอบ `return` outside function
3. ตรวจสอบ `break`/`continue` outside loop
4. ผลิต semantic errors พร้อม location information

### Generator

**ไฟล์:** `src/generator.js`

**หน้าที่:** แปลง AST เป็น JavaScript source code

**วิธีการทำงาน:**

1. ใช้อินเตอร์เฟซเดียวกันกับ Validator
2. ผลิต JavaScript code พร้อม indentation
3. จัดการ variable scoping
4. จัดการ expression generation

**JavaScript Output:**

```js
let x = 10;
if ((x > 5)) {
  console.log("big");
}
```

---

## AST (Abstract Syntax Tree)

**ไฟล์:** `src/ast.js`

AST เป็น tree representation ของ source code

### Node Types

#### Statements

| Type | Properties |
|------|-----------|
| `Program` | `body: Statement[]` |
| `VariableDeclaration` | `name: string, value: Expression` |
| `Assignment` | `left: Expression, right: Expression` |
| `FunctionDeclaration` | `name: string, params: Identifier[], body: Statement[]` |
| `ReturnStatement` | `value: Expression` |
| `IfStatement` | `condition: Expression, consequent: Statement[], alternate: Statement[]` |
| `ForStatement` | `variable: Identifier, iterable: Expression, body: Statement[]` |
| `WhileStatement` | `condition: Expression, body: Statement[]` |
| `BreakStatement` | (none) |
| `ContinueStatement` | (none) |
| `Pass` | (none) |

#### Expressions

| Type | Properties |
|------|-----------|
| `NumberLiteral` | `value: number` |
| `StringLiteral` | `value: string` |
| `BooleanLiteral` | `value: boolean` |
| `NullLiteral` | (none) |
| `Identifier` | `name: string` |
| `BinaryExpression` | `operator: string, left: Expression, right: Expression` |
| `UnaryExpression` | `operator: string, argument: Expression` |
| `ArrayExpression` | `elements: Expression[]` |
| `ObjectExpression` | `properties: Array<{key: Identifier, value: Expression}>` |
| `ArrayAccess` | `array: Expression, index: Expression` |
| `MemberAccess` | `object: Expression, property: Identifier` |
| `CallExpression` | `callee: Identifier, args: Expression[]` |

---

## Scope Management

Generator ติดตาม variable declarations โดยใช้ scope stack:

```js
let scopeStack = [new Set()];
let indent = 0;
```

### Methods

| Method | คำอธิบาย |
|--------|----------|
| `reset()` | Initializes `scopeStack = [new Set()]` |
| `pushScope()` | Creates new scope set, increments indent |
| `popScope()` | Removes current scope set, decrements indent |
| `declareVar(name)` | Adds name to current scope set |
| `isDeclared(name)` | Checks all scopes from inner to outer |

### Assignment Logic

```
if left is MemberExpression:
    emit "left = right;"
else if left is ArrayAccess:
    emit "left = right;"
else if isDeclared(left.name):
    emit "left = right;"
else:
    declareVar(left.name)
    emit "let left = right;"
```

---

## Error Handling

Error objects มีโครงสร้าง:

```js
{
    filename: string,
    line: number,
    column: number,
    sourceLine: string,
    message: string
}
```

### Error Types

| Type | Description |
|------|-------------|
| `LexerError` | Invalid character, unterminated string |
| `ParserError` | Unexpected token, missing colon |
| `SemanticError` | Return outside function, break/continue outside loop |
| `GeneratorError` | Unknown AST node type |

---

## CLI Interface

**ไฟล์:** `src/cli.js`

### Commands

| Command | คำอธิบาย |
|---------|----------|
| `node src/cli.js <file.tsl>` | Compile และแสดง JavaScript |
| `node src/cli.js <file.tsl> -o <output.js>` | Compile และเขียนไฟล์ |
| `node src/cli.js build <file.tsl>` | Build และแสดง JavaScript |
| `node src/cli.js build <file.tsl> -o <output.js>` | Build และเขียนไฟล์ |
| `node src/cli.js check <file.tsl>` | Validate syntax |
| `node src/cli.js --version` | แสดงเวอร์ชัน |

---

## Runtime

TSL runtime คือ JavaScript runtime ที่ execute generated JavaScript code

### Built-in Functions

| Function | JavaScript |
|----------|------------|
| `print(value)` | `console.log(value)` |
| `range(n)` | Array of numbers from 0 to n-1 |

### Built-in Objects

TSL ไม่มี built-in objects ใน v1.0

---

## Architecture Principles

1. **Transpiler, not interpreter** — TSL แปลงเป็น JavaScript แล้วรันบน JS runtime
2. **Lexical scoping** — Variable scopes determined by source structure
3. **Dynamic typing** — No static type checking
4. **Simple AST** — Flat, straightforward node types
5. **Deterministic output** — Same source always produces same JavaScript
6. **Error reporting** — All errors include filename, line, column, source line

---

## ไฟล์ในโปรเจกต์

```
src/
    cli.js          # Command-line interface
    compiler.js     # Compiler orchestration
    lexer.js        # Tokenizer
    parser.js       # Parser
    validator.js    # Semantic validation
    generator.js    # Code generation
    ast.js          # AST node definitions
```

```
examples/
    hello.tsl       # Hello World
    functions.tsl   # Function examples
    arrays.tsl      # Array examples
    objects.tsl     # Object examples
    if.tsl          # If/else examples
    for.tsl         # For loop examples
    while.tsl       # While loop examples
    strings.tsl     # String examples
```

---

## อ้างอิง

- **Source:** `src/` directory
- **Examples:** `examples/` directory
- **SPEC:** [SPEC.md](../SPEC.md)
