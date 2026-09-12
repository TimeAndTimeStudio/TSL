const { strictEqual, ok } = require('assert');
const { print, range, clear, draw_rect, draw_circle, draw_line } = require('../../runtime/runtime.js');

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

// Test range function
test("range(0) returns empty array", () => {
  const result = range(0);
  strictEqual(result.length, 0);
  strictEqual(Array.isArray(result), true);
});

test("range(3) returns [0, 1, 2]", () => {
  const result = range(3);
  strictEqual(result.length, 3);
  strictEqual(result[0], 0);
  strictEqual(result[1], 1);
  strictEqual(result[2], 2);
});

test("range(5) returns [0, 1, 2, 3, 4]", () => {
  const result = range(5);
  strictEqual(result.length, 5);
  strictEqual(result[4], 4);
});

// Test print function (just verify it doesn't throw)
test("print() doesn't throw", () => {
  ok(print() === undefined);
  ok(print("test") === undefined);
  ok(print(1, 2, 3) === undefined);
});

// Test clear function (just verify it doesn't throw)
test("clear() doesn't throw", () => {
  ok(clear() === undefined);
});

// Test draw functions (just verify they don't throw)
test("draw_rect() doesn't throw", () => {
  ok(draw_rect(10, 20, 50, 50) === undefined);
});

test("draw_circle() doesn't throw", () => {
  ok(draw_circle(100, 100, 25) === undefined);
});

test("draw_line() doesn't throw", () => {
  ok(draw_line(0, 0, 200, 200) === undefined);
});

console.log('\nAll runtime tests passed!');
