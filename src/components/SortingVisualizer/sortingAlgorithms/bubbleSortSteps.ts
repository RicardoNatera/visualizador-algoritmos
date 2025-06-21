import { SortStep } from "../types";

export function bubbleSortSteps(inputArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...inputArray];
  const n = array.length;
  let swapped: boolean;

  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        activeIndices: [j, j + 1],
        swapped: false,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        steps.push({
          array: [...array],
          activeIndices: [j, j + 1],
          swapped: true,
        });
      }
    }

    if (!swapped) break;
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swapped: false,
  });

  return steps;
}
