// src/components/SortingVisualizer/sortingAlgorithms/selectionSortSteps.ts
import { SortStep } from "../types";

export function selectionSortSteps(inputArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...inputArray];

  const n = array.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        activeIndices: [minIndex, j],
        swapped: false,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      steps.push({
        array: [...array],
        activeIndices: [i, minIndex],
        swapped: true,
      });
    }
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    swapped: false,
  });

  return steps;
}
