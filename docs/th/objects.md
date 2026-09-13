# ออบเจกต์ TSL

ออบเจกต์ใน TSL เป็น key-value collections

## ภาพรวม

| Feature | Supported |
|---------|-----------|
| Object literals | ✅ |
| Member access | ✅ |
| Member assignment | ✅ |
| Nested objects | ✅ |
| Chained access | ✅ |
| Dynamic keys | ❌ |
| Object methods | ❌ |
| `for ... in` iteration | ❌ |

---

## Object Literals

### Syntax

```tsl
{ key1: value1, key2: value2 }
```

### คำอธิบาย

- Keys เป็น identifiers
- Values เป็น expression ใดก็ได้
- Properties ถูกคั่นด้วย `,`
- Keys ต้องเป็น identifiers (ไม่รองรับ string keys)

### AST Node

```js
ObjectExpression {
    properties: { key: Identifier, value: Expression }[],
    location: Location
}
```

### JavaScript ที่ Generate

```js
{ key1: value1, key2: value2 };
```

### ตัวอย่าง

```tsl
player = { x: 100, y: 200, name: "Hero" }
config = { width: 800, height: 600 }
```

Generate:

```js
player = { x: 100, y: 200, name: "Hero" };
config = { width: 800, height: 600 };
```

---

## Member Access

### Syntax

```tsl
object.property
```

### คำอธิบาย

- ใช้ dot notation สำหรับ property access
- Property name ต้องเป็น identifier
- Chained access รองรับ: `obj.prop.method()`

### AST Node

```js
MemberAccess {
    object: Expression,
    property: Identifier,
    location: Location
}
```

### JavaScript ที่ Generate

```js
object.property;
```

### ตัวอย่าง

```tsl
player = { x: 100, y: 200 }
px = player.x
py = player.y
```

Generate:

```js
player = { x: 100, y: 200 };
px = player.x;
py = player.y;
```

---

## Member Assignment

### Syntax

```tsl
object.property = value
```

### คำอธิบาย

- Assign ค่าให้ property ของออบเจกต์
- Property name ต้องเป็น identifier
- ไม่ใช้ `let`

### AST Node

```js
MemberAssignment {
    object: Expression,
    property: Identifier,
    value: Expression,
    location: Location
}
```

### JavaScript ที่ Generate

```js
object.property = value;
```

### ตัวอย่าง

```tsl
player = { x: 100 }
player.x = 200
player.y = 300
```

Generate:

```js
player = { x: 100 };
player.x = 200;
player.y = 300;
```

---

## Nested Objects

### คำอธิบาย

ออบเจกต์สามารถมีค่าเป็นออบเจกต์อื่นได้

### ตัวอย่าง

```tsl
person = {
    name: "Alice",
    address: {
        city: "Bangkok",
        zip: "10100"
    }
}
```

Generate:

```js
person = {
    name: "Alice",
    address: {
        city: "Bangkok",
        zip: "10100"
    }
};
```

---

## Chained Access

### คำอธิบาย

สามารถ access properties ซ้อนกันได้หลายระดับ

### ตัวอย่าง

```tsl
matrix = { rows: 3, cols: 4, data: [1, 2, 3] }
value = matrix.data[0]
```

Generate:

```js
matrix = { rows: 3, cols: 4, data: [1, 2, 3] };
value = matrix.data[0];
```

### Chaining แบบซับซ้อน

```tsl
config = {
    game: {
        player: {
            x: 100,
            y: 200
        }
    }
}
px = config.game.player.x
```

Generate:

```js
config = {
    game: {
        player: {
            x: 100,
            y: 200
        }
    }
};
px = config.game.player.x;
```

---

## ตัวอย่างสมบูรณ์

```tsl
# Complete object example
player = {
    name: "Hero",
    health: 100,
    position: { x: 0, y: 0 }
}

print(player.name)
print(player.health)
print(player.position.x)

player.health = 80
player.position.x = 50
```

Generate:

```js
player = {
    name: "Hero",
    health: 100,
    position: { x: 0, y: 0 }
};
console.log(player.name);
console.log(player.health);
console.log(player.position.x);
player.health = 80;
player.position.x = 50;
```

---

## ตารางสรุป

| TSL | JavaScript |
|-----|------------|
| `{x: 10, y: 20}` | `{ x: 10, y: 20 }` |
| `obj.x` | `obj.x` |
| `obj.x = 100` | `obj.x = 100` |
| `obj.prop.method()` | `obj.prop.method()` |
| `obj.a.b.c` | `obj.a.b.c` |
| `obj.arr[0]` | `obj.arr[0]` |

---

## อ้างอิง

- **SPEC**: [SPEC.md #28-#31](../SPEC.md)
- **Parser**: `src/parser.js` — `parseObjectExpression()`, `parseMemberAccess()`
- **Generator**: `src/generator.js` — `generateObjectExpression()`, `generateMemberAccess()`, `generateMemberAssignment()`
- **AST**: `src/ast.js` — `ObjectExpression`, `MemberAccess`, `MemberAssignment`
