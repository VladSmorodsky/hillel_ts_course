import {Figure} from "./Figure";
import {IFormula} from "../IFormula";

export class Rectangle extends Figure implements IFormula{
  constructor(name, color, a, b) {
    super(name, color, a, b);
  }

  calculateArea(): number {
    return this.a * this.b;
  }

  printFormula(): void {
    console.log(`a * b = ${this.a} * ${this.b}`);
  }
}
