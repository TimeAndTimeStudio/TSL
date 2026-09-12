# TSL Variables

Variables in TSL are assigned using the `=` operator. The compiler automatically decides whether to generate a `let` declaration or a plain assignment based on whether the variable has been declared in the current scope.

## Assignment Syntax

```tsl
x = 10
name = "TSL"
is_ready = true
nothing = null
```

## Declaration (First Assignment)

The first time a variable name is assigned within a scope, the compiler generates a `let` declaration:

```tsl
x = 10
```

Generates:

```js
let x = 10;
```

## Reassignment

Subsequent assignments to the same variable in the same or outer scopes generate a plain assignment (no `let`):

```tsl
x = 20
```

Generates:

```js
x = 20;
```

The compiler tracks declared variable names per scope. Once a name is declared, all further assignments to that name in any enclosing scope produce `x = ...;` instead of `let x = ...;`.

## Member Assignment

Assigning to a property of an object does not use `let`:

```tsl
player.x = 100
player.y = 200
```

Generates:

```js
player.x = 100;
player.y = 200;
```

## Array Assignment

Assigning to an array element does not use `let`:

```tsl
arr[0] = 10
arr[1] = 20
```

Generates:

```js
arr[0] = 10;
arr[1] = 20;
```

## Scope Rules

TSL uses lexical scope:

- **Function creates a new scope.** Variables assigned inside a function are local to that function unless the name was already declared in an outer scope.
- **Outer scope variables are visible in inner scopes.** A variable declared in an outer scope can be reassigned inside a nested block or function.
- **`for` loop variable is declared with `let`.** The loop variable is introduced into the loop body scope.

### Example

```tsl
x = 10        # let x = 10; (first declaration in global scope)
x = 20        # x = 20; (reassignment in global scope)

function foo():
    y = 1     # let y = 1; (first declaration in function scope)
    y = 2     # y = 2; (reassignment in function scope)
    x = 30    # x = 30; (reassignment of outer scope variable)
```

Generates:

```js
let x = 10;
x = 20;

function foo() {
    let y = 1;
    y = 2;
    x = 30;
}
```

## Function Parameters

Function parameters are automatically treated as declared variables within the function body. Assigning to a parameter name inside the function body does not generate a second `let`:

```tsl
function add(a, b):
    a = a + 1    # a = a + 1; (reassignment, not a new declaration)
    return a + b
```

Generates:

```js
function add(a, b) {
    a = a + 1;
    return a + b;
}
```

## Supported Value Types

Variables can hold any expression value:

| Type | Syntax | Example |
|------|--------|---------|
| Number | Literal | `x = 42` |
| String | Quoted | `name = "TSL"` |
| Boolean | Literal | `flag = true` |
| Null | Literal | `nothing = null` |
| Array | Brackets | `items = [1, 2, 3]` |
| Object | Braces | `obj = { x: 10 }` |
| Expression | Any | `result = a + b` |
