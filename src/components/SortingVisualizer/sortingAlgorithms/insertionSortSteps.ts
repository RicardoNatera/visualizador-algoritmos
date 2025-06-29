import { SortStep } from "../types";

export function insertionSortSteps(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = array.slice(); // copia para no mutar el original

  // Siempre guardar el estado inicial, incluso si no hay pasos de inserción
  steps.push({
    array: arr.slice(),
    activeIndices: [],
    swapped: false,
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: arr.slice(),
        activeIndices: [j, j + 1],
        swapped: true,
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      array: arr.slice(),
      activeIndices: [j + 1],
      swapped: false,
    });
  }

  return steps;
}
