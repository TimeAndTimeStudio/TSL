const { print, range, clear, draw_rect, draw_circle, draw_line } = require("../../runtime/runtime.js");

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

// === Phase 14 — Engine API Tests ===

test("clear() does not throw", () => {
  clear();
});

test("draw_rect() does not throw", () => {
  draw_rect(10, 20, 50, 50);
});

test("draw_rect() with zero values does not throw", () => {
  draw_rect(0, 0, 0, 0);
});

test("draw_rect() with negative values does not throw", () => {
  draw_rect(-10, -20, 50, 50);
});

test("draw_circle() does not throw", () => {
  draw_circle(100, 100, 25);
});

test("draw_circle() with zero radius does not throw", () => {
  draw_circle(0, 0, 0);
});

test("draw_line() does not throw", () => {
  draw_line(0, 0, 100, 100);
});

test("draw_line() with same points does not throw", () => {
  draw_line(5, 5, 5, 5);
});

test("draw_line() with negative coordinates does not throw", () => {
  draw_line(-10, -10, 10, 10);
});

// === Phase 15 — Render Loop Tests ===

const { run, startLoop, stopLoop } = require("../../runtime/runtime.js");

test("run() with empty module does not throw", () => {
  const result = run({});
  assertEqual(result.update, undefined);
  assertEqual(result.draw, undefined);
});

test("run() with update function calls update", () => {
  let called = false;
  const mod = {
    update: () => { called = true; },
  };
  run(mod);
  assertEqual(called, true);
});

test("run() with draw function calls draw", () => {
  let called = false;
  const mod = {
    draw: () => { called = true; },
  };
  run(mod);
  assertEqual(called, true);
});

test("run() with both update and draw calls both", () => {
  let updateCalled = false;
  let drawCalled = false;
  const mod = {
    update: () => { updateCalled = true; },
    draw: () => { drawCalled = true; },
  };
  run(mod);
  assertEqual(updateCalled, true);
  assertEqual(drawCalled, true);
});

test("run() returns update and draw references", () => {
  const mod = {
    update: () => {},
    draw: () => {},
  };
  const result = run(mod);
  assertEqual(result.update, mod.update);
  assertEqual(result.draw, mod.draw);
});

test("run() with null module does not throw", () => {
  run(null);
});

test("run() with undefined module does not throw", () => {
  run(undefined);
});

test("startLoop() does not throw", () => {
  startLoop({});
});

test("stopLoop() does not throw", () => {
  stopLoop();
});

test("stopLoop() can be called multiple times", () => {
  stopLoop();
  stopLoop();
});

console.log("\nAll runtime tests passed!");
