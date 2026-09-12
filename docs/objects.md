# TSL Objects

Objects in TSL are basic JavaScript objects. They are created with brace syntax `{}`, accessed with dot notation, and can contain any expression as a value including nested objects and arrays.

---

## Object Literal

Create an object with named properties:

```tsl
player = {
    x: 100,
    y: 200
}
```

Generates:

```js
let player = { x: 100, y: 200 };
```

Each property consists of an identifier key, a colon, and an expression value. Properties are separated by commas.

### Empty Object

```tsl
empty = {}
```

Generates:

```js
let empty = {};
```

### Multiple Properties

```tsl
color = {
    r: 255,
    g: 128,
    b: 0
}
```

Generates:

```js
let color = { r: 255, g: 128, b: 0 };
```

---

## Property Keys

Property keys must be identifiers (unquoted names). They cannot be string literals or expressions.

```tsl
data = {
    name: "TSL",
    version: 1
}
```

Generates:

```js
let data = { name: "TSL", version: 1 };
```

---

## Nested Objects

Objects can contain other objects as values:

```tsl
person = {
    name: "Alice",
    address: {
        city: "Bangkok",
        zip: "10000"
    }
}
```

Generates:

```js
let person = { name: "Alice", address: { city: "Bangkok", zip: "10000" } };
```

---

## Objects with Arrays

Object property values can be arrays:

```tsl
team = {
    name: "TSL",
    members: [1, 2, 3]
}
```

Generates:

```js
let team = { name: "TSL", members: [1, 2, 3] };
```

---

## Member Access

Read a property from an object using dot notation:

```tsl
px = player.x
```

Generates:

```js
let px = player.x;
```

### Chained Member Access

Access nested properties by chaining dot operators:

```tsl
city = person.address.city
```

Generates:

```js
let city = person.address.city;
```

Multiple levels of nesting work the same way:

```tsl
value = a.b.c.d
```

Generates:

```js
let value = a.b.c.d;
```

### Member Access in Expressions

Member access works inside expressions:

```tsl
result = player.x + player.y
```

Generates:

```js
let result = player.x + player.y;
```

---

## Member Assignment

Assign to a property of an object:

```tsl
player.x = 150
player.y = 300
```

Generates:

```js
player.x = 150;
player.y = 300;
```

Member assignment does not use `let` — it is always a plain assignment.

### Chained Member Assignment

Assign to nested properties:

```tsl
person.address.city = "Chiang Mai"
```

Generates:

```js
person.address.city = "Chiang Mai";
```

---

## Nested Object Mutation

Combine member access and assignment to mutate nested structures:

```tsl
player.x = 100
player.y = 200
player.score = 0
```

Generates:

```js
player.x = 100;
player.y = 200;
player.score = 0;
```

---

## AST Representation

| TSL Syntax | AST Node | Properties |
|------------|----------|------------|
| `{ x: 1 }` | `ObjectExpression` | `properties: Property[]` |
| `x: expr` | `Property` | `key: Identifier`, `value: Expression` |
| `obj.x` | `MemberExpression` | `object: Expression`, `property: Identifier` |
| `obj.x = v` | `Assignment` | `left: MemberExpression`, `right: Expression` |

---

## Supported Value Types

Object property values can be any TSL expression:

| Value Type | Syntax | Example |
|------------|--------|---------|
| Number | Literal | `{ x: 10 }` |
| String | Quoted | `{ name: "TSL" }` |
| Boolean | Literal | `{ active: true }` |
| Null | Literal | `{ data: null }` |
| Array | Brackets | `{ items: [1, 2] }` |
| Object | Braces | `{ inner: { x: 1 } }` |
| Expression | Any | `{ total: a + b }` |
| Member access | Dot | `{ val: obj.x }` |

---

## Limitations

TSL v1.0 objects are basic JavaScript objects with no additional features:

- No class syntax
- No inheritance
- No constructor keyword
- No `this` keyword
- No method syntax
- No object iteration (for...in, Object.keys, etc.)
- No spread operator
- Property keys must be identifiers (not strings or expressions)

Objects with function values (JavaScript closures) are not a language feature — they are a JavaScript implementation detail.

---

## Examples

### Game Player

```tsl
player = {
    x: 100,
    y: 200,
    name: "Hero"
}

player.x = 150
pos = player.x
```

Generates:

```js
let player = { x: 100, y: 200, name: "Hero" };

player.x = 150;
let pos = player.x;
```

### Configuration

```tsl
config = {
    title: "My Game",
    width: 800,
    height: 600,
    fullscreen: false,
    settings: {
        volume: 80,
        difficulty: "hard"
    }
}

screen_w = config.width
vol = config.settings.volume
```

Generates:

```js
let config = {
    title: "My Game",
    width: 800,
    height: 600,
    fullscreen: false,
    settings: { volume: 80, difficulty: "hard" }
};

let screen_w = config.width;
let vol = config.settings.volume;
```

### Team Data

```tsl
team = {
    name: "TSL",
    members: [1, 2, 3],
    stats: {
        wins: 10,
        losses: 2
    }
}

result = team.stats.wins
```

Generates:

```js
let team = { name: "TSL", members: [1, 2, 3], stats: { wins: 10, losses: 2 } };

let result = team.stats.wins;
```
