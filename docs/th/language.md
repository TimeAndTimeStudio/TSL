# ภาพรวมภาษา TSL

## ภาพรวม

TSL (Tiny Script Language) เป็นภาษาโปรแกรมขนาดเล็กที่ transpile เป็น JavaScript

## คำจำกัดความ

TSL เป็น **imperative**, **dynamically typed**, **JavaScript-transpiling** scripting language

## ฟีเจอร์

### รองรับ

- ตัวแปร (dynamic typing)
- เลขจำนวนเต็มและทศนิยม
- สตริง (double/single quotes)
- Boolean (true/false)
- Null
- ตัวดำเนินการทางคณิตศาสตร์ (+, -, *, /, %)
- ตัวดำเนินการเปรียบเทียบ (<, <=, >, >=, ==, !=)
- ตัวดำเนินการตรรกะ (and, or, not)
- ตัวแปรและ member assignment
- ฟังก์ชัน (parameters, return)
- Arrays (literals, indexing, assignment)
- Objects (literals, member access, assignment)
- If/else statements
- For loops (for-in)
- While loops
- Break/continue
- Pass statement
- Indentation-based blocks
- Comments (#)

### ไม่รองรับ (v1.0)

- Classes, inheritance, interfaces
- Modules, packages
- Static typing
- Garbage collector, VM, bytecode
- JIT compilation, native compilation
- Async, threads, coroutines
- Pattern matching, destructuring
- Default parameters, variadic parameters
- Array methods (map, filter, reduce)
- String interpolation
- Template literals
- Spread operator, rest parameters
- Arrow functions
- Promises, async/await
- Closures (partial support)
- Exception handling (try/catch)
- Class fields, methods
- Generators, iterators

## ตัวอย่าง

```tsl
# TSL program
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

## การ compile

```bash
node src/cli.js example.tsl
```

## การ build

```bash
node src/cli.js build example.tsl -o example.js
node example.js
```

## อ้างอิง

- **Getting Started:** [getting-started.md](getting-started.md)
- **Syntax:** [syntax.md](syntax.md)
- **SPEC:** [SPEC.md](../SPEC.md)
