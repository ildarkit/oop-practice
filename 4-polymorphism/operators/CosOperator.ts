import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { UnOperator } from "../operator";
import { RadianDegreeToggleOperator } from "./RadDegToggleOperator";
import { OperatorScale } from './scale';

class CosOperator extends RadianDegreeToggleOperator implements UnOperator {
  calculate(firstOperand: number): number {
    const operand = super.calculate(firstOperand);
    return Math.cos(operand);
  }

  getHistoryText(firstOperand: number): string {
    return `cos(${super.getHistoryText(firstOperand)}) = ${this.calculate(firstOperand)}`;
  }

  getHistoryClass(): string {
    return `substract`;
  }
}

export class CosButton extends CalculatorButton {
  constructor(private model: CalculatorModel, private operatorScale: OperatorScale) {
    super("cos");
  }

  onClick() {
    this.model.addUnOperator(new CosOperator(this.operatorScale.getScale()));
  }
}
