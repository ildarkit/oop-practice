import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator, BiOperatorName } from "../operator";
import { registerOperator } from "./register";

class MultiplyOperator implements BiOperator {
  public name: BiOperatorName = 'multiply';

  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand * secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} *`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} * ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `multiply`;
  }
}

export class MultiplyButton extends CalculatorButton {
  private static operator = new MultiplyOperator();

  constructor(private model: CalculatorModel) {
    super("*");
    registerOperator({
      name: MultiplyButton.operator.name,
      operator: MultiplyButton.operator,
    });
  }

  onClick() {
    this.model.addBiOperator(MultiplyButton.operator);
  }
}
