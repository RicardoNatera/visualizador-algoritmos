import { insertionSortSteps } from "../sortingAlgorithms/insertionSortSteps";
import { SortStep } from "../types";

function applySteps(steps: SortStep[]): number[] {
  return steps.length > 0 ? steps[steps.length - 1].array : [];
}

describe("Insertion Sort Steps", () => {
  it("should sort the array correctly", () => {
    const input = [5, 3, 1, 4, 2];
    const steps = insertionSortSteps(input);
    const finalArray = applySteps(steps);
    expect(finalArray).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle an already sorted array", () => {
    const input = [1, 2, 3, 4, 5];
    const steps = insertionSortSteps(input);
    const finalArray = applySteps(steps);
    expect(finalArray).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle an array with one element", () => {
    const input = [42];
    const steps = insertionSortSteps(input);
    const finalArray = applySteps(steps);
    expect(finalArray).toEqual([42]);
  });

  it("should handle an empty array", () => {
    const input: number[] = [];
    const steps = insertionSortSteps(input);
    const finalArray = applySteps(steps);
    expect(finalArray).toEqual([]);
  });
});
