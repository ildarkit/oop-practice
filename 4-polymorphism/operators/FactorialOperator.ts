import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { UnOperator } from "../operator";

class FactorialOperator implements UnOperator {
  calculate(firstOperand: number): number {
    return factorial(firstOperand);
  }

  getHistoryText(firstOperand: number): string {
    return `(${firstOperand})! = ${this.calculate(firstOperand)}`;
  }

  getHistoryClass(): string {
    return `substract`;
  }
}

export class FactorialButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super("n!");
  }

  onClick() {
    this.model.addUnOperator(new FactorialOperator());
  }
}

function factorial(num: number): number {
  let n = 1;
  for (let i = 1; i <= num; i++) {
    n = i * n;
  }
  return n;
}
