import {Figure} from "./Figure";

export class Triangle extends Figure {
  constructor(
    public readonly name,
    public readonly color,
    private a: number,
    private b: number,
    private c: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    const p = (this.a + this.b + this.c) / 2;

    return Math.sqrt((p * (p - this.a) * (p - this.b) * (p - this.c)));
  }
}
