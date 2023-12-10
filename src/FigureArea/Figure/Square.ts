import {Figure} from "./Figure";
import {IFormula} from "../IFormula";

export class Square extends Figure implements IFormula {
  constructor(name: string, color: string, a: number) {
    super(name, color, a);
  }

  calculateArea(): number {
    return this.a * this.a;
  }

  printFormula(): void {
    console.log(`a * a = ${this.a} * ${this.a}`);
  }
}