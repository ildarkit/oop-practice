import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator, BiOperatorName } from "../operator";
import { registerOperator } from "./register";

class AddOperator implements BiOperator {
  public name: BiOperatorName = '+';

  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand + secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} +`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} + ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `add`;
  }
}

export class AddButton extends CalculatorButton {
  private static operator = new AddOperator();

  constructor(private model: CalculatorModel) {
    super("+");
    registerOperator({
      name: AddButton.operator.name,
      operator: AddButton.operator,
    });
  }

  onClick() {
    this.model.addBiOperator(AddButton.operator);
  }
}
