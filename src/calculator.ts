interface ICalculator {
  add(value1: number, value2: number): number

  subtract(value1: number, value2: number): number

  multiply(value1: number, value2: number): number

  divide(value1: number, value2: number): number
}

class Calculator implements ICalculator {
  add(value1: number, value2: number): number {
    return value1 + value2;
  }

  divide(value1: number, value2: number): number {
    return value1 / value2;
  }

  multiply(value1: number, value2: number): number {
    return value1 * value2;
  }

  subtract(value1: number, value2: number): number {
    return value1 - value2;
  }
}

function calculate(calculator: ICalculator, value1: number, value2: number, operation: OperationEnum): number {
  switch (operation) {
    case OperationEnum.ADD:
      return calculator.add(value1, value2);
    case OperationEnum.SUB:
      return calculator.subtract(value1, value2);
    case OperationEnum.MUL:
      return calculator.multiply(value1, value2);
    case OperationEnum.DIVISION:
      return calculator.divide(value1, value2);
    default:
      return 0;
  }

}

enum OperationEnum {
  'ADD' = '+',
  'SUB' = '-',
  'MUL' = '*',
  'DIVISION' = '/'
}

const calculator: Calculator = new Calculator();
let value1: number = 5;
let value2: number = 5;

const multiplyResult = calculate(calculator, value1, value2, OperationEnum.MUL);
