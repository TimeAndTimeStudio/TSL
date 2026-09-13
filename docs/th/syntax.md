# อ้างอิงไวยากรณ์ภาษา TSL

## ภาพรวม

TSL เป็นภาษาสคริปต์ที่ใช้ indentation เอกสารนี้อธิบายไวยากรณ์ทั้งหมดของ TSL

## แสดงความคิดเห็น

คอมเมนต์แบบบรรทัดเดียวขึ้นต้นด้วย `#` และไปจนสุดบรรทัด

```tsl
# This is a comment
```

คอมเมนต์ถูกเพิกเฉยโดย Lexer

## Identifiers

Identifiers ใช้ตั้งชื่อตัวแปร ฟังก์ชัน และ properties

**กฎ:**

- ต้องขึ้นต้นด้วยตัวอักษร (`a-z`, `A-Z`) หรือขีดล่าง (`_`)
- ตามด้วยตัวอักษร ตัวเลข (`0-9`) หรือขีดล่างศูนย์หรือมากกว่า
- แยกตัวพิมพ์ใหญ่เล็ก (`x` และ `X`是不同的)
- ไม่สามารถใช้เป็น keywords ได้

**ตัวอย่าง:**

```tsl
x
player
player_x
_value
x2
```

**ตัวอย่างที่ไม่ถูกต้อง:**

```tsl
1x      # starts with a digit
player-x # hyphen not allowed
```

## Keywords

Keywords เป็นคำสงวนที่มีความหมายพิเศษในภาษา ไม่สามารถใช้เป็น identifiers ได้

| Keyword | คำอธิบาย |
|---------|-------------|
| `if` | Conditional statement |
| `else` | Alternate branch of condition |
| `for` | Loop over iterable |
| `in` | Used with `for` to specify iterable |
| `while` | Conditional loop |
| `function` | Function declaration |
| `return` | Return from function |
| `break` | Exit loop early |
| `continue` | Skip to next iteration |
| `pass` | No-op statement |
| `true` | Boolean true literal |
| `false` | Boolean false literal |
| `null` | Null literal |
| `and` | Logical AND operator |
| `or` | Logical OR operator |
| `not` | Logical NOT operator |

## Literals

### ตัวเลข

จำนวนเต็มและทศนิยม

```tsl
10
42
3.14
0.5
```

ตัวเลขถูก parse เป็น JavaScript `Number` type

### สตริง

สตริงถูกปิดล้อมด้วยเครื่องหมายคำพูดคู่ (`"`) หรือเดี่ยว (`'`)

```tsl
"hello"
'world'
```

**Escape sequences:**

| Escape | ความหมาย |
|--------|---------|
| `\\n` | Newline |
| `\\t` | Tab |
| `\\\\` | Backslash |
| `\\"` | Double quote |
| `\\'` | Single quote |

```tsl
"hello\nworld"
'say \'hi\''
```

### Boolean

Boolean literals สองค่า:

```tsl
true
false
```

### Null

`null` literal แทนการไม่มีค่า:

```tsl
null
```

## ตัวดำเนินการ

### ทางคณิตศาสตร์

| ตัวดำเนินการ | คำอธิบาย |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |

### เปรียบเทียบ

| ตัวดำเนินการ | คำอธิบาย |
|----------|-------------|
| `<` | Less than |
| `<=` | Less than or equal |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `==` | Equal |
| `!=` | Not equal |

### ตรรกะ

| ตัวดำเนินการ | คำอธิบาย |
|----------|-------------|
| `and` | Logical AND |
| `or` | Logical OR |
| `not` | Logical NOT (prefix) |

### ลำดับความสำคัญของตัวดำเนินการ

จากต่ำไปสูง:

| ความสำคัญ | ตัวดำเนินการ | Associativity |
|------------|-----------|---------------|
| 1 | `or` | Left |
| 2 | `and` | Left |
| 3 | `==`, `!=`, `<`, `<=`, `>`, `>=` | Left |
| 4 | `+`, `-` | Left |
| 5 | `*`, `/`, `%` | Left |
| 6 | `not` | Right (prefix) |
| 7 | `()` | N/A |

