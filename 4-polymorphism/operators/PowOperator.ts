import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator, BiOperatorName } from "../operator";
import { registerOperator } from "./register";

class PowOperator implements BiOperator {
  public name: BiOperatorName = 'pow';

  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand ** secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} **`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} ** ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `multiply`;
  }
}

export class PowButton extends CalculatorButton {
  private static operator = new PowOperator();

  constructor(private model: CalculatorModel) {
    super("^");
    registerOperator({
      name: PowButton.operator.name,
      operator: PowButton.operator,
    });
  }

  onClick() {
    this.model.addBiOperator(PowButton.operator);
  }
}
