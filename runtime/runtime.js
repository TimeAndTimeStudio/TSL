'use strict';

let canvas = null;
let ctx = null;
let canvasWidth = 800;
let canvasHeight = 600;

function initCanvas(width, height) {
    if (typeof document !== 'undefined') {
        canvas = document.createElement('canvas');
        canvas.width = width || 800;
        canvas.height = height || 600;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
    }
    return { width: canvasWidth, height: canvasHeight };
}

function getCanvas() {
    return canvas;
}

function getCtx() {
    return ctx;
}

function setCanvasSize(width, height) {
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        canvasWidth = width;
        canvasHeight = height;
    }
}

function print(value) {
    if (typeof console !== 'undefined') {
        console.log(value);
    }
    if (typeof document !== 'undefined' && canvas) {
        // Could add console to canvas here if needed
    }
}

function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}

function clear() {
    if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
}

function draw_rect(x, y, width, height) {
    if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, width, height);
    }
}

function draw_circle(x, y, radius) {
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
    }
}

function draw_line(x1, y1, x2, y2) {
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
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
    initCanvas,
    getCanvas,
    getCtx,
    setCanvasSize,
};
