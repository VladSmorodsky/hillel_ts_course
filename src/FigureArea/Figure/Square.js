"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Square = void 0;
var Figure_1 = require("./Figure");
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(name, color, a) {
        return _super.call(this, name, color, a) || this;
    }
    Square.prototype.calculateArea = function () {
        return this.a * this.a;
    };
    Square.prototype.print = function () {
        console.log("a * a = ".concat(this.a, " * ").concat(this.a));
    };
    return Square;
}(Figure_1.Figure));
exports.Square = Square;
