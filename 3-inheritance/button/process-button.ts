import type { CalculatorModel } from "../calculator-model";
import { injectCss } from "../utils";
import { CalculatorButton } from "./calculator-button";

export class ProcessButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super("=");
    super.addClass("process_calculator_button");
    super.onClick(() => model.processCaclucation());
  }

  protected initCss(): void {
    super.initCss();
    injectCss(
      /*css*/ `
      .process_calculator_button {
        background: red;
      }
      `,
      "process_calculator_button"
    );
  }
}
