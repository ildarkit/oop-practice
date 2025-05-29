import type { CalculatorSubscriber } from "./calculator-subscriber";
import type { BiOperator, UnOperator } from "./operator";
import type { 
  BiOperatorCalculatedEvent,
  UnOperatorCalculatedEvent
} from "./calculator-subscriber";
import type { HistoryStorageSubscriber } from "./history";
import { HistoryStorage } from "./storage";

type OperandType = 'first' | 'second';

export class CalculatorHistoryStorage {
  public readonly subscriber = new StorageSubscriber(this);
  private historyStorageSubscribers: HistoryStorageSubscriber[] = [];
  private storage = new HistoryStorage('calculator');

  public addSubscriber(subscriber: HistoryStorageSubscriber) {
    this.historyStorageSubscribers.push(subscriber);
  }

  public render() {
    this.storage.get().then(data => {
      this.historyStorageSubscribers.forEach(s => s.getHistory(data));
    });
  }

  public addBiOperator(payload: { operand: string, operator: string }) {
    this.storage.updateAll({ type: 'event', payload: payload.operand });
    this.storage.append({ type: 'event', payload: payload.operator });
  }

  public updateCurrentOperand(payload: string, operandType: OperandType) {
    if (operandType === 'first')
      this.storage.updateAll({ type: 'event', payload });
    else
      this.storage.updateAtIndex(2, { type: 'event', payload });
  }

  public addBiOperation(
    firstOperand: number,
    operator: BiOperator,
    secondOperand: number
  ) {
    const historyItem = /*html*/ `
      <div class="calculator_history-item ${operator.getHistoryClass()}">
        ${operator.getHistoryText(firstOperand, secondOperand)}
      </div>
      `;
    this.storage.append({ type: 'history', payload: historyItem });
  }

  public addUnOperation(firstOperand: number, operator: UnOperator) {
    const historyItem = /*html*/ `
      <div class="calculator_history-item ${operator.getHistoryClass()}">
        ${operator.getHistoryText(firstOperand)}
      </div>
      `;
    this.storage.append({ type: 'history', payload: historyItem });
  }

  public clear() {
    this.storage.clear();
  }
}

class StorageSubscriber implements CalculatorSubscriber {
  constructor(private historyStorage: CalculatorHistoryStorage) {}

  currentOperandUpdated(operand: number, type: OperandType): void {
    this.historyStorage.updateCurrentOperand(operand.toString(), type);
  }

  biOperatorAdded(operator: BiOperator, operand: number): void {
    this.historyStorage.addBiOperator({
      operand: operand.toString(),
      operator: operator.name
    });
  }

  biOperatorCalculated(event: BiOperatorCalculatedEvent): void {
    this.historyStorage.addBiOperation(
      event.firstOperand,
      event.operator,
      event.secondOperand
    );
  }

  unOperatorCalculated(event: UnOperatorCalculatedEvent): void {
    this.historyStorage.addUnOperation(event.operand, event.operator);
  }

  cleared(): void {
    this.historyStorage.clear();
  }
}
