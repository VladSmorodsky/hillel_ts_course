import {Figure} from "./Figure";

export class Triangle extends Figure {
  constructor(name, color, a, b, c) {
    super(name, color, a, b, c);
  }

  calculateArea(): number {
    const p = (this.a + this.b + this.c) / 2;

    return Math.sqrt((p * (p - this.a) * (p - this.b) * (p - this.c)));
  }
}
