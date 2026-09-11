const { tokenize } = require("../../src/lexer");
const { createParser } = require("../../src/parser");
const { createValidator } = require("../../src/validator");
const { createGenerator } = require("../../src/generator");
const { Program, Location } = require("../../src/ast");

function compile(source) {
  const tokens = tokenize(source, "<test>");
  const parser = createParser(tokens, "<test>");
  const statements = parser.parseStatements();
  const loc = new Location(1, 0, 1, 0);
  const ast = Program(statements, loc);
  const validator = createValidator();
  validator.validate(ast);
  const generator = createGenerator();
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

// Literals
test("generates string literal", () => {
  const js = compile(`print("hello")`);
  assertEqual(js, `print("hello");`);
});

test("generates number literal", () => {
  const js = compile(`print(42)`);
  assertEqual(js, `print(42);`);
});

test("generates boolean literals", () => {
  const js = compile(`print(true)\nprint(false)`);
  assertEqual(js, `print(true);\nprint(false);`);
});

test("generates null literal", () => {
  const js = compile(`print(null)`);
  assertEqual(js, `print(null);`);
});

// Identifiers
test("generates identifier", () => {
  const js = compile(`x`);
  assertEqual(js, `x;`);
});

test("generates variable declaration", () => {
  const js = compile(`x = 10`);
  assertEqual(js, `let x = 10;`);
});

// Binary expressions
test("generates binary addition", () => {
  const js = compile(`x = 1 + 2`);
  assertEqual(js, `let x = (1 + 2);`);
});

test("generates binary subtraction", () => {
  const js = compile(`x = 5 - 3`);
  assertEqual(js, `let x = (5 - 3);`);
});

test("generates binary multiplication", () => {
  const js = compile(`x = 3 * 4`);
  assertEqual(js, `let x = (3 * 4);`);
});

test("generates binary division", () => {
  const js = compile(`x = 10 / 2`);
  assertEqual(js, `let x = (10 / 2);`);
});

test("generates binary modulo", () => {
  const js = compile(`x = 10 % 3`);
  assertEqual(js, `let x = (10 % 3);`);
});

test("generates binary comparisons", () => {
  const js = compile(`x = 1 == 2\ny = 3 != 4\nz = 5 > 3`);
  assertEqual(js, `let x = (1 == 2);\nlet y = (3 != 4);\nlet z = (5 > 3);`);
});

test("generates binary logical operators", () => {
  const js = compile(`x = true and false\ny = true or false`);
  assertEqual(js, `let x = (true and false);\nlet y = (true or false);`);
});

// Unary expressions
test("generates unary not", () => {
  const js = compile(`x = not true`);
  assertEqual(js, `let x = (not true);`);
});

// Assignment
test("generates simple assignment", () => {
  const js = compile(`x = 10\nx = 20`);
  assertEqual(js, `let x = 10;\nx = 20;`);
});



// Function calls
test("generates function call with no arguments", () => {
  const js = compile(`foo()`);
  assertEqual(js, `foo();`);
});

test("generates function call with arguments", () => {
  const js = compile(`foo(1, 2, 3)`);
  assertEqual(js, `foo(1, 2, 3);`);
});

test("generates nested function calls", () => {
  const js = compile(`foo(bar(1))`);
  assertEqual(js, `foo(bar(1));`);
});

// Arrays
test("generates array literal", () => {
  const js = compile(`x = [1, 2, 3]`);
  assertEqual(js, `let x = [1, 2, 3];`);
});

test("generates empty array", () => {
  const js = compile(`x = []`);
  assertEqual(js, `let x = [];`);
});

// Objects
test("generates object literal", () => {
  const js = compile(`x = { a: 1, b: 2 }`);
  assertEqual(js, `let x = { a: 1, b: 2 };`);
});

test("generates empty object", () => {
  const js = compile(`x = {}`);
  assertEqual(js, `let x = {  };`);
});

// Control flow - if
test("generates if statement", () => {
  const source = `if (true):
  print(1)`;
  const js = compile(source);
  assertEqual(js, `if (true) {\n  print(1);\n}`);
});

test("generates if-else statement", () => {
  const source = `if (true):
  print(1)
else:
  print(2)`;
  const js = compile(source);
  assertEqual(js, `if (true) {\n  print(1);\n} else {\n  print(2);\n}`);
});

// Control flow - while
test("generates while loop", () => {
  const source = `while (true):
  print(1)`;
  const js = compile(source);
  assertEqual(js, `while (true) {\n  print(1);\n}`);
});

// Control flow - for
test("generates for loop", () => {
  const source = `for i in items:
  print(i)`;
  const js = compile(source);
  assertEqual(js, `for (let i of items) {\n  print(i);\n}`);
});

// Return
test("generates return statement", () => {
  const source = `function foo():
  return 42`;
  const validator = createValidator();
  const tokens = tokenize(source, '<test>');
  const parser = createParser(tokens, '<test>');
  const statements = parser.parseStatements();
  const loc = new Location(1, 0, 1, 0);
  const ast = Program(statements, loc);
  validator.validate(ast);
  const generator = createGenerator();
  const js = generator.generate(ast);
  assertEqual(js, `function foo() {\n  return 42;\n}`);
});

// Multi-statement program
test("generates multi-statement program", () => {
  const source = `x = 10
y = 20
print(x + y)`;
  const js = compile(source);
  assertEqual(js, `let x = 10;\nlet y = 20;\nprint((x + y));`);
});

// Full pipeline with function definition
test("generates function definition", () => {
  const source = `function add(a, b):
  return a + b`;
  const js = compile(source);
  assertEqual(js, `function add(a, b) {\n  return (a + b);\n}`);
});

// Function call with complex expressions
test("generates function call with complex arguments", () => {
  const js = compile(`foo(1 + 2, 3 * 4)`);
  assertEqual(js, `foo((1 + 2), (3 * 4));`);
});

// Member access
test("generates member access", () => {
  const js = compile(`obj.prop`);
  assertEqual(js, `obj.prop;`);
});

test("generates member function call", () => {
  const js = compile(`obj.method(1)`);
  assertEqual(js, `obj.method(1);`);
});

// Break and continue
test("generates break statement", () => {
  const source = `while (true):
  break`;
  const js = compile(source);
  assertEqual(js, `while (true) {\n  break;\n}`);
});

test("generates continue statement", () => {
  const source = `while (true):
  continue`;
  const js = compile(source);
  assertEqual(js, `while (true) {\n  continue;\n}`);
});

// Block statements


// Empty statement
// Variable declaration without init
test("generates variable declaration without init", () => {
  const js = compile(`x = undefined`);
  assertEqual(js, `let x = undefined;`);
});

// Multiple variable declarations
test("generates multiple variable declarations", () => {
  const source = `x = 1
y = 2
z = 3`;
  const js = compile(source);
  assertEqual(js, `let x = 1;\nlet y = 2;\nlet z = 3;`);
});

// Nested expressions
test("generates nested binary expressions", () => {
  const js = compile(`x = 1 + 2 * 3`);
  assertEqual(js, `let x = (1 + (2 * 3));`);
});

test("generates parenthesized expressions", () => {
  const js = compile(`x = (1 + 2) * 3`);
  assertEqual(js, `let x = ((1 + 2) * 3);`);
});

// String concatenation in print
test("generates string in print", () => {
  const js = compile(`print("hello world")`);
  assertEqual(js, `print("hello world");`);
});

// Number operations
test("generates number operations", () => {
  const js = compile(`x = 10 - 5 / 2`);
  assertEqual(js, `let x = (10 - (5 / 2));`);
});

// Boolean operations
test("generates boolean operations", () => {
  const js = compile(`x = true and false or true`);
  assertEqual(js, `let x = ((true and false) or true);`);
});

// Null handling
test("generates null in expression", () => {
  const js = compile(`x = null`);
  assertEqual(js, `let x = null;`);
});

// Empty program
test("generates empty program", () => {
  const js = compile(``);
  assertEqual(js, ``);
});

// Semicolons
// Comments
test("strips line comments", () => {
  const js = compile(`# comment\nx = 1`);
  assertEqual(js, `let x = 1;`);
});

test("strips block comments", () => {
  const source = `# block
x = 1`;
  const js = compile(source);
  assertEqual(js, `let x = 1;`);
});

test("strips inline block comments", () => {
  const source = `x = 1 # comment`;
  const js = compile(source);
  assertEqual(js, `let x = 1;`);
});

console.log("\nAll generator tests passed!");
