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
exports.Rectangle = void 0;
var Figure_1 = require("./Figure");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(name, color, a, b) {
        return _super.call(this, name, color, a, b) || this;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.a * this.b;
    };
    Rectangle.prototype.printFormula = function () {
        console.log("a * b = ".concat(this.a, " * ").concat(this.b));
    };
    return Rectangle;
}(Figure_1.Figure));
exports.Rectangle = Rectangle;
