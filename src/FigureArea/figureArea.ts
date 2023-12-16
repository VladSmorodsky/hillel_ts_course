import {Square} from "./Figure/Square";
import {Circle} from "./Figure/Circle";
import {Rectangle} from "./Figure/Rectangle";
import {Triangle} from "./Figure/Triangle";

const square = new Square('Square', 'blue', 5);
square.print();
console.log(square.calculateArea());

const circle = new Circle('Circle', 'turquoise', 6);
console.log(circle.calculateArea());

const rec = new Rectangle('Rectangle', 'green', 5, 8);
rec.print();
console.log(rec.calculateArea());

const triangle = new Triangle('Triangle', 'red', 3, 4, 5)
console.log(triangle.calculateArea());