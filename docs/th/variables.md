# ตัวแปร TSL

## ภาพรวม

ตัวแปรใน TSL ถูกสร้างเมื่อมีการกำหนดค่าครั้งแรกภายใน scope โดยใช้ `let` ใน JavaScript ที่ generate การกำหนดค่าใหม่ใน scope เดียวหรือ outer scope ไม่ใช้ `let`

```tsl
x = 10      # First assignment: let x = 10;
x = 20      # Reassignment: x = 20;
```

---

## การประกาศ

การกำหนดค่าครั้งแรกของชื่อตัวแปรใน visible scope ใด ๆ จะสร้างตัวแปร Generator จะ emit `let`:

```tsl
x = 10
name = "TSL"
count = 0
```

Generate:

```js
let x = 10;
let name = "TSL";
let count = 0;
```

---

## การกำหนดค่าใหม่

เมื่อตัวแปรถูกประกาศใน visible scope ใด ๆ การกำหนดค่าครั้งถัดไปที่ชื่อเดียวกันจะไม่ใช้ `let`:

```tsl
x = 10
x = 20
```

Generate:

```js
let x = 10;
x = 20;
```

คอมไพเลอร์ติดตามตัวแปรที่ประกาศแล้วต่อ scope โดยใช้ stack ของ sets `isDeclared()` ตรวจสอบจาก innermost ไป outermost scope

---

## กฎ Scope

TSL ใช้ **lexical scope** คอมไพเลอร์รักษา `scopeStack` — array ของ sets โดยแต่ละ set ติดตามชื่อตัวแปรที่ประกาศใน scope นั้น

### Scope Hierarchy

Scopes ถูกสร้างโดย:

- Function declarations
- `if` / `else` blocks
- `while` loops
- `for` loops
- Nested blocks

### กฎ

1. **Inner scope สามารถอ่านตัวแปร outer scope ได้** — `isDeclared()` ตรวจสอบทุก scope จากในออกนอก
2. **Inner scope สามารถกำหนดค่าใหม่ให้ตัวแปร outer scope ได้** — ถ้าชื่อถูกประกาศใน outer scope การกำหนดค่าใน inner จะไม่ใช้ `let`
3. **Inner scope สามารถประกาศตัวแปรใหม่ได้** — การกำหนดค่าครั้งแรกใน inner scope ใช้ `let` และ shadow ชื่อ outer
4. **Outer scope ไม่เห็นตัวแปร inner scope** — ตัวแปรที่ประกาศใน inner scopes ไม่สามารถเข้าถึงได้หลังจาก block สิ้นสุด

### ตัวอย่าง: Function Scope

```tsl
x = 10

function foo():
    y = 1       # let y = 1; (new scope)
    x = 20      # x = 20; (reassign outer)
    y = 2       # y = 2; (same scope, no let)
```

Generate:

```js
let x = 10;
function foo() {
  let y = 1;
  x = 20;
  y = 2;
}
```

### ตัวอย่าง: Block Scope

```tsl
x = 1

if (true):
    x = 2       # x = 2; (reassign outer, no let)
    y = 3       # let y = 3; (new scope)
```

Generate:

```js
let x = 1;
if (true) {
  x = 2;
  let y = 3;
}
```

### ตัวอย่าง: Variable Shadowing

```tsl
if (true):
    y = 10
else:
    y = 20
```

Generate:

```js
if (true) {
  let y = 10;
} else {
  let y = 20;
}
```

แต่ละ branch ประกาศ `y` ของตัวเอง พวกมันไม่ได้ shadow กัน

### ตัวอย่าง: For Loop Variable

```tsl
for i in range(3):
    print(i)
print(i)
```

Generate:

```js
for (let i of range(3)) {
  print(i);
}
print(i);
```

loop variable `i` มี scope ถึง body ของ `for` โดย JavaScript `let` semantics

---

## Member Assignment

การกำหนดค่าให้ object properties ไม่ใช้ `let`:

```tsl
player.x = 100
player.y = 200
```

Generate:

```js
player.x = 100;
player.y = 200;
```

---

## Array Assignment

การกำหนดค่าให้ array indices ไม่ใช้ `let`:

```tsl
arr[0] = 10
arr[1] = 20
```

Generate:

```js
arr[0] = 10;
arr[1] = 20;
```

---

## Function Parameters

Function parameters ถูกประกาศอัตโนมัติใน function scope การกำหนดค่าให้ parameters ไม่ใช้ `let`:

```tsl
function add(a):
    a = a + 1
    return a
```

Generate:

```js
function add(a) {
  a = (a + 1);
  return a;
}
```

---

## รายละเอียดการใช้งาน

Generator ติดตาม scope โดยใช้:

| Function | คำอธิบาย |
|---|---|
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

## ตารางสรุป

| TSL Code | Generated JavaScript |
|---|---|
| `x = 10` | `let x = 10;` |
| `x = 20` (after declaration) | `x = 20;` |
| `name = "TSL"` | `let name = "TSL";` |
| `player.x = 100` | `player.x = 100;` |
| `arr[0] = 10` | `arr[0] = 10;` |
| `function foo(): y = 1` | `function foo() { let y = 1; }` |
| `if (true): x = 1` (outer x) | `if (true) { x = 1; }` |
| `if (true): y = 1` (new) | `if (true) { let y = 1; }` |