### ตัวอย่าง

```tsl
# Low precedence: (true or false) and false
result = true or false and false

# High precedence: (2 * 3) + 1
result = 2 * 3 + 1

# not binds tighter than and
result = not x and y
```

## Delimiters

| Token | สัญลักษณ์ | คำอธิบาย |
|-------|--------|-------------|
| Left parenthesis | `(` | Start of grouping / argument list |
| Right parenthesis | `)` | End of grouping / argument list |
| Left bracket | `[` | Start of array literal / access |
| Right bracket | `]` | End of array literal / access |
| Left brace | `{` | Start of object literal |
| Right brace | `}` | End of object literal |
| Comma | `,` | Separator in lists |
| Dot | `.` | Member access |
| Colon | `:` | Block delimiter |
| Equals | `=` | Assignment |

## Block Structure

TSL ใช้ **indentation** สำหรับกำหนด code blocks ไม่ใช่ braces หรือ keywords

### กฎ

1. เครื่องหมาย colon (`:`) บอกจุดเริ่มต้นของ block
2. เนื้อหาของ block ถูกกำหนดโดย indentation ที่สม่ำเสมอ (ช่องว่าง)
3. การตรวจจับจุดสิ้นสุด block: บรรทัดที่มี indentation น้อยกว่าหรือเท่ากับ block ปัจจุบันจะสิ้นสุด block
4. ไม่จำเป็นต้องมี `end` keyword

### ตัวอย่าง

```tsl
if x > 10:
    print(x)
```

### Block Syntax

```tsl
if condition:
    # body — indented
    pass
else:
    # else body — same indentation level
    pass
```

```tsl
for item in collection:
    print(item)

while x > 0:
    x = x - 1

function greet(name):
    print(name)
```

### Indentation

- ใช้ช่องว่างสำหรับ indentation (ไม่รองรับ tabs)
- ต้องใช้ indentation ที่สม่ำเสมอภายใน block
- การใช้ indentation ที่ผสมกันจะทำให้เกิด lexer error

## การควบคุมการไหล

### If Statement

```tsl
if x > 10:
    print("big")
else:
    print("small")
```

### For Loop

```tsl
for item in collection:
    print(item)
```

### While Loop

```tsl
while x > 0:
    x = x - 1
```

### Break และ Continue

```tsl
for item in collection:
    if item == target:
        break
    if item == skip:
        continue
    print(item)
```

## ฟังก์ชัน

### การประกาศ

```tsl
function add(a, b):
    return a + b
```

### การเรียก

```tsl
result = add(1, 2)
```

### Return

```tsl
function square(x):
    return x * x
```

Return โดยไม่มีค่า:

```tsl
function doNothing():
    return
```

## Expressions

### Assignment

```tsl
x = 10
```

Member access assignment:

```tsl
player.x = 100
```

Array access assignment:

```tsl
arr[0] = 10
```

### Array Literals

```tsl
[1, 2, 3]
["a", "b", "c"]
```

### Array Access

```tsl
arr[0]
matrix[x][y]
```

### Object Literals

```tsl
{
    name: "Alice",
    age: 30
}
```

### Member Access

```tsl
player.x
player.name
```

### Function Calls

```tsl
print("hello")
math.sqrt(16)
```

### Chained Access

```tsl
# Chained member access
obj.prop.method()

# Chained array access
arr[0][1]

# Mixed access
arr[0].prop
```

## ตัวอย่างสมบูรณ์

```tsl
# TSL program
function max(a, b):
    if a > b:
        return a
    else:
        return b

numbers = [1, 5, 3, 9, 2]
largest = null

for n in numbers:
    if largest == null:
        largest = n
    else:
        largest = max(largest, n)

print(largest)
```
