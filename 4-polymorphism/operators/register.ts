const operators = new Map();

export function registerOperator({ name, operator }: {
  name: string,
  operator: object
}) {
  operators.set(name, operator);
}

export function getOperator(name: string): object | undefined {
  return operators.get(name);
}
