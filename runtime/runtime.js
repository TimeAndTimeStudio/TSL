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

let running = false;
let animationId = null;
let intervalId = null;

function stopLoop() {
    running = false;
    if (animationId !== null) {
        if (typeof cancelAnimationFrame === 'function') {
            cancelAnimationFrame(animationId);
        }
        animationId = null;
    }
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function frameLoop(update, draw) {
    if (!running) return;

    if (typeof update === 'function') {
        update();
    }

    if (typeof draw === 'function') {
        draw();
    }
}

function startLoop(module) {
    stopLoop();
    running = true;
    const update = module && module.update;
    const draw = module && module.draw;

    if (typeof requestAnimationFrame === 'function') {
        animationId = requestAnimationFrame(frameLoop);
    } else if (typeof setInterval === 'function') {
        intervalId = setInterval(frameLoop, 1000 / 60);
    }
}

function run(module) {
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        const update = module && module.update;
        const draw = module && module.draw;

        if (typeof update === 'function') {
            update();
        }

        if (typeof draw === 'function') {
            draw();
        }

        return { update, draw };
    }

    startLoop(module);
    return { update: module && module.update, draw: module && module.draw };
}

module.exports = {
    print,
    range,
    clear,
    draw_rect,
    draw_circle,
    draw_line,
    run,
    startLoop,
    stopLoop,
};
