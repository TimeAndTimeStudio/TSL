# อาร์เรย์ TSL

อาร์เรย์ใน TSL เป็น ordered collections ของค่า

## ภาพรวม

| Feature | Supported |
|---------|-----------|
| Array literals | ✅ |
| Index access | ✅ |
| Index assignment | ✅ |
| Nested arrays | ✅ |
| Mixed types | ✅ |
| Array methods | ❌ |
| Array length | ❌ |
| Array iteration (for-of) | ✅ (via `for ... in`) |

---

## Array Literals

### Syntax

```tsl
[expr1, expr2, expr3]
```

### คำอธิบาย

- Elements ถูกคั่นด้วย `,`
- Elements สามารถเป็น expression ใดก็ได้
- Elements สามารถเป็นค่าชนิดต่างกันได้
- Empty arrays ไม่รองรับใน v1.0

### AST Node

```js
ArrayExpression {
    elements: Expression[],
    location: Location
}
```

### JavaScript ที่ Generate

```js
[element1, element2, element3];
```

### ตัวอย่าง

```tsl
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", true, null]
```

Generate:

```js
numbers = [1, 2, 3, 4, 5];
names = ["Alice", "Bob", "Charlie"];
mixed = [1, "hello", true, null];
```

---

## Index Access

### Syntax

```tsl
array[index]
```

### คำอธิบาย

- Index เป็น expression ที่ประเมินเป็น number
- Indexing ใช้ 0-based indexing (เหมือน JavaScript)
- Chained access รองรับ: `arr[0][1]`

### AST Node

```js
ArrayAccess {
    array: Expression,
    index: Expression,
    location: Location
}
```

### JavaScript ที่ Generate

```js
array[index];
```

### ตัวอย่าง

```tsl
numbers = [10, 20, 30]
first = numbers[0]
second = numbers[1]
third = numbers[2]
```

Generate:

```js
numbers = [10, 20, 30];
first = numbers[0];
second = numbers[1];
third = numbers[2];
```

### Nested Access

```tsl
matrix = [[1, 2], [3, 4]]
value = matrix[1][0]    # 3
```

Generate:

```js
matrix = [[1, 2], [3, 4]];
value = matrix[1][0];
```

### Chained Access

```tsl
data = [[1, 2], [3, 4], [5, 6]]
result = data[0][1] + data[2][0]
```

Generate:

```js
data = [[1, 2], [3, 4], [5, 6]];
result = ((data[0][1]) + (data[2][0]));
```

---

## Index Assignment

### Syntax

```tsl
array[index] = value
```

### คำอธิบาย

- Assign ค่าที่ index ที่ระบุ
- Index เป็น expression ที่ประเมินเป็น number
- Indexing ใช้ 0-based indexing

### AST Node

```js
ArrayAssignment {
    array: Expression,
    index: Expression,
    value: Expression,
    location: Location
}
```

### JavaScript ที่ Generate

```js
array[index] = value;
```

### ตัวอย่าง

```tsl
arr = [1, 2, 3]
arr[0] = 10
arr[2] = 30
```

Generate:

```js
arr = [1, 2, 3];
arr[0] = 10;
arr[2] = 30;
```

### Nested Assignment

```tsl
matrix = [[1, 2], [3, 4]]
matrix[0][1] = 99
```

Generate:

```js
matrix = [[1, 2], [3, 4]];
matrix[0][1] = 99;
```

---

## การใช้งานทั่วไป

### Iteration

```tsl
numbers = [1, 2, 3, 4, 5]
for n in numbers:
    print(n)
```

Generate:

```js
numbers = [1, 2, 3, 4, 5];
for (let n of numbers) {
  console.log(n);
}
```

### Accumulator Pattern

```tsl
numbers = [10, 20, 30, 40, 50]
sum = 0
for n in numbers:
    sum = sum + n
```

Generate:

```js
numbers = [10, 20, 30, 40, 50];
sum = 0;
for (let n of numbers) {
  sum = (sum + n);
}
```

### Search Pattern

```tsl
numbers = [1, 5, 3, 9, 2]
target = 9
found = false

for n in numbers:
    if n == target:
        found = true
        break
```

Generate:

```js
numbers = [1, 5, 3, 9, 2];
target = 9;
found = false;
for (let n of numbers) {
  if (n == target) {
    found = true;
    break;
  }
}
```

---

## ตัวอย่างสมบูรณ์

```tsl
# Array operations
scores = [85, 92, 78, 90, 88]
total = 0
count = 0

for s in scores:
    total = total + s
    count = count + 1

if count > 0:
    average = total / count
    print(average)

# Modify array
scores[0] = 95
print(scores[0])
```

Generate:

```js
scores = [85, 92, 78, 90, 88];
total = 0;
count = 0;
for (let s of scores) {
  total = (total + s);
  count = (count + 1);
}
if ((count > 0)) {
  average = (total / count);
  console.log(average);
}
scores[0] = 95;
console.log(scores[0]);
```

---

## ตารางสรุป

| TSL | JavaScript |
|-----|------------|
| `[1, 2, 3]` | `[1, 2, 3]` |
| `arr[0]` | `arr[0]` |
| `arr[0] = 10` | `arr[0] = 10` |
| `matrix[1][0]` | `matrix[1][0]` |
| `matrix[0][1] = 99` | `matrix[0][1] = 99` |
| `for x in arr: print(x)` | `for (let x of arr) { console.log(x); }` |

---

## อ้างอิง

- **SPEC**: [SPEC.md #24-#27](../SPEC.md)
- **Parser**: `src/parser.js` — `parseArrayExpression()`, `parseArrayAccess()`
- **Generator**: `src/generator.js` — `generateArrayExpression()`, `generateArrayAccess()`, `generateArrayAssignment()`
- **AST**: `src/ast.js` — `ArrayExpression`, `ArrayAccess`, `ArrayAssignment`
