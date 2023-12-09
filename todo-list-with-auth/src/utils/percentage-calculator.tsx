// Number of todos - 10
// Completed -> 5

// 100% / (Number of todos  / Completed)

// Completed percentage -> 100% / (10 / 5) -> 100% / 2 -> 50%
// In progress percentage -> 100% / (10 / 2) -> 100% / 5 -> 20%
// Late percentage -> 100% / (10 / 1) -> 100% / 10 -> 10%

interface PercentageCalculatorProps {
  numberOfTodos: number;
  compareNumber: number;
}

export function percentageCalculator({
  compareNumber,
  numberOfTodos,
}: PercentageCalculatorProps) {
  return `${Math.floor(100 / Math.floor(numberOfTodos / compareNumber))}%`;
}
