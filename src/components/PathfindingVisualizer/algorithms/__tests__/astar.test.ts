import { astar } from "../astar";
import { GridNode } from "@/components/PathfindingVisualizer/types";

function createGrid(rows: number, cols: number): GridNode[][] {
  const grid: GridNode[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isVisited: false,
        previousNode: null,
        type: "empty",
        distance: Infinity,
      });
    }
    grid.push(currentRow);
  }
  return grid;
}

describe("A* Algorithm", () => {
  it("should find a path in a simple grid", () => {
    const grid = createGrid(5, 5);
    const start = grid[0][0];
    const end = grid[4][4];

    const { visitedNodesInOrder, pathNodes } = astar(grid, start, end);

    expect(visitedNodesInOrder.length).toBeGreaterThan(0);
    expect(pathNodes.length).toBeGreaterThan(0);
    expect(pathNodes[0]).toBe(start);
    expect(pathNodes[pathNodes.length - 1]).toBe(end);
  });

  it("should return an empty path if end node is unreachable", () => {
    const grid = createGrid(3, 3);
    const start = grid[0][0];
    const end = grid[2][2];

    // Bloquear todos los caminos hacia el final
    grid[0][1].type = "wall";
    grid[1][0].type = "wall";
    grid[1][1].type = "wall";
    grid[2][1].type = "wall";
    grid[1][2].type = "wall";

    const { pathNodes } = astar(grid, start, end);
    expect(pathNodes).toEqual([]);
  });

  it("should prefer a direct path when available", () => {
    const grid = createGrid(3, 3);
    const start = grid[0][0];
    const end = grid[0][2];

    const { pathNodes } = astar(grid, start, end);
    const pathCoords = pathNodes.map((node) => [node.row, node.col]);

    expect(pathCoords).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });
});
