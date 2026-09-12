'use strict';

function print(value) {
    console.log(value);
}

function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}

function clear() {
    console.log('[Engine] Clearing canvas');
}

function draw_rect(x, y, width, height) {
    console.log(`[Engine] draw_rect(${x}, ${y}, ${width}, ${height})`);
}

function draw_circle(x, y, radius) {
    console.log(`[Engine] draw_circle(${x}, ${y}, ${radius})`);
}

function draw_line(x1, y1, x2, y2) {
    console.log(`[Engine] draw_line(${x1}, ${y1}, ${x2}, ${y2})`);
}

module.exports = {
    print,
    range,
    clear,
    draw_rect,
    draw_circle,
    draw_line,
};
