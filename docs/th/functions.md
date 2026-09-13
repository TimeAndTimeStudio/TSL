# ฟังก์ชัน TSL

ฟังก์ชันใน TSL ถูกประกาศด้วย `function` keyword รับ parameters และ return ค่า

## ภาพรวม

| Feature | Supported |
|---------|-----------|
| Declaration | ✅ |
| Parameters | ✅ |
| Return value | ✅ |
| No return | ✅ |
| Nested functions | ✅ |
| Default parameters | ❌ |
| Variadic parameters | ❌ |
| Closures | ✅ |
| Recursion | ✅ |
| Arrow functions | ❌ |

---

## การประกาศ

### Syntax

```tsl
function name(parameters):
    statements
```

### คำอธิบาย

- `function` keyword ตามด้วย identifier
- Parameters อยู่ใน `()` คั่นด้วย `,`
- `:` จบ signature
- Body เป็น indented block

### AST Node

```js
FunctionDeclaration {
    name: Identifier,
    params: Identifier[],
    body: Statement[],
    location: Location
}
```

### JavaScript ที่ Generate

```js
function name(parameters) {
    // body
}
```

### ตัวอย่าง

```tsl
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

Generate:

```js
function add(a, b) {
  return (a + b);
}
let result = add(10, 20);
console.log(result);
```

---

## Parameters

### การประกาศ

Parameters ถูกประกาศอัตโนมัติใน function scope:

```tsl
function greet(name, greeting):
    print(greeting + ", " + name)
```

Generate:

```js
function greet(name, greeting) {
  console.log((greeting + ", ") + name);
}
```

### การใช้งาน

- Parameters เป็น identifiers ที่แยกด้วย `,`
- ไม่รองรับ default parameters
- ไม่รองรับ variadic parameters (`...args`)
- Parameters ถูกประกาศด้วย `let` โดย JavaScript runtime

### Parameter Assignment

```tsl
function modify(x):
    x = x + 1
    return x
```

Generate:

```js
function modify(x) {
  x = (x + 1);
  return x;
}
```

---

## Return

### Syntax

```tsl
return expression
```

### คำอธิบาย

`return` statement ส่งกลับค่าจากฟังก์ชันและหยุด execution

### AST Node

```js
ReturnStatement {
    value: Expression,
    location: Location
}
```

### JavaScript ที่ Generate

```js
return expression;
```

### ตัวอย่าง

```tsl
function square(n):
    return n * n
```

Generate:

```js
function square(n) {
  return (n * n);
}
```

### Return โดยไม่มีค่า

```tsl
function doNothing():
    return
```

Generate:

```js
function doNothing() {
  return;
}
```

### Return ใน Expression

```tsl
function max(a, b):
    if a > b:
        return a
    else:
        return b
```

Generate:

```js
function max(a, b) {
  if ((a > b)) {
    return a;
  } else {
    return b;
  }
}
```

### หมายเหตุ

- `return` นอกฟังก์ชันเป็น **Semantic Error**
- Return โดยไม่มี expression ส่งกลับ `undefined`

---

## Function Calls

### Syntax

```tsl
name(arguments)
```

### คำอธิบาย

Function calls ใช้ `()` กับ arguments ที่แยกด้วย `,`

### AST Node

```js
CallExpression {
    callee: Identifier,
    args: Expression[],
    location: Location
}
```

### JavaScript ที่ Generate

```js
name(arg1, arg2);
```

### ตัวอย่าง

```tsl
result = add(10, 20)
greet("TSL", "Hello")
```

Generate:

```js
let result = add(10, 20);
greet("TSL", "Hello");
```

---

## Nested Functions

### คำอธิบาย

ฟังก์ชันสามารถประกาศภายในฟังก์ชันอื่นได้

### ตัวอย่าง

```tsl
function outer():
    function inner():
        print("inner")
    inner()
```

Generate:

```js
function outer() {
  function inner() {
    console.log("inner");
  }
  inner();
}
```

---

## Recursion

### คำอธิบาย

ฟังก์ชันสามารถเรียกตัวเองได้

### ตัวอย่าง

```tsl
function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

Generate:

```js
function factorial(n) {
  if ((n <= 1)) {
    return 1;
  }
  return (n * factorial((n - 1)));
}
```

---

## Closures

### คำอธิบาย

ฟังก์ชันสามารถเข้าถึงตัวแปรจาก outer scope ได้

### ตัวอย่าง

```tsl
function makeAdder(x):
    function add(y):
        return x + y
    return add

add5 = makeAdder(5)
result = add5(10)
```

Generate:

```js
function makeAdder(x) {
  function add(y) {
    return (x + y);
  }
  return add;
}
let add5 = makeAdder(5);
let result = add5(10);
```

---

## ตัวอย่างสมบูรณ์

```tsl
# Complete function example
counter = 0

function increment():
    counter = counter + 1
    return counter

function printCount():
    print("count: " + counter)

for i in range(3):
    val = increment()
    print(val)

printCount()
```

Generate:

```js
counter = 0;
function increment() {
  counter = (counter + 1);
  return counter;
}
function printCount() {
  console.log(("count: " + counter));
}
for (let i of range(3)) {
  let val = increment();
  console.log(val);
}
printCount();
```

---

## ตารางสรุป

| TSL | JavaScript |
|-----|------------|
| `function f(a, b): return a + b` | `function f(a, b) { return (a + b); }` |
| `function f(): return` | `function f() { return; }` |
| `f(1, 2)` | `f(1, 2);` |
| `function outer(): function inner(): return 1` | `function outer() { function inner() { return 1; } }` |
| `function make(): function inner(): return x` | `function make() { function inner() { return x; } }` |
| `function fact(n): if n <= 1: return 1; return n * fact(n-1)` | `function fact(n) { if ((n <= 1)) { return 1; } return (n * fact((n - 1))); }` |

---

## อ้างอิง

- **SPEC**: [SPEC.md #18-#23](../SPEC.md)
- **Parser**: `src/parser.js` — `parseFunctionDeclaration()`, `parseReturnStatement()`
- **Generator**: `src/generator.js` — `generateFunctionDeclaration()`, `generateReturnStatement()`
- **AST**: `src/ast.js` — `FunctionDeclaration`, `ReturnStatement`
