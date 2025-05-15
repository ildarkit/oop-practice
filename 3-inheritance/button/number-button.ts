import type { CalculatorModel } from "../calculator-model";
import { CalculatorButton } from "./calculator-button";

export class NumberButton extends CalculatorButton {
  constructor(digit: string, model: CalculatorModel) {
    super(digit);
    super.onClick(() => model.addDigit(digit));
  }
}
