import type { CalculatorModel } from "../calculator-model";
import { injectCss } from "../utils";
import { CalculatorButton } from "./calculator-button";

export class ProcessButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super("=");
    this.addClass("process_calculator_button");
    this.onClick(() => {
      if (model.canProcess()) {
        model.processCaclucation();
      } else {
        alert("Can not process");
      }
    });
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
