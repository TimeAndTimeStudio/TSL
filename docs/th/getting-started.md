# เริ่มต้นใช้งาน TSL

TSL (Tiny Script Language) เป็นภาษาโปรแกรมขนาดเล็กที่ transpile เป็น JavaScript ใช้ indentation สำหรับ blocks มีไวยากรณ์ง่าย ๆ และรันบน JavaScript runtime ใดก็ได้

**เวอร์ชัน:** 1.0.0
**นามสกุลไฟล์:** `.tsl`

---

## การติดตั้ง

```bash
npm install
```

---

## เริ่มต้นอย่างรวดเร็ว

สร้างไฟล์ `hello.tsl`:

```tsl
# Hello World
print("Hello, World!")
```

รัน:

```bash
node src/cli.js hello.tsl
```

ผลลัพธ์:

```
Loaded: hello.tsl
Compilation successful!

--- Generated JavaScript ---
console.log("Hello, World!");
--- End of Generated Code ---
```

---

## Build เป็น JavaScript

เพื่อสร้างไฟล์ JavaScript:

```bash
node src/cli.js hello.tsl -o hello.js
```

หรือใช้ build command:

```bash
node src/cli.js build hello.tsl -o hello.js
```

จากนั้นรัน JavaScript ที่สร้างด้วย Node.js:

```bash
node hello.js
```

---

## ตรวจสอบ Syntax

เพื่อ validate ไฟล์ TSL โดยไม่ต้อง generate output:

```bash
node src/cli.js check hello.tsl
```

ผลลัพธ์เมื่อสำเร็จ:

```
Check passed: hello.tsl
```

---

## เวอร์ชัน

```bash
node src/cli.js --version
```

ผลลัพธ์:

```
TSL v1.0.0
```

---

## พื้นฐานภาษา

### ตัวแปร

ตัวแปรถูกสร้างเมื่อมีการกำหนดค่าครั้งแรก การประกาศครั้งแรกจะใช้ `let` ใน JavaScript ที่ generate

```tsl
name = "TSL"
version = 1
pi = 3.14
active = true
nothing = null
```

การกำหนดค่าใหม่ไม่ใช้ `let`:

```tsl
x = 10
x = 20  # reassignment, no let
```

### ชนิดข้อมูล

**ตัวเลข** — จำนวนเต็มและทศนิยม:

```tsl
x = 42
y = 3.14
```

**สตริง** — ใช้เครื่องหมายคำพูดคู่หรือเดี่ยว:

```tsl
a = "hello"
b = 'world'
```

**Boolean:**

```tsl
is_ready = true
is_done = false
```

**Null:**

```tsl
value = null
```

### ตัวดำเนินการ

**ทางคณิตศาสตร์:**

```tsl
a = 10 + 5    # addition
b = 10 - 5    # subtraction
c = 10 * 5    # multiplication
d = 10 / 5    # division
e = 10 % 3    # modulo
```

**เปรียบเทียบ:**

```tsl
a == b    # equal
a != b    # not equal
a < b     # less than
a <= b    # less than or equal
a > b     # greater than
a >= b    # greater than or equal
```

**ตรรกะ:**

```tsl
result = (a > 10) and (b < 5)
result = (a > 10) or (b < 5)
result = not (a > 10)
```

**ลำดับความสำคัญของตัวดำเนินการ** (จากสูงไปต่ำ):

1. `()`
2. `not`
3. `*`, `/`, `%`
4. `+`, `-`
5. `<`, `<=`, `>`, `>=`
6. `==`, `!=`
7. `and`
8. `or`

### แสดงความคิดเห็น

ใช้ `#` สำหรับแสดงความคิดเห็นตลอดบรรทัด:

```tsl
# This is a comment
x = 10  # inline comment
```

คอมเมนต์ถูกเพิกเฉยโดยคอมไพเลอร์

---

### การควบคุมการไหล

**If / Else:**

```tsl
x = 15

if x > 10:
    print("big")
else:
    print("small")
```

Blocks ถูกกำหนดโดย indentation (ช่องว่าง) และเครื่องหมาย `:`

**While:**

```tsl
counter = 3

while counter > 0:
    print(counter)
    counter = counter - 1

print("Go!")
```

**For (กับ range):**

```tsl
for i in range(5):
    print(i)
```

**Break / Continue:**

```tsl
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

`break` และ `continue` ทำงานเฉพาะภายใน loops

---

### ฟังก์ชัน

**การประกาศ:**

```tsl
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

**ไม่มีค่าที่ส่งกลับ:**

```tsl
function greet(name):
    print("Hello, " + name)

greet("TSL")
```

---

### อาร์เรย์

**สร้าง:**

```tsl
numbers = [1, 2, 3, 4, 5]
```

**เข้าถึง:**

```tsl
first = numbers[0]
last = numbers[4]
```

---

### ออบเจกต์

**สร้าง:**

```tsl
player = { x: 100, y: 200, name: "Hero" }
```

**เข้าถึง properties:**

```tsl
print(player.x)
print(player.y)
print(player.name)
```

**Member access chaining:**

```tsl
matrix = { rows: 3, cols: 4, data: [1, 2, 3] }
print(matrix.data[0])
```

---

## ตัวอย่างสมบูรณ์

```tsl
# Complete example
max_value = 10
counter = 0

function check_number(n):
    if n > max_value:
        return "too big"
    else:
        return "ok"

for i in range(5):
    result = check_number(i * 3)
    print(i + " -> " + result)
    counter = counter + 1

print("Done: " + counter)
```

---

## อ้างอิง CLI

| คำสั่ง | คำอธิบาย |
|---------|-------------|
| `node src/cli.js <file.tsl>` | Compile และแสดง JavaScript ที่ generate |
| `node src/cli.js <file.tsl> -o <output.js>` | Compile และเขียนไปยังไฟล์ |
| `node src/cli.js build <file.tsl>` | Build และแสดง JavaScript |
| `node src/cli.js build <file.tsl> -o <output.js>` | Build และเขียนไปยังไฟล์ |
| `node src/cli.js check <file.tsl>` | Validate syntax |
| `node src/cli.js --version` | แสดงเวอร์ชัน |

---

## ไพล์ไลน์คอมไพเลอร์

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

แต่ละขั้นตอนสามารถผลิตข้อผิดพลาดที่มีข้อมูล filename, line, column และ source line

---

## ชนิดข้อผิดพลาด

| ชนิด | คำอธิบาย |
|------|-------------|
| Lexer Error | ตัวอักษรที่ไม่ถูกต้องหรือสตริงที่ไม่มีที่สิ้นสุด |
| Parser Error | tokens ที่ไม่คาดหรือ syntax ที่ขาดหาย |
| Semantic Error | `return` นอกฟังก์ชัน, `break`/`continue` นอก loop |
| Generator Error | AST node type ที่ไม่รู้จัก |

---

## นอกระยะ (v1.0)

สิ่งต่อไปนี้**ไม่ใช่**ส่วนหนึ่งของ TSL v1.0:

- Classes, inheritance, interfaces
- Modules, packages
- Static typing
- Garbage collector, VM, bytecode
- JIT compilation, native compilation
- Async, threads, coroutines
- Pattern matching, destructuring

---

## ตัวอย่าง

ดูใน `examples/` directory สำหรับเพิ่มเติม:

```
examples/
    hello.tsl
    functions.tsl
    arrays.tsl
    objects.tsl
    if.tsl
    for.tsl
    while.tsl
    strings.tsl
```
