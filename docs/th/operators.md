# ตัวดำเนินการ TSL

ตัวดำเนินการใน TSL ถูกแปลเป็น JavaScript equivalents โดยคอมไพเลอร์ ตัวดำเนินการทั้งหมดสร้าง JavaScript expressions ที่ถูกต้อง

## ตัวดำเนินการทางคณิตศาสตร์

| TSL | JavaScript | คำอธิบาย |
|-----|------------|-------------|
| `+` | `+` | Addition |
| `-` | `-` | Subtraction |
| `*` | `*` | Multiplication |
| `/` | `/` | Division |
| `%` | `%` | Modulo (remainder) |

**ตัวอย่าง:**

```tsl
a = 10 + 5      # 15
b = 10 - 5      # 5
c = 10 * 5      # 50
d = 10 / 5      # 2
e = 10 % 3      # 1
```

Division และ modulo กับศูนย์สร้าง JavaScript runtime behavior (`Infinity`, `NaN`, หรือ `RangeError`)

## ตัวดำเนินการเปรียบเทียบ

| TSL | JavaScript | คำอธิบาย |
|-----|------------|-------------|
| `==` | `==` | Equal (loose equality) |
| `!=` | `!=` | Not equal |
| `<` | `<` | Less than |
| `<=` | `<=` | Less than or equal |
| `>` | `>` | Greater than |
| `>=` | `>=` | Greater than or equal |

**ตัวอย่าง:**

```tsl
x == y
x != y
x < y
x <= y
x > y
x >= y
```

TSL ใช้ JavaScript loose equality (`==`) สำหรับตัวดำเนินการ `==`

## ตัวดำเนินการตรรกะ

| TSL | JavaScript | คำอธิบาย |
|-----|------------|-------------|
| `and` | `&&` | Logical AND |
| `or` | `\|\|` | Logical OR |
| `not` | `!` | Logical NOT (unary prefix) |

**ตัวอย่าง:**

```tsl
x and y
x or y
not x
```

### `not` (Unary)

`not` เป็น prefix operator ที่ใช้กับ operand เดียว:

```tsl
if not flag:
    print("disabled")
```

Generate:

```js
if (!flag) {
```

### `and` / `or` (Binary)

`and` และ `or` เป็น infix binary operators พวกมัน generate JavaScript `&&` และ `||` ตามลำดับ ซึ่งเป็น short-circuit operators

```tsl
if x > 10 and y < 20:
    print("valid")
```

Generate:

```js
if ((x > 10) && (y < 20)) {
```

## Assignment

| TSL | JavaScript | คำอธิบาย |
|-----|------------|-------------|
| `=` | `let x = ...` / `x = ...` | Assignment |

การกำหนดค่าครั้งแรกของตัวแปรสร้าง `let` การกำหนดค่าครั้งถัดไปใช้ตัวแปรที่มีอยู่แล้ว

```tsl
x = 10      # generates: let x = 10;
x = 20      # generates: x = 20;
```

## ลำดับความสำคัญของตัวดำเนินการ

ตัวดำเนินการถูกประเมินจากลำดับความสำคัญสูงสุดไปต่ำสุด เครื่องหมายวงเล็บ `()` สามารถ override precedence ได้

| ความสำคัญ | ตัวดำเนินการ | Associativity |
|------------|-----------|---------------|
| 1 (สูงสุด) | `()` | Grouping |
| 2 | `not` | Right-to-left |
| 3 | `*`, `/`, `%` | Left-to-right |
| 4 | `+`, `-` | Left-to-right |
| 5 | `<`, `<=`, `>`, `>=` | Left-to-right |
| 6 | `==`, `!=` | Left-to-right |
| 7 | `and` | Left-to-right |
| 8 (ต่ำสุด) | `or` | Left-to-right |

### ตัวอย่าง Precedence

```tsl
# Multiplication binds tighter than addition
a = 1 + 2 * 3     # equivalent to: 1 + (2 * 3) => 7

# Comparison binds tighter than logical operators
if x > 10 and y < 20:
    print("valid")
# equivalent to: if (x > 10) and (y < 20):

# `not` binds tighter than `and`
result = not x and y
# equivalent to: (!x) && y

# Use parentheses to override precedence
a = (1 + 2) * 3   # 9
```

## JavaScript ที่ Generate

คอมไพเลอร์สร้าง parenthesized binary และ unary expressions สำหรับความสม่ำเสมอ:

| TSL | JavaScript ที่ Generate |
|-----|---------------------|
| `x and y` | `(x && y)` |
| `x or y` | `(x \|\| y)` |
| `not x` | `(!x)` |
| `a + b * c` | `((a + (b * c)))` |

## String Concatenation

TSL ไม่มีตัวดำเนินการ string concatenation โดยเฉพาะ ใช้ตัวดำเนินการ `+` กับ string literals และตัวแปร:

```tsl
name = "world"
message = "hello " + name    # "hello world"
```

สิ่งนี้สร้าง JavaScript string concatenation

## Integer Division

TSL ไม่แยกแยะระหว่าง integer และ floating-point division ตัวดำเนินการ `/` สร้าง JavaScript number เสมอ (ซึ่งอาจเป็น float):

```tsl
a = 10 / 3     # 3.333...
b = 10 / 2     # 5
```

สำหรับ integer division ใช้ `Math.floor()` หรือตัวดำเนินการ `%`:

```tsl
a = Math.floor(10 / 3)    # 3
```

## Type Coercion

TSL ไม่ทำการ type conversion โดยตรง Type coercion ตามกฎของ JavaScript:

```tsl
# Number coercion
result = "5" + 3     # "53" (string concatenation)
result = "5" - 3     # 2 (numeric subtraction)

# Boolean coercion in conditions
if 1:
    print("truthy")

if 0:
    print("never runs")
```
