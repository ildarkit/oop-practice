import type { CalculatorModel } from "../calculator-model";
import { injectCss } from "../utils";
import { CalculatorButton } from "./calculator-button";

export class ClearButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super("C");
    super.addClass("clear_calculator_button");
    super.onClick(() => {
      const isConfirm = confirm("Вы действительно?*");

      if (isConfirm) {
        model.clear();
      }
    });
  }

  protected initCss(): void {
    super.initCss();
    injectCss(
      /*css*/ `
      .clear_calculator_button {
        background: gray;
      }
      `,
      "clear_calculator_button"
    );
  }
}
