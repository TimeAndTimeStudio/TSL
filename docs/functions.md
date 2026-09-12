# TSL Functions

Functions in TSL are defined using the `function` keyword. They compile to JavaScript `function` declarations and follow JavaScript semantics for scope, parameters, and return values.

## Declaration Syntax

```tsl
function name(parameters):
    body
```

- The keyword `function` starts a function declaration
- Followed by an identifier (the function name)
- Followed by parentheses containing zero or more comma-separated parameter names
- A colon (`:`) ends the signature and starts the function body block
- The body is an indented block of statements

### Example

```tsl
function add(a, b):
    return a + b
```

Generates:

```js
function add(a, b) {
  return (a + b);
}
```

## Parameters

Functions accept zero or more parameters. Parameters are identifiers separated by commas. No type annotations are supported.

### Zero Parameters

```tsl
function greet():
    print("Hello")
```

Generates:

```js
function greet() {
  console.log("Hello");
}
```

### Single Parameter

```tsl
function double(x):
    return x * 2
```

Generates:

```js
function double(x) {
  return (x * 2);
}
```

### Multiple Parameters

```tsl
function add(a, b):
    return a + b
```

Generates:

```js
function add(a, b) {
  return (a + b);
}
```

Parameters are treated as declared variables within the function body. Assigning to a parameter name inside the function body generates a reassignment (not a new `let`):

```tsl
function adjust(x):
    x = x + 1
    return x
```

Generates:

```js
function adjust(x) {
  x = (x + 1);
  return x;
}
```

## Return Statement

The `return` statement exits a function and optionally returns a value.

### Return with Expression

```tsl
function square(x):
    return x * x
```

Generates:

```js
function square(x) {
  return (x * x);
}
```

### Return without Value

```tsl
function done():
    return
```

Generates:

```js
function done() {
  return ;
}
```

### Return Outside Function (Semantic Error)

A `return` statement outside of any function body is a semantic error:

```tsl
return 10  # ERROR: return outside function
```

The validator catches this and throws a `ValidationError` with the message `"return outside function"`.

## Function Call

Functions are called using standard call syntax: `name(arguments)`.

### No Arguments

```tsl
greet()
```

Generates:

```js
greet();
```

### With Arguments

```tsl
result = add(10, 20)
```

Generates:

```js
let result = add(10, 20);
```

### Nested Calls

Function calls can be nested in arguments:

```tsl
result = add(double(5), 10)
```

Generates:

```js
let result = add(double(5), 10);
```

## Function Body

The function body is an indented block that can contain any TSL statements: assignments, control flow, loops, other function calls, and return statements.

### Multiple Statements

```tsl
function max(a, b):
    if a > b:
        return a
    return b
```

Generates:

```js
function max(a, b) {
  if ((a > b)) {
    return a;
  }
  return b;
}
```

### Function with No Return

A function that does not contain a `return` statement simply executes its body and returns `undefined` (JavaScript default):

```tsl
function greet(name):
    print("Hello, " + name)
```

Generates:

```js
function greet(name) {
  console.log("Hello, " + name);
}
```

### Function with Loops

```tsl
function countdown(n):
    while n > 0:
        print(n)
        n = n - 1
```

Generates:

```js
function countdown(n) {
  while (n > 0) {
    console.log(n);
    n = (n - 1);
  }
}
```

### Function with For Loop

```tsl
function sum_array(arr):
    total = 0
    for item in arr:
        total = total + item
    return total
```

Generates:

```js
function sum_array(arr) {
  let total = 0;
  for (let item of arr) {
    total = (total + item);
  }
  return total;
}
```

## Local Variables

Variables assigned inside a function body are local to that function. The first assignment generates `let`, subsequent assignments generate plain assignment:

```tsl
function compute(x):
    y = x * 2
    z = y + 1
    return z
```

Generates:

```js
function compute(x) {
  let y = (x * 2);
  let z = (y + 1);
  return z;
}
```

## Multiple Functions

Multiple function declarations can appear at the top level:

```tsl
function add(a, b):
    return a + b

function sub(a, b):
    return a - b
```

Generates:

```js
function add(a, b) {
  return (a + b);
}
function sub(a, b) {
  return (a - b);
}
```

## Recursion

Functions can call themselves. This uses standard JavaScript recursion:

```tsl
function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

Generates:

```js
function factorial(n) {
  if ((n <= 1)) {
    return 1;
  }
  return (n * factorial((n - 1)));
}
```

## Nested Functions

Functions can be defined inside other functions. Each nested function creates a new scope:

```tsl
function outer(x):
    function inner(y):
        return y * 2
    return inner(x + 1)
```

Generates:

```js
function outer(x) {
  function inner(y) {
    return (y * 2);
  }
  return inner((x + 1));
}
```

## Returning Values

Functions can return any expression: literals, variables, arithmetic, arrays, objects, member access, and function calls.

### Return Literal Values

```tsl
function get_null():
    return null

function get_true():
    return true

function get_string():
    return "hello"
```

Generates:

```js
function get_null() {
  return null;
}
function get_true() {
  return true;
}
function get_string() {
  return "hello";
}
```

### Return Array / Object

```tsl
function make_pair(a, b):
    return [a, b]

function make_point(x, y):
    return { x: x, y: y }
```

Generates:

```js
function make_pair(a, b) {
  return [a, b];
}
function make_point(x, y) {
  return { x: x, y: y };
}
```

### Return Member Access

```tsl
function get_x(obj):
    return obj.x
```

Generates:

```js
function get_x(obj) {
  return obj.x;
}
```

## Function with Member Assignment

Functions can assign to object properties:

```tsl
function set_x(obj, val):
    obj.x = val
```

Generates:

```js
function set_x(obj, val) {
  obj.x = val;
}
```

## Control Flow in Functions

Functions can contain `break` and `continue` inside loops:

```tsl
function find(items, target):
    for item in items:
        if item == target:
            return item
    return null
```

Generates:

```js
function find(items, target) {
  for (let item of items) {
    if (item == target) {
      return item;
    }
  }
  return null;
}
```

## Empty Function

A function body can contain `pass` (a no-op):

```tsl
function empty():
    pass
```

Generates:

```js
function empty() {
  // pass
}
```

## Call After Declaration

Functions can be called after their declaration in the same program:

```tsl
function add(a, b):
    return a + b

result = add(3, 4)
```

Generates:

```js
function add(a, b) {
  return (a + b);
}
let result = add(3, 4);
```

## Semantic Validation

The validator enforces the following rules for functions:

| Rule | Error Message |
|------|---------------|
| `return` outside function | `return outside function` |
| `break` outside loop (inside function) | `break outside loop` |
| `continue` outside loop (inside function) | `continue outside loop` |

Nested functions create a new function context. A `return` inside a nested function is valid even if the enclosing context is not a function.

## AST Node

Functions are represented by the `FunctionDeclaration` AST node:

```js
{
  type: 'FunctionDeclaration',
  name: Identifier,
  parameters: [Identifier, ...],
  body: [Statement, ...],
  location: Location
}
```

## Generated JavaScript

TSL functions compile to standard JavaScript `function` declarations. There is no wrapper, no special runtime, and no type system. Functions behave exactly like JavaScript functions.

| TSL Feature | JavaScript Output |
|-------------|-------------------|
| `function name(params):` | `function name(params) {` |
| `return value` | `return value;` |
| `return` | `return ;` |
| Function body block | `{ ... }` |
| Local variable (first assign) | `let x = ...;` |
| Local variable (reassign) | `x = ...;` |
| Parameter | `function(name) {` (parameter declared) |
