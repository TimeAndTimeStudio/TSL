# ชนิดข้อมูล TSL

## ภาพรวม

TSL ไม่มี static type system Types ตาม JavaScript semantics

ตัวแปร TSL เป็น dynamically typed — type ถูกกำหนดตอน runtime โดย JavaScript engine

---

## Number

จำนวนเต็มและทศนิยม

```tsl
x = 10
pi = 3.14
```

Generate:

```js
let x = 10;
let pi = 3.14;
```

ตัวเลขทั้งหมดใช้ JavaScript `Number` (IEEE 754 double precision)

### Literal Syntax

```tsl
42
0
-3
3.14
0.5
```

Lexer รับค่า:

- จำนวนเต็มฐานสิบ: `10`, `42`, `0`
- ทศนิยมฐานสิบ: `3.14`, `0.5`

Scientific notation ไม่รองรับใน v1.0

---

## String

ข้อความที่ล้อมด้วยเครื่องหมายคำพูดคู่หรือเดี่ยว

```tsl
name = "hello"
greeting = 'world'
```

Generate:

```js
let name = "hello";
let greeting = "world";
```

### Escape Sequences

| Escape | ความหมาย |
|--------|---------|
| `\\n`  | newline |
| `\\t`  | tab |
| `\\\\` | backslash |
| `\\"`  | double quote |
| `\\'`  | single quote |

ตัวอย่าง:

```tsl
msg = "line1\nline2"
path = 'C:\\Users\\name'
quote = "she said \"hi\""
```

Generate:

```js
let msg = "line1\nline2";
let path = "C:\\Users\\name";
let quote = "she said \"hi\"";
```

Generator ใช้ `JSON.stringify()` เพื่อสร้าง JavaScript string literals ที่ถูกต้อง

---

## Boolean

ค่าตรรกะ true/false

```tsl
flag = true
disabled = false
```

Generate:

```js
let flag = true;
let disabled = false;
```

Keywords: `true`, `false`

ใช้ในเงื่อนไข:

```tsl
if flag:
    print("enabled")
```

---

## Null

แทนค่าที่ขาดหายหรือไม่กำหนด

```tsl
value = null
```

Generate:

```js
let value = null;
```

Keyword: `null`

---

## Arrays

ordered collections ของค่า

```tsl
items = [10, 20, 30]
names = ["a", "b", "c"]
```

Generate:

```js
let items = [10, 20, 30];
let names = ["a", "b", "c"];
```

### Indexing

```tsl
first = items[0]
```

Generate:

```js
let first = items[0];
```

### Assignment to Index

```tsl
items[0] = 99
```

Generate:

```js
items[0] = 99;
```

---

## Objects

key-value collections

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

Keys ต้องเป็น identifiers Values เป็น expression ใดก็ได้

### Member Access

```tsl
px = player.x
```

Generate:

```js
let px = player.x;
```

### Assignment to Member

```tsl
player.x = 300
```

Generate:

```js
player.x = 300;
```

---

## สรุปชนิดข้อมูล

| Type   | TSL Literal    | JavaScript Output |
|--------|----------------|-------------------|
| Number | `10`, `3.14`   | `10`, `3.14`      |
| String | `"hi"`, `'hi'` | `"hi"`, `'hi'`    |
| Boolean | `true`, `false` | `true`, `false`  |
| Null   | `null`         | `null`            |
| Array  | `[1, 2]`       | `[1, 2]`          |
| Object | `{x: 1}`       | `{ x: 1 }`        |

---

## ไม่มีการประกาศ Type

TSL ไม่ต้องการหรือไม่รองรับการประกาศ type

```tsl
# Correct - no type needed
x = 10
x = "hello"
```

JavaScript engine จัดการ typing ทั้งหมดตอน runtime

---

## หมายเหตุการใช้งาน

### Lexer

- Numbers: parsed โดย `readNumber()` ใน `src/lexer.js`
- Strings: parsed โดย `readString()` ใน `src/lexer.js` รองรับ escape sequences
- Booleans: `true`/`false` ถูก recognized เป็น keywords
- Null: `null` ถูก recognized เป็น keyword

### AST

| Type      | AST Node         |
|-----------|------------------|
| Number    | `NumberLiteral`  |
| String    | `StringLiteral`  |
| Boolean   | `BooleanLiteral` |
| Null      | `NullLiteral`    |
| Array     | `ArrayExpression`|
| Object    | `ObjectExpression`|

### Generator

- Numbers: `String(node.value)`
- Strings: `JSON.stringify(node.value)`
- Booleans: `node.value ? 'true' : 'false'`
- Null: `'null'`
- Arrays: `'[${elements.join(', ')}]'`
- Objects: `'{ ${props.join(', ')} }'`
