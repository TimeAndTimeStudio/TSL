/**
 * TSL Runtime — minimal helpers
 * Only what JavaScript doesn't provide and TSL needs.
 */

/**
 * Print a value to stdout.
 * @param {...*} args
 */
function print(...args) {
  console.log(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
}

/**
 * Generate a range of integers from 0 to n (exclusive).
 * @param {number} n
 * @returns {number[]}
 */
function range(n) {
  const arr = [];
  let i = 0;
  while (i < n) {
    arr[i] = i;
    i = i + 1;
  }
  return arr;
}

/**
 * Clear the terminal screen.
 */
function clear() {
  process.stdout.write('\x1Bc');
}

/**
 * Draw a rectangle on the terminal.
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function draw_rect(x, y, width, height) {
  console.log(`[draw_rect] x=${x}, y=${y}, w=${width}, h=${height}`);
}

/**
 * Draw a circle on the terminal.
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 */
function draw_circle(cx, cy, radius) {
  console.log(`[draw_circle] cx=${cx}, cy=${cy}, r=${radius}`);
}

/**
 * Draw a line on the terminal.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function draw_line(x1, y1, x2, y2) {
  console.log(`[draw_line] (${x1},${y1}) → (${x2},${y2})`);
}

module.exports = {
  print,
  range,
  clear,
  draw_rect,
  draw_circle,
  draw_line,
};
