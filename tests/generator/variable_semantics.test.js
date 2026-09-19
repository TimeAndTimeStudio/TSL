const { tokenize } = require("../../src/lexer");
const { createParser } = require("../../src/parser");
const { createValidator } = require("../../src/validator");
const { createGenerator } = require("../../src/generator");
const { Program, Location } = require("../../src/ast");

function compile(source) {
  const tokens = tokenize(source, "<test>");
  const parser = createParser(tokens, source, "<test>");
  const statements = parser.parseStatements();
  const loc = new Location(1, 0, 1, 0);
  const ast = Program(statements, loc);
  const validator = createValidator();
  validator.validate(ast);
  const generator = createGenerator(source);
  return generator.generate(ast);
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e.message);
    process.exit(1);
  }
}

function assertEqual(actual, expected) {
  if (actual.trim() !== expected.trim()) {
    throw new Error(`Expected:\n${expected}\n\nGot:\n${actual}`);
  }
}

// === Variable Declaration ===

test("declaration uses let", () => {
  const js = compile(`set x = 10`);
  assertEqual(js, `'use strict';
let x = 10;`);
});

test("multiple declarations use let", () => {
  const js = compile(`set a = 1\nset b = 2`);
  assertEqual(js, `'use strict';
let a = 1;
let b = 2;`)
});

// === Variable Reassignment ===

test("reassignment does not use let", () => {
  const js = compile(`set x = 10\nx = 20`);
  assertEqual(js, `'use strict';
let x = 10;
x = 20;`);
});

test("reassignment after multiple declarations", () => {
  const js = compile(`set x = 1\nx = 2\nset y = 3\ny = 4`);
  assertEqual(js, `'use strict';
let x = 1;
x = 2;
let y = 3;
y = 4;`);
});

// === Function Scope ===

test("function parameters are declared variables", () => {
  const source = `function foo(x):
  x = x + 1
  return x`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function foo(x) {
  x = x + 1;
  return x;
}`);
});

test("local variables in function use let", () => {
  const source = `function foo():
  set y = 10
  return y`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function foo() {
  let y = 10;
  return y;
}`);
});

test("reassignment of parameter in function", () => {
  const source = `function add(a):
  a = a + 1
  return a`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function add(a) {
  a = a + 1;
  return a;
}`);
});

test("function scope is separate from global scope", () => {
  const source = `set x = 1
function foo():
  x = 2
  return x
set result = foo()`;
  const js = compile(source);
  assertEqual(js, `'use strict';
let x = 1;
function foo() {
  x = 2;
  return x;
}
let result = foo();`);
});

// === Block Scope in If ===

test("if block creates new scope", () => {
  const source = `if (true):
  set y = 10
console.log(y)`;
  const js = compile(source);
  assertEqual(js, `'use strict';
if (true) {
  let y = 10;
}
console.log(y);`);
});

test("if-else each has own scope", () => {
  const source = `if (true):
  set y = 10
else:
  set y = 20`;
  const js = compile(source);
  assertEqual(js, `'use strict';
if (true) {
  let y = 10;
} else {
  let y = 20;
}`);
});

test("reassign outer variable inside if block", () => {
  const source = `set x = 1
if (true):
  x = 2`;
  const js = compile(source);
  assertEqual(js, `'use strict';
let x = 1;
if (true) {
  x = 2;
}`);
});

// === Block Scope in While ===

test("while block creates new scope", () => {
  const source = `while (true):
  set y = 10
console.log(y)`;
  const js = compile(source);
  assertEqual(js, `'use strict';
while (true) {
  let y = 10;
}
console.log(y);`);
});

test("reassign outer variable inside while block", () => {
  const source = `set counter = 5
while counter > 0:
  counter = counter - 1`;
  const js = compile(source);
  assertEqual(js, `'use strict';
let counter = 5;
while (counter > 0) {
  counter = counter - 1;
}`);
});

// === Block Scope in For ===

test("for loop variable is scoped to loop", () => {
  const source = `for i in range(3):
  console.log(i)
console.log(i)`;
  const js = compile(source);
  assertEqual(js, `'use strict';
for (let i = 0; i < 3; i = i + 1) {
  console.log(i);
}
console.log(i);`);
});

test("for loop body creates new scope", () => {
  const source = `set x = 1
for i in range(3):
  x = x + i`;
  const js = compile(source);
  assertEqual(js, `'use strict';
let x = 1;
for (let i = 0; i < 3; i = i + 1) {
  x = x + i;
}`);
});

// === Nested Scopes ===

test("nested if blocks create separate scopes", () => {
  const source = `if (a):
  if (b):
    set z = 1`;
  const js = compile(source);
  assertEqual(js, `'use strict';
if (a) {
  if (b) {
    let z = 1;
  }
}`);
});

test("nested function creates new scope", () => {
  const source = `function outer():
  set x = 1
  function inner():
    x = 2
    return x
  return inner()`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function outer() {
  let x = 1;
  function inner() {
    x = 2;
    return x;
  }
  return inner();
}`);
});

// === Mixed Scenarios ===

test("function with for loop and variable reassignment", () => {
  const source = `function total(arr):
  set sum = 0
  for item in arr:
    sum = sum + item
  return sum`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function total(arr) {
  let sum = 0;
  for (let item of arr) {
    sum = sum + item;
  }
  return sum;
}`);
});

test("if block with for loop", () => {
  const source = `if (true):
  for i in range(5):
    console.log(i)`;
  const js = compile(source);
  assertEqual(js, `'use strict';
if (true) {
  for (let i = 0; i < 5; i = i + 1) {
    console.log(i);
  }
}`);
});

test("global reassignment after function", () => {
  const source = `function foo():
  return 10
set x = foo()
x = x + 1`;
  const js = compile(source);
  assertEqual(js, `'use strict';
function foo() {
  return 10;
}
let x = foo();
x = x + 1;`);
});

// === Phase 10 Checkpoint ===

console.log("\nAll Phase 10 variable semantics tests passed!");
