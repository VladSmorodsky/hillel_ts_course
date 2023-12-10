import {Figure} from "./Figure";

export class Circle extends Figure {
  constructor(public readonly name: string, public readonly color: string, private radius: number) {
    super(name, color);
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
