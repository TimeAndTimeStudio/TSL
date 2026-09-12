const { print, range } = require("../../runtime/runtime.js");

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
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// range() tests

test("range(0) returns empty array", () => {
  const result = range(0);
  assertEqual(result, []);
});

test("range(1) returns [0]", () => {
  const result = range(1);
  assertEqual(result, [0]);
});

test("range(5) returns [0, 1, 2, 3, 4]", () => {
  const result = range(5);
  assertEqual(result, [0, 1, 2, 3, 4]);
});

test("range(10) returns [0..9]", () => {
  const result = range(10);
  assertEqual(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("range returns array with correct length", () => {
  const result = range(100);
  assertEqual(result.length, 100);
});

test("range returns array with correct values", () => {
  const result = range(5);
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== i) {
      throw new Error(`range[${i}] expected ${i}, got ${result[i]}`);
    }
  }
});

// print() tests

test("print() does not throw", () => {
  print();
});

test("print(number) does not throw", () => {
  print(42);
});

test("print(string) does not throw", () => {
  print("hello");
});

test("print(null) does not throw", () => {
  print(null);
});

test("print(undefined) does not throw", () => {
  print(undefined);
});

test("print(array) does not throw", () => {
  print([1, 2, 3]);
});

test("print(object) does not throw", () => {
  print({ x: 1 });
});

test("print(boolean) does not throw", () => {
  print(true);
  print(false);
});

// Integration: range with for-of loop
test("range works with for-of iteration", () => {
  const result = [];
  for (const i of range(3)) {
    result.push(i);
  }
  assertEqual(result, [0, 1, 2]);
});

console.log("\nAll runtime tests passed!");
