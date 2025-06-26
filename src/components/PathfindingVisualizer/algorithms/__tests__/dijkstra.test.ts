import { dijkstra } from "../dijkstra";
import { GridNode } from "@/components/PathfindingVisualizer/types";

function createGrid(rows: number, cols: number): GridNode[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      type: "empty",
      previousNode: null,
      distance: Infinity,
      isVisited: false,
    }))
  );
}

describe("Dijkstra Algorithm", () => {
  it("should find the shortest path in a 3x3 grid with no obstacles", () => {
    const grid = createGrid(3, 3);
    const start = grid[0][0];
    const end = grid[2][2];

    const { visitedNodesInOrder, pathNodes } = dijkstra(grid, start, end);

    expect(visitedNodesInOrder.length).toBeGreaterThan(0);
    expect(pathNodes[0]).toBe(start);
    expect(pathNodes[pathNodes.length - 1]).toBe(end);
  });

  it("should return empty path if end is unreachable", () => {
    const grid = createGrid(3, 3);
    const start = grid[0][0];
    const end = grid[2][2];

    // Bloquear todos los caminos al nodo final
    grid[1][2].type = "wall";
    grid[2][1].type = "wall";
    grid[1][1].type = "wall";

    const { pathNodes } = dijkstra(grid, start, end);
    expect(pathNodes).toEqual([]);
  });

  it("should return correct path if start equals end", () => {
    const grid = createGrid(3, 3);
    const start = grid[1][1];
    const end = grid[1][1];

    const { pathNodes, visitedNodesInOrder } = dijkstra(grid, start, end);
    expect(pathNodes).toEqual([start]);
    expect(visitedNodesInOrder).toEqual([start]);
  });
});
