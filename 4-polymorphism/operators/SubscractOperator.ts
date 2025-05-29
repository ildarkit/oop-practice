import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator, BiOperatorName } from "../operator";
import { registerOperator } from "./register";

class SubscractOperator implements BiOperator {
  public name: BiOperatorName = '-';

  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand - secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} -`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} - ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `substract`;
  }
}

export class SubscractButton extends CalculatorButton {
  private static operator = new SubscractOperator();

  constructor(private model: CalculatorModel) {
    super("-");
    registerOperator({
      name: SubscractButton.operator.name,
      operator: SubscractButton.operator,
    });
  }

  onClick() {
    this.model.addBiOperator(SubscractButton.operator);
  }
}
