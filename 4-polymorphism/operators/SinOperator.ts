import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { UnOperator } from "../operator";
import { RadianDegreeToggleOperator } from "./RadDegToggleOperator";
import { OperatorScale } from "./scale";

class SinOperator extends RadianDegreeToggleOperator implements UnOperator {
  calculate(firstOperand: number): number {
    const operand = super.calculate(firstOperand);
    return Math.sin(operand);
  }

  getHistoryText(firstOperand: number): string {
    return `sin(${super.getHistoryText(firstOperand)}) = ${this.calculate(firstOperand)}`;
  }

  getHistoryClass(): string {
    return `substract`;
  }
}

export class SinButton extends CalculatorButton {
  constructor(private model: CalculatorModel, private operatorScale: OperatorScale) {
    super("sin");
  }

  onClick() {
    this.model.addUnOperator(new SinOperator(this.operatorScale.getScale()));
  }
}
