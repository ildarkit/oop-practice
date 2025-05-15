import { createElementFromHTML, injectCss } from "./utils";

export class CalculatorHistory {
  private root: HTMLDivElement;

  constructor() {
    this.root = this.createRoot();
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  public addOperation(
    firstOperand: number,
    operator: string,
    secondOperand: number,
    result: number
  ) {
    let modif = "";

    switch (operator) {
      case "+":
        modif = "add";
        break;
      case "-":
        modif = "subtract";
        break;
      case "/":
        modif = "divide";
        break;
      case "*":
        modif = "multiply";
        break;
      default:
        return;
    }

    const historyItem = createElementFromHTML(/*html*/ `
      <div class="calculator_history-item ${modif}">
        ${firstOperand} ${operator} ${secondOperand} = ${result}
      </div>
      `);

    this.root.append(historyItem);
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator_history");
    root.innerText = "";
    return root;
  }

  private initCss() {
    injectCss(
      /* css*/ `
      .calculator_history {
        margin-top: 20px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 3px;
        min-height: 100px;
      }
      .calculator_history-item {
        padding: 5px;
        margin: 2px 0;
        border-radius: 3px;
      }
      .calculator_history-item.add {
        color: #2ecc71;
      }
      .calculator_history-item.subtract {
        color: #e74c3c;
      }
      .calculator_history-item.multiply {
        color: #3498db;
      }
      .calculator_history-item.divide {
        color: #9b59b6;
      }
      .calculator_history-item.error {
        color: #e74c3c;
        font-weight: bold;
      }
          `,
      "calculator_history"
    );
  }
}
