import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { UnOperator } from "../operator";

class LogOperator implements UnOperator {
  calculate(firstOperand: number): number {
    return Math.log10(firstOperand);
  }

  getHistoryText(firstOperand: number): string {
    return `log(${firstOperand}) = ${this.calculate(firstOperand)}`;
  }

  getHistoryClass(): string {
    return `multiply`;
  }
}
  
export class LogButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super("log");
  }

  onClick() {
    this.model.addUnOperator(new LogOperator());
  }
}
