import {Figure} from "./Figure";

export class Circle extends Figure {
  constructor(name: string, color: string, a: number) {
    super(name, color, a);
  }

  calculateArea(): number {
    return Math.PI * this.a * this.a;
  }
}
