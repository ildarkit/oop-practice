import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator, BiOperatorName} from "../operator";
import { registerOperator } from "./register";

class ModOperator implements BiOperator {
  public name: BiOperatorName = '%';

  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand % secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} %`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} % ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `divide`;
  }
}

export class ModButton extends CalculatorButton {
  private static operator = new ModOperator();

  constructor(private model: CalculatorModel) {
    super("mod");
    registerOperator({
      name: ModButton.operator.name,
      operator: ModButton.operator,
    });
  }

  onClick() {
    this.model.addBiOperator(ModButton.operator);
  }
}
