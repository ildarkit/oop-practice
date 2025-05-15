import { injectCss } from "./utils";

export class CalculatorExpression {
  private root: HTMLDivElement;

  constructor() {
    this.root = this.createRoot();
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  public setOperator(firstOperand: number, operator: string) {
    this.root.innerText = `${firstOperand} ${operator}`;
  }

  public clear() {
    this.root.innerText = "";
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator_expression");
    root.innerText = "";
    return root;
  }

  private initCss() {
    injectCss(
      /* css*/ `
    .calculator_expression {
      font-size: 18px;
      color: #666;
      margin-bottom: 5px;
      min-height: 24px;
      padding: 5px 10px;
    }
          `,
      "calculator_expression"
    );
  }
}
