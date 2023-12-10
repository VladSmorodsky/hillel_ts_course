"use strict";
exports.__esModule = true;
exports.Figure = void 0;
var Figure = /** @class */ (function () {
    function Figure(name, color, a, b, c) {
        this.name = name;
        this.color = color;
        this.a = a;
        if (b) {
            this.b = b;
        }
        if (c) {
            this.c = c;
        }
    }
    return Figure;
}());
exports.Figure = Figure;
