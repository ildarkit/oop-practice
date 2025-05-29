import type { CalculatorSubscriber } from "./calculator-subscriber";
import type { BiOperator, UnOperator } from "./operator";
import type { HistoryStorageSubscriber } from "./history";
import type { HistoryData } from "./storage";
import { getOperator } from "./operators/register";

export class CalculatorModel {
  private firstOperand: number | null = null;
  private operator: BiOperator | null = null;
  private secondOperand: number | null = null;
  private subscribers: CalculatorSubscriber[] = [];
  public readonly historyStorageSubscriber = new HistoryExpressionSubscriber(this);

  public addSubscriber(subs: CalculatorSubscriber) {
    this.subscribers.push(subs);
  }

  public addDigit(digitText: string) {
    if (this.operator === null) {
      const firstOperand = parseInt(`${this.firstOperand ?? ""}${digitText}`);
      this.firstOperand = firstOperand;
      this.subscribers.forEach((s) =>
        s.currentOperandUpdated(firstOperand, "first")
      );
    } else {
      const secondOperand = parseInt(`${this.secondOperand ?? ""}${digitText}`);
      this.secondOperand = secondOperand;
      this.subscribers.forEach((s) =>
        s.currentOperandUpdated(secondOperand, "second")
      );
    }
  }

  public addBiOperator(operator: BiOperator) {
    if (this.firstOperand && this.operator && this.secondOperand) {
      this.processCalculation();
      this.addBiOperator(operator);
    }

    if (this.firstOperand) {
      this.operator = operator;

      this.subscribers.forEach((s) =>
        s.biOperatorAdded(operator, this.firstOperand!)
      );
    }
  }

  public addUnOperator(operator: UnOperator) {
    if (
      this.firstOperand !== null &&
      this.operator === null &&
      this.secondOperand === null
    ) {
      const result = operator.calculate(this.firstOperand);

      this.subscribers.forEach((s) =>
        s.unOperatorCalculated({
          operand: this.firstOperand!,
          operator,
          result,
        })
      );

      this.firstOperand = result;
    }
  }

  public canProcess() {
    return (
      this.firstOperand !== null && this.operator && this.secondOperand !== null
    );
  }

  public processCalculation() {
    if (
      this.firstOperand !== null &&
      this.operator &&
      this.secondOperand !== null
    ) {
      const result = this.operator.calculate(
        this.firstOperand,
        this.secondOperand
      );

      this.subscribers.forEach((s) =>
        s.biOperatorCalculated({
          firstOperand: this.firstOperand!,
          operator: this.operator!,
          result,
          secondOperand: this.secondOperand!,
        })
      );

      this.firstOperand = result;
      this.operator = null;
      this.secondOperand = null;
    }
  }

  public clear() {
    this.firstOperand = null;
    this.operator = null;
    this.subscribers.forEach((s) => s.cleared());
  }

  public restoreStorageHistory(expressions: string[]) {
    this.firstOperand = null;
    this.operator = null;
    this.secondOperand = null;
    expressions.forEach(expr => {
      if (this.firstOperand === null)
        this.firstOperand = Number(expr);
      else if (this.operator === null) {
        this.operator = getOperator(expr) as BiOperator;
      } else
        this.secondOperand = Number(expr);
    });
  }
}

class HistoryExpressionSubscriber implements HistoryStorageSubscriber {
  constructor(private model: CalculatorModel) {}

  getHistory(data: HistoryData): void {
    this.model.restoreStorageHistory(data.events);
  }
}
