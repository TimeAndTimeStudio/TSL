# ตัวอย่าง TSL

## ภาพรวม

ตัวอย่างทั้งหมดอยู่ใน `examples/` directory

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

---

## Hello World

**ไฟล์:** `examples/hello.tsl`

```tsl
# Hello World
print("Hello, World!")
```

**ผลลัพธ์:**

```
Hello, World!
```

---

## Functions

**ไฟล์:** `examples/functions.tsl`

```tsl
# Function example
function add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

**ผลลัพธ์:**

```
30
```

---

## Arrays

**ไฟล์:** `examples/arrays.tsl`

```tsl
# Array example
numbers = [1, 2, 3, 4, 5]

for n in numbers:
    print(n)
```

**ผลลัพธ์:**

```
1
2
3
4
5
```

---

## Objects

**ไฟล์:** `examples/objects.tsl`

```tsl
# Object example
player = {
    name: "Hero",
    health: 100,
    position: { x: 0, y: 0 }
}

print(player.name)
print(player.health)
print(player.position.x)
```

**ผลลัพธ์:**

```
Hero
100
0
```

---

## If/Else

**ไฟล์:** `examples/if.tsl`

```tsl
# If/else example
x = 15

if x > 10:
    print("big")
else:
    print("small")
```

**ผลลัพธ์:**

```
big
```

---

## For Loop

**ไฟล์:** `examples/for.tsl`

```tsl
# For loop example
for i in range(5):
    print(i)
```

**ผลลัพธ์:**

```
0
1
2
3
4
```

---

## While Loop

**ไฟล์:** `examples/while.tsl`

```tsl
# While loop example
counter = 3

while counter > 0:
    print(counter)
    counter = counter - 1

print("Go!")
```

**ผลลัพธ์:**

```
3
2
1
Go!
```

---

## Strings

**ไฟล์:** `examples/strings.tsl`

```tsl
# String example
name = "TSL"
greeting = "Hello, " + name
print(greeting)
```

**ผลลัพธ์:**

```
Hello, TSL
```

---

## ตัวอย่างผสม

### Accumulator Pattern

```tsl
# Accumulator pattern
numbers = [10, 20, 30, 40, 50]
sum = 0

for n in numbers:
    sum = sum + n

print(sum)
```

**ผลลัพธ์:**

```
150
```

### Search Pattern

```tsl
# Search pattern
numbers = [1, 5, 3, 9, 2]
target = 9
found = false

for n in numbers:
    if n == target:
        found = true
        break

if found:
    print("Found!")
else:
    print("Not found")
```

**ผลลัพธ์:**

```
Found!
```

### Nested Objects

```tsl
# Nested objects
config = {
    game: {
        player: {
            x: 100,
            y: 200
        }
    }
}

print(config.game.player.x)
print(config.game.player.y)
```

**ผลลัพธ์:**

```
100
200
```

### Recursion

```tsl
# Recursion
function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(5)
print(result)
```

**ผลลัพธ์:**

```
120
```

### Break and Continue

```tsl
# Break and continue
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

**ผลลัพธ์:**

```
0
1
2
4
5
6
```

---

## รันตัวอย่าง

### รันโดยตรง

```bash
node src/cli.js examples/hello.tsl
```

### Build เป็น JavaScript

```bash
node src/cli.js examples/hello.tsl -o hello.js
node hello.js
```

### Validate

```bash
node src/cli.js check examples/hello.tsl
```

---

## อ้างอิง

- **Examples:** `examples/` directory
- **CLI:** `src/cli.js`
- **Getting Started:** [getting-started.md](getting-started.md)
