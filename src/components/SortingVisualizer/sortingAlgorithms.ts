import { SortStep } from "./types";

export function bubbleSortSteps(inputArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const array = [...inputArray]; // No mutamos el original

  const n = array.length;
  let swapped: boolean;

  for (let i = 0; i < n; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Paso: comparación
      steps.push({
        array: [...array],
        activeIndices: [j, j + 1],
        swapped: false,
      });

      if (array[j] > array[j + 1]) {
        // Intercambio
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        steps.push({
          array: [...array],
          activeIndices: [j, j + 1],
          swapped: true,
        });
      }
    }

    // Si ya está ordenado, terminamos antes
    if (!swapped) break;
  }

  // Paso final: todo ordenado
  steps.push({
    array: [...array],
    activeIndices: [],
    swapped: false,
  });

  return steps;
}
