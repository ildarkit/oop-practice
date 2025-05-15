export interface BiOperator {
  calculate(firstOperand: number, secondOperand: number): number;
  getExpression(firstOperand: number): string;
  getHistoryText(firstOperand: number, secondOperand: number): string;
  getHistoryClass(): string;
}

export interface UnOperator {
  calculate(firstOperand: number): number;
  getHistoryText(firstOperand: number): string;
  getHistoryClass(): string;
}
