# ชนิดข้อผิดพลาด TSL

## ภาพรวม

TSL compiler ผลิตข้อผิดพลาด 4 ชนิดหลัก

| ชนิด | ขั้นตอน | คำอธิบาย |
|------|---------|----------|
| Lexer Error | Lexer | ตัวอักษรที่ไม่ถูกต้องหรือสตริงที่ไม่มีที่สิ้นสุด |
| Parser Error | Parser | tokens ที่ไม่คาดหรือ syntax ที่ขาดหาย |
| Semantic Error | Validator | `return` นอกฟังก์ชัน, `break`/`continue` นอก loop |
| Generator Error | Generator | AST node type ที่ไม่รู้จัก |

---

## ข้อผิดพลาด

### โครงสร้างข้อผิดพลาด

ข้อผิดพลาดทั้งหมดมีโครงสร้าง:

```js
{
    filename: string,
    line: number,
    column: number,
    sourceLine: string,
    message: string
}
```

| Property | คำอธิบาย |
|----------|----------|
| `filename` | ชื่อไฟล์ที่ error เกิดขึ้น |
| `line` | บรรทัดที่เกิด error |
| `column` | คอลัมน์ที่เกิด error |
| `sourceLine` | Source line ที่ error เกิดขึ้น |
| `message` | ข้อความ error |

---

## Lexer Errors

### Invalid Character

**คำอธิบาย:** ตัวอักษรที่ไม่ถูกต้องใน source code

**ตัวอย่าง:**

```tsl
x = 10 @
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Invalid character '!'
  x = 10 @
```

**สาเหตุ:** ตัวอักษร `@` ไม่ถูกต้องใน TSL

**วิธีแก้:** ลบหรือแทนที่ตัวอักษรที่ไม่ถูกต้อง

### Unterminated String

**คำอธิบาย:** สตริงที่ไม่มี closing quote

**ตัวอย่าง:**

```tsl
x = "hello
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Unterminated string
  x = "hello
```

**สาเหตุ:** ขาด closing quote

**วิธีแก้:** เพิ่ม closing quote

### Invalid Number

**คำอธิบาย:** ตัวเลขที่มีรูปแบบไม่ถูกต้อง

**ตัวอย่าง:**

```tsl
x = 12.3.4
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Invalid number format
  x = 12.3.4
```

**สาเหตุ:** ตัวเลขมีจุดทศนิยมมากกว่า 1 จุด

**วิธีแก้:** ใช้ตัวเลขที่ถูกต้อง

---

## Parser Errors

### Unexpected Token

**คำอธิบาย:** Token ที่ไม่คาดไว้ในการ parse

**ตัวอย่าง:**

```tsl
if x > 10
    print("big")
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Expected ':' after condition
  if x > 10
```

**สาเหตุ:** ขาด `:` หลัง condition

**วิธีแก้:** เพิ่ม `:` หลัง condition

### Missing Colon

**คำอธิบาย:** ขาด `:` หลัง block header

**ตัวอย่าง:**

```tsl
if x > 10
    print("big")
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Expected ':' after condition
  if x > 10
```

**วิธีแก้:** เพิ่ม `:` หลัง condition

### Invalid Expression

**คำอธิบาย:** Expression ที่ไม่ถูกต้อง

**ตัวอย่าง:**

```tsl
x = +
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 1: Invalid expression
  x = +
```

**สาเหตุ:** Operator `+` ต้องมี operands

**วิธีแก้:** เพิ่ม operands

---

## Semantic Errors

### Return Outside Function

**คำอธิบาย:** `return` statement อยู่นอก function

**ตัวอย่าง:**

```tsl
x = 10
return x
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 2: 'return' statement outside function
  return x
```

**สาเหตุ:** `return` ต้องอยู่ใน function

**วิธีแก้:** ย้าย `return` เข้าไปใน function

### Break Outside Loop

**คำอธิบาย:** `break` statement อยู่นอก loop

**ตัวอย่าง:**

```tsl
x = 10
break
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 2: 'break' statement outside loop
  break
```

**สาเหตุ:** `break` ต้องอยู่ใน loop

**วิธีแก้:** ย้าย `break` เข้าไปใน loop

### Continue Outside Loop

**คำอธิบาย:** `continue` statement อยู่นอก loop

**ตัวอย่าง:**

```tsl
x = 10
continue
```

**ข้อผิดพลาด:**

```
Error in input.tsl:
  Line 2: 'continue' statement outside loop
  continue
```

**สาเหตุ:** `continue` ต้องอยู่ใน loop

**วิธีแก้:** ย้าย `continue` เข้าไปใน loop

---

## Generator Errors

### Unknown Node Type

**คำอธิบาย:** AST node type ที่ไม่รู้จัก

**ตัวอย่าง:**

ข้อผิดพลาดนี้เกิดขึ้นเมื่อ AST มี node type ที่ generator ไม่รองรับ

**ข้อผิดพลาด:**

```
Error: Unknown AST node type: UnknownNode
```

**สาเหตุ:** AST node type ที่ไม่รู้จัก

**วิธีแก้:** ตรวจสอบ AST node types ใน `src/ast.js`

---

## การจัดการข้อผิดพลาด

### CLI Error Handling

เมื่อเกิดข้อผิดพลาด CLI จะแสดง:

```
Error in <filename>:
  Line <line>: <message>
  <source_line>
```

### API Error Handling

```js
const { Lexer, Parser, Validator, Generator } = require('./src/compiler');

try {
    const tokens = new Lexer(source).tokenize();
    const ast = new Parser(tokens).parse();
    const errors = new Validator().validate(ast);
    const js = new Generator().generate(ast);
} catch (error) {
    console.error('Error:', error.message);
}
```

---

## ตารางสรุปข้อผิดพลาด

| ข้อผิดพลาด | ขั้นตอน | คำอธิบาย |
|-----------|---------|----------|
| Invalid character | Lexer | ตัวอักษรที่ไม่ถูกต้อง |
| Unterminated string | Lexer | สตริงที่ไม่มี closing quote |
| Invalid number | Lexer | ตัวเลขที่มีรูปแบบไม่ถูกต้อง |
| Unexpected token | Parser | Token ที่ไม่คาดไว้ |
| Missing colon | Parser | ขาด `:` หลัง condition |
| Invalid expression | Parser | Expression ที่ไม่ถูกต้อง |
| Return outside function | Validator | `return` statement นอก function |
| Break outside loop | Validator | `break` statement นอก loop |
| Continue outside loop | Validator | `continue` statement นอก loop |
| Unknown node type | Generator | AST node type ที่ไม่รู้จัก |

---

## อ้างอิง

- **Lexer:** `src/lexer.js`
- **Parser:** `src/parser.js`
- **Validator:** `src/validator.js`
- **Generator:** `src/generator.js`
- **CLI:** `src/cli.js`
