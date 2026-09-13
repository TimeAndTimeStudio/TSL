# ไพล์ไลน์คอมไพเลอร์ TSL

คอมไพเลอร์ TSL แปล TSL source code เป็น JavaScript ผ่าน 4 ขั้นตอนหลัก

## ภาพรวมไพล์ไลน์

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

## ขั้นตอนที่ 1: Lexer

### คำอธิบาย

Lexer อ่าน TSL source code และแปลงเป็น sequence ของ tokens

### Input/Output

- **Input:** `string` (source code)
- **Output:** `Token[]` (array of tokens)

### Token Types

| Token | Symbol | ตัวอย่าง |
|-------|--------|----------|
| Identifier | `IDENTIFIER` | `x`, `player` |
| Number | `NUMBER` | `10`, `3.14` |
| String | `STRING` | `"hello"`, `'world'` |
| Keyword | `KEYWORD` | `if`, `for`, `function` |
| Operator | `OPERATOR` | `+`, `-`, `*`, `/` |
| Comparison | `COMPARISON` | `<`, `>`, `==`, `!=` |
| Assignment | `ASSIGN` | `=` |
| Colon | `COLON` | `:` |
| Comma | `COMMA` | `,` |
| Dot | `DOT` | `.` |
| Parenthesis | `LPAREN` / `RPAREN` | `(`, `)` |
| Bracket | `LBRACKET` / `RBRACKET` | `[`, `]` |
| Brace | `LBRACE` / `RBRACE` | `{`, `}` |
| Newline | `NEWLINE` | `\n` |
| Indent | `INDENT` | spaces |
| Dedent | `DEDENT` | less indent |
| EOF | `EOF` | end of file |

### การจัดการ Whitespace

- Whitespace (spaces, tabs) ถูกเพิกเฉยยกเว้นสำหรับ indentation
- Indentation ถูกแปลงเป็น `INDENT` และ `DEDENT` tokens
- Indentation ที่ไม่สม่ำเสมอทำให้เกิด lexer error

### ตัวอย่าง

```tsl
x = 10 + 5
```

Tokens:

```
IDENTIFIER(x) ASSIGN(=) NUMBER(10) OPERATOR(+) NUMBER(5) NEWLINE
```

### ข้อผิดพลาดที่พบบ่อย

| ข้อผิดพลาด | คำอธิบาย |
|-----------|-------------|
| Invalid character | ตัวอักษรที่ไม่ถูกต้อง |
| Unterminated string | สตริงที่ไม่มี closing quote |
| Invalid number | ตัวเลขที่มีรูปแบบไม่ถูกต้อง |

---

## ขั้นตอนที่ 2: Parser

### คำอธิบาย

Parser รับ tokens จาก Lexer และสร้าง Abstract Syntax Tree (AST)

### Input/Output

- **Input:** `Token[]` (tokens จาก Lexer)
- **Output:** `Program` (AST root node)

### AST Node Types

| Node | คำอธิบาย |
|------|----------|
| `Program` | Root node ของโปรแกรม |
| `VariableDeclaration` | ตัวแปร declaration |
| `Assignment` | Assignment statement |
| `FunctionDeclaration` | Function declaration |
| `ReturnStatement` | Return statement |
| `IfStatement` | If/else statement |
| `ForStatement` | For loop |
| `WhileStatement` | While loop |
| `BreakStatement` | Break statement |
| `ContinueStatement` | Continue statement |
| `Pass` | No-op statement |
| `NumberLiteral` | Number literal |
| `StringLiteral` | String literal |
| `BooleanLiteral` | Boolean literal |
| `NullLiteral` | Null literal |
| `ArrayExpression` | Array literal |
| `ObjectExpression` | Object literal |
| `ArrayAccess` | Array index access |
| `MemberAccess` | Object property access |
| `CallExpression` | Function call |
| `BinaryExpression` | Binary operation |
| `UnaryExpression` | Unary operation |
| `Identifier` | Variable reference |

### การ parse Expressions

Parser ใช้ **operator precedence climbing** สำหรับ expression parsing:

```
or → and → ==, != → <, <=, >, >= → +, - → *, / → not → ()
```

### ตัวอย่าง

```tsl
x = 10 + 5
```

AST:

