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
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(name, color, a) {
        return _super.call(this, name, color, a) || this;
    }
    Square.prototype.calculateArea = function () {
        return this.a * this.a;
    };
    return Square;
}(Figure));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(name, color, a) {
        return _super.call(this, name, color, a) || this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * this.a * this.a;
    };
    return Circle;
}(Figure));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(name, color, a, b) {
        return _super.call(this, name, color, a, b) || this;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.a * this.b;
    };
    return Rectangle;
}(Figure));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(name, color, a, b, c) {
        return _super.call(this, name, color, a, b, c) || this;
    }
    Triangle.prototype.calculateArea = function () {
        var p = (this.a + this.b + this.c) / 2;
        return Math.sqrt((p * (p - this.a) * (p - this.b) * (p - this.c)));
    };
    return Triangle;
}(Figure));
var square = new Square('Square', 'blue', 5);
console.log(square.calculateArea());
var circle = new Circle('Circle', 'turquoise', 6);
console.log(circle.calculateArea());
var rec = new Rectangle('Rectangle', 'green', 5, 8);
console.log(rec.calculateArea());
var triangle = new Triangle('Triangle', 'red', 3, 4, 5);
console.log(triangle.calculateArea());
