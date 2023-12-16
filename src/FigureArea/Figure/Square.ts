import {Figure} from "./Figure";
import {IFormula} from "../IFormula";

export class Square extends Figure implements IFormula {
  constructor(public readonly name, public readonly color, private a: number) {
    super(name, color);
  }

  calculateArea(): number {
    return this.a * this.a;
  }

  print(): void {
    console.log(`a * a = ${this.a} * ${this.a}`);
  }
}