```
Assignment {
    left: Identifier(x),
    right: BinaryExpression {
        operator: +,
        left: NumberLiteral(10),
        right: NumberLiteral(5)
    }
}
```

### ข้อผิดพลาดที่พบบ่อย

| ข้อผิดพลาด | คำอธิบาย |
|-----------|-------------|
| Unexpected token | Token ที่ไม่คาดไว้ |
| Missing colon | ขาด `:` หลัง condition |
| Invalid expression | Expression ที่ไม่ถูกต้อง |

---

## ขั้นตอนที่ 3: Validator

### คำอธิบาย

Validator ตรวจสอบ semantic errors ใน AST

### Semantic Checks

| Check | คำอธิบาย |
|-------|----------|
| `return` outside function | `return` ต้องอยู่ใน function |
| `break` outside loop | `break` ต้องอยู่ใน loop |
| `continue` outside loop | `continue` ต้องอยู่ใน loop |

### การใช้งาน

Validator ใช้อินเตอร์เฟซเดียวกันกับ Generator

```js
const validator = new Validator();
const errors = validator.validate(ast);
```

### ข้อผิดพลาด

| ข้อผิดพลาด | คำอธิบาย |
|-----------|----------|
| Return outside function | `return` statement นอก function |
| Break outside loop | `break` statement นอก loop |
| Continue outside loop | `continue` statement นอก loop |

---

## ขั้นตอนที่ 4: Generator

### คำอธิบาย

Generator แปล AST เป็น JavaScript source code

### Input/Output

- **Input:** `Program` (AST root node)
- **Output:** `string` (JavaScript code)

### JavaScript Generation Rules

| TSL | JavaScript |
|-----|------------|
| `x = 10` | `let x = 10;` |
| `x = 20` (after declaration) | `x = 20;` |
| `if condition:` | `if (condition) {` |
| `else:` | `} else {` |
| `for x in items:` | `for (let x of items) {` |
| `while condition:` | `while (condition) {` |
| `function name():` | `function name() {` |
| `return value` | `return value;` |
| `break` | `break;` |
| `continue` | `continue;` |
| `pass` | `// pass` |
| `print(value)` | `console.log(value);` |

### Scope Management

Generator ติดตาม variable declarations โดยใช้ scope stack:

```js
let scopeStack = [new Set()];
let indent = 0;
```

- `declareVar(name)` — เพิ่มชื่อตัวแปรใน current scope
- `isDeclared(name)` — ตรวจสอบว่าตัวแปรถูกประกาศแล้วหรือไม่
- `pushScope()` — สร้าง new scope
- `popScope()` — ลบ current scope

### ตัวอย่าง

```tsl
x = 10
if x > 5:
    print("big")
```

Generate:

```js
let x = 10;
if ((x > 5)) {
  console.log("big");
}
```

### ข้อผิดพลาดที่พบบ่อย

| ข้อผิดพลาด | คำอธิบาย |
|-----------|----------|
| Unknown node type | AST node type ที่ไม่รู้จัก |

---

## ข้อผิดพลาดในคอมไพเลอร์

คอมไพเลอร์ผลิตข้อผิดพลาดที่มีข้อมูล:

- `filename` — ไฟล์ที่ error เกิดขึ้น
- `line` — บรรทัดที่เกิด error
- `column` — คอลัมน์ที่เกิด error
- `sourceLine` — source line ที่ error เกิดขึ้น
- `message` — ข้อความ error

### ข้อผิดพลาดที่พบบ่อย

| ขั้นตอน | ชนิด error |
|---------|-----------|
| Lexer | Invalid character, unterminated string |
| Parser | Unexpected token, missing colon |
| Validator | Return outside function, break outside loop |
| Generator | Unknown node type |

---

## การเรียกใช้งาน

### CLI

```bash
node src/cli.js input.tsl
```

### API

```js
const { Lexer, Parser, Validator, Generator } = require('./src/compiler');

const source = 'x = 10';
const tokens = new Lexer(source).tokenize();
const ast = new Parser(tokens).parse();
const errors = new Validator().validate(ast);
const js = new Generator().generate(ast);
```

---

## อ้างอิง

- **Parser:** `src/parser.js`
- **Validator:** `src/validator.js`
- **Generator:** `src/generator.js`
- **AST:** `src/ast.js`
- **Lexer:** `src/lexer.js`
- **CLI:** `src/cli.js`
