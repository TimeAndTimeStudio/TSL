'use strict';

function print(value) {
    console.log(value);
}

function range(n) {
    return Array.from({ length: n }, (_, i) => i);
}

module.exports = {
    print,
    range,
};
