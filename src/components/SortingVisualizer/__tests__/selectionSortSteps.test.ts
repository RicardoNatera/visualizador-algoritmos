import { selectionSortSteps } from "../sortingAlgorithms/selectionSortSteps";

describe("selectionSortSteps", () => {
  it("debe devolver pasos que terminan con el array ordenado", () => {
    const input = [64, 25, 12, 22, 11];
    const steps = selectionSortSteps(input);
    const final = steps[steps.length - 1].array;

    expect(final).toEqual([11, 12, 22, 25, 64]);
  });

  it("debe incluir pasos con comparaciones e intercambios", () => {
    const input = [3, 1, 2];
    const steps = selectionSortSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    const hasSwaps = steps.some((step) => step.swapped);
    const hasActive = steps.some((step) => step.activeIndices.length === 2);

    expect(hasSwaps).toBe(true);
    expect(hasActive).toBe(true);
  });

  it("no debe modificar el array original", () => {
    const input = [10, 5, 8];
    const copy = [...input];
    selectionSortSteps(input);
    expect(input).toEqual(copy);
  });

  it("maneja un array vacío sin errores", () => {
    const steps = selectionSortSteps([]);
    expect(steps).toEqual([
      { array: [], activeIndices: [], swapped: false },
    ]);
  });

  it("maneja un array con un solo elemento", () => {
    const steps = selectionSortSteps([7]);
    expect(steps).toEqual([
      { array: [7], activeIndices: [], swapped: false },
    ]);
  });

  it("no realiza swaps innecesarios si el array ya está ordenado", () => {
    const input = [1, 2, 3, 4];
    const steps = selectionSortSteps(input);

    const swapSteps = steps.filter((step) => step.swapped);
    expect(swapSteps.length).toBe(0);
  });
});
