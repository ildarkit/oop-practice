import { CalculatorButton } from "../button/calculator-button";
import type { UnOperator } from "../operator";
import { OperatorScale } from './scale';

type Scale = 'rad' | 'deg';

export class RadianDegreeToggleOperator implements UnOperator {
  constructor(private scale: Scale) {}

  calculate(firstOperand: number): number {
    let result = firstOperand;
    if (this.scale === 'deg')
      result = firstOperand * Math.PI / 180;
    return result;
  }

  getHistoryText(firstOperand: number): string {
    return `${firstOperand} ${this.scale}`;
  }

  getHistoryClass(): string {
    return `substract`;
  }
}

export class RadianDegreeToggleButton extends CalculatorButton {
  constructor(private operatorScale: OperatorScale) {
    super("rad");
  }

  onClick() {
    this.operatorScale.toggleScale();
    this.setText(this.operatorScale.getScale());
  }
}
