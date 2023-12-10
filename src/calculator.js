var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (value1, value2) {
        return value1 + value2;
    };
    Calculator.prototype.divide = function (value1, value2) {
        return value1 / value2;
    };
    Calculator.prototype.multiply = function (value1, value2) {
        return value1 * value2;
    };
    Calculator.prototype.subtract = function (value1, value2) {
        return value1 - value2;
    };
    return Calculator;
}());
function calculate(calculator, value1, value2, operation) {
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
var OperationEnum;
(function (OperationEnum) {
    OperationEnum["ADD"] = "+";
    OperationEnum["SUB"] = "-";
    OperationEnum["MUL"] = "*";
    OperationEnum["DIVISION"] = "/";
})(OperationEnum || (OperationEnum = {}));
var calculator = new Calculator();
var value1 = 5;
var value2 = 5;
var multiplyResult = calculate(calculator, value1, value2, OperationEnum.MUL);
