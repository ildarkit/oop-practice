import { CalculatorButton } from "./button/calculator-button";
import { ClearButton } from "./button/clear-button";
import { NumberButton } from "./button/number-button";

import { ProcessButton } from "./button/process-button";
import { CalculatorDisplay } from "./calculator-display";
import { CalculatorExpression } from "./calculator-expression";
import { CalculatorHistory } from "./calculator-history";
import { CalculatorModel } from "./calculator-model";
import { AddButton } from "./operators/AddOperator";
import { CosButton } from "./operators/CosOperator";
import { SinButton } from "./operators/SinOperator";
import { DivideButton } from "./operators/DivideOperator";
import { ModButton } from "./operators/ModOperator";
import { FactorialButton } from "./operators/FactorialOperator";
import { LogButton } from "./operators/LogOperator";
import { MultiplyButton } from "./operators/MultiplyOperator";
import { PowButton } from "./operators/PowOperator";
import { SubscractButton } from "./operators/SubscractOperator";
import { injectCss } from "./utils";

class Calculator {
  private root: HTMLDivElement;
  private display: CalculatorDisplay;
  private expression: CalculatorExpression;
  private model: CalculatorModel;
  private history: CalculatorHistory;
  private buttons: CalculatorButton[];

  constructor() {
    this.display = new CalculatorDisplay();
    this.expression = new CalculatorExpression();
    this.history = new CalculatorHistory();
    this.model = new CalculatorModel();

    this.model.addSubscriber(this.display.subscriber);
    this.model.addSubscriber(this.expression.subscriber);
    this.model.addSubscriber(this.history.subscriber);

    /* prettier-ignore */
    this.buttons = [
      // 1 row
      new NumberButton("1", this.model),
      new NumberButton("2", this.model),
      new NumberButton("3", this.model),
      new SubscractButton(this.model),
      // 2 row
      new NumberButton("4", this.model),
      new NumberButton("5", this.model),
      new NumberButton("6", this.model),
      new AddButton(this.model),
      // 3 row
      new NumberButton("7", this.model),
      new NumberButton("8", this.model),
      new NumberButton("9", this.model),
      new DivideButton(this.model),
      // 4 row
      new NumberButton("0", this.model),
      new CosButton(this.model),
      new SinButton(this.model),
      new MultiplyButton(this.model),
      // 5 row
      new PowButton(this.model),
      new ModButton(this.model),
      new ClearButton(this.model),
      new ProcessButton(this.model),
      // 6 row
      new FactorialButton(this.model),
      new LogButton(this.model),
    ];

    this.root = this.createRoot();
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator");

    this.expression.renderTo(root);
    this.display.renderTo(root);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("calculator_buttons");

    this.buttons.forEach((button) => {
      button.renderTo(buttonsContainer);
    });

    root.append(buttonsContainer);

    this.history.renderTo(root);

    return root;
  }

  private initCss() {
    injectCss(
      /* css*/ `
      .calculator {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
      }

      .calculator_buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 10px 0;
      }
        `,
      "calculator"
    );
  }
}

const calculator1 = new Calculator();
calculator1.renderTo(document.body);

const calculator2 = new Calculator();
calculator2.renderTo(document.body);
