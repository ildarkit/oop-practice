import type { CalculatorSubscriber } from "./calculator-subscriber";
import type { BiOperator } from "./operator";
import type { HistoryData } from "./storage";
import type { HistoryStorageSubscriber } from "./history";
import { BaseCalculatorSubscriber } from "./calculator-subscriber";
import { injectCss } from "./utils";

export class CalculatorExpression {
  private root: HTMLDivElement;

  public readonly subscriber = new ExpresssionSubscriber(this);
  public readonly historyStorageSubscriber = new HistoryExpressionSubscriber(this);

  constructor() {
    this.root = this.createRoot();
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  public setOperator(firstOperand: number, operator: BiOperator) {
    this.root.innerText = operator.getExpression(firstOperand);
  }

  public restoreStorageHistory(expressions: string[]) {
    if (expressions.length === 2)
      this.root.innerText = expressions.join(' ');
    else if (expressions.length === 3) {
      this.root.innerText = expressions.slice(
        0,
        expressions.length - 1
      ).join(' ');
    }
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

class ExpresssionSubscriber
  extends BaseCalculatorSubscriber
  implements CalculatorSubscriber
{
  constructor(private expresssion: CalculatorExpression) {
    super();
  }

  biOperatorAdded(operator: BiOperator, operand: number): void {
    this.expresssion.setOperator(operand, operator);
  }

  biOperatorCalculated(): void {
    this.expresssion.clear();
  }

  cleared(): void {
    this.expresssion.clear();
  }
}

class HistoryExpressionSubscriber implements HistoryStorageSubscriber {
  constructor(private expression: CalculatorExpression) {}

  getHistory(data: HistoryData): void {
    this.expression.restoreStorageHistory(data.events);
  }
}
