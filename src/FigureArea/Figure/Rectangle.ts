import {Figure} from "./Figure";
import {IFormula} from "../IFormula";

export class Rectangle extends Figure implements IFormula{
  constructor(public readonly name, public readonly color, private a: number, private b: number) {
    super(name, color);
  }

  calculateArea(): number {
    return this.a * this.b;
  }

  print(): void {
    console.log(`a * b = ${this.a} * ${this.b}`);
  }
}
