import { bubbleSortSteps } from "./sortingAlgorithms";

describe("bubbleSortSteps", () => {
  it("debe devolver pasos que terminan con el array ordenado", () => {
    const input = [5, 1, 4, 2];
    const steps = bubbleSortSteps(input);
    const final = steps[steps.length - 1].array;

    expect(final).toEqual([1, 2, 4, 5]);
  });

  it("debe devolver pasos con información de comparación e intercambio", () => {
    const input = [3, 2, 1];
    const steps = bubbleSortSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    const hasSwaps = steps.some((step) => step.swapped);
    const hasActive = steps.some((step) => step.activeIndices?.length === 2);

    expect(hasSwaps).toBe(true);
    expect(hasActive).toBe(true);
  });

  it("no debe modificar el array original", () => {
    const input = [8, 4, 2];
    const copy = [...input];
    bubbleSortSteps(input);

    expect(input).toEqual(copy);
  });
});
