# CLI Reference TSL

## ภาพรวม

Command-line interface สำหรับ TSL compiler

## คำสั่ง

### Compile และแสดง JavaScript

```bash
node src/cli.js <file.tsl>
```

**ตัวอย่าง:**

```bash
node src/cli.js hello.tsl
```

**ผลลัพธ์:**

```
Loaded: hello.tsl
Compilation successful!

--- Generated JavaScript ---
console.log("Hello, World!");
--- End of Generated Code ---
```

### Compile และเขียนไฟล์

```bash
node src/cli.js <file.tsl> -o <output.js>
```

**ตัวอย่าง:**

```bash
node src/cli.js hello.tsl -o hello.js
```

**ผลลัพธ์:**

```
Loaded: hello.tsl
Compilation successful!
Output written to: hello.js
```

### Build และแสดง JavaScript

```bash
node src/cli.js build <file.tsl>
```

**ตัวอย่าง:**

```bash
node src/cli.js build hello.tsl
```

**ผลลัพธ์:** เหมือน compile และแสดง JavaScript

### Build และเขียนไฟล์

```bash
node src/cli.js build <file.tsl> -o <output.js>
```

**ตัวอย่าง:**

```bash
node src/cli.js build hello.tsl -o hello.js
```

**ผลลัพธ์:** เหมือน compile และเขียนไฟล์

### Validate Syntax

```bash
node src/cli.js check <file.tsl>
```

**ตัวอย่าง:**

```bash
node src/cli.js check hello.tsl
```

**ผลลัพธ์เมื่อสำเร็จ:**

```
Check passed: hello.tsl
```

**ผลลัพธ์เมื่อมี error:**

```
Error in hello.tsl:
  Line 1: Invalid character '!'
```

### แสดงเวอร์ชัน

```bash
node src/cli.js --version
```

**ผลลัพธ์:**

```
TSL v1.0.0
```

---

## Usage

```
Usage: node src/cli.js [command] [options] <file.tsl>

Commands:
  <file.tsl>              Compile and display JavaScript
  build <file.tsl>        Build and display JavaScript
  check <file.tsl>        Validate syntax only
  --version               Show version

Options:
  -o, --output <file>     Output file path
  -h, --help              Show help
```

---

## Exit Codes

| Code | คำอธิบาย |
|------|----------|
| 0 | สำเร็จ |
| 1 | มีข้อผิดพลาด |

---

## ตัวอย่าง

### Hello World

```tsl
# hello.tsl
print("Hello, World!")
```

Compile:

```bash
node src/cli.js hello.tsl
```

Build to file:

```bash
node src/cli.js hello.tsl -o hello.js
node hello.js
```

### Functions

```tsl
# functions.tsl
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

Compile:

```bash
node src/cli.js functions.tsl
```

### Arrays

```tsl
# arrays.tsl
numbers = [1, 2, 3, 4, 5]
for n in numbers:
    print(n)
```

Compile:

```bash
node src/cli.js arrays.tsl
```

### Objects

```tsl
# objects.tsl
player = { x: 100, y: 200 }
print(player.x)
print(player.y)
```

Compile:

```bash
node src/cli.js objects.tsl
```

### Control Flow

```tsl
# control.tsl
x = 15

if x > 10:
    print("big")
else:
    print("small")
```

Compile:

```bash
node src/cli.js control.tsl
```

### While Loop

```tsl
# while.tsl
counter = 3
while counter > 0:
    print(counter)
    counter = counter - 1
print("Go!")
```

Compile:

```bash
node src/cli.js while.tsl
```

### Strings

```tsl
# strings.tsl
name = "TSL"
greeting = "Hello, " + name
print(greeting)
```

Compile:

```bash
node src/cli.js strings.tsl
```

---

## Error Handling

เมื่อเกิดข้อผิดพลาด CLI จะแสดง:

```
Error in <filename>:
  Line <line>: <message>
  <source_line>
```

**ตัวอย่าง:**

```
Error in hello.tsl:
  Line 1: Invalid character '!'
  !invalid
```

---

## ไฟล์

**CLI Source:** `src/cli.js`

---

## อ้างอิง

- **CLI Source:** `src/cli.js`
- **Compiler:** `src/compiler.js`
- **Lexer:** `src/lexer.js`
- **Parser:** `src/parser.js`
- **Validator:** `src/validator.js`
- **Generator:** `src/generator.js`
