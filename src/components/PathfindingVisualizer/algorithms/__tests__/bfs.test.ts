import { bfs } from "../bfs";
import { GridNode } from "../../types";

// 🧪 Helper para crear un nodo
const createNode = (row: number, col: number, type: GridNode["type"] = "empty"): GridNode => ({
  row,
  col,
  type,
  isVisited: false,
  distance: Infinity,
  previousNode: null,
});

// 🧪 Helper para crear una cuadrícula vacía
const createGrid = (rows: number, cols: number): GridNode[][] =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createNode(row, col))
  );

describe("bfs algorithm", () => {
  it("encuentra el camino más corto en una cuadrícula vacía", () => {
    const grid = createGrid(5, 5);
    const start = grid[0][0];
    const end = grid[0][2];

    const { pathNodes, visitedNodesInOrder } = bfs(grid, start, end);

    expect(pathNodes.length).toBeGreaterThan(0);
    expect(pathNodes[0]).toBe(start);
    expect(pathNodes[pathNodes.length - 1]).toBe(end);

    // Verifica que los nodos fueron visitados en orden
    const visitedSet = new Set(visitedNodesInOrder.map(n => `${n.row}-${n.col}`));
    expect(visitedSet.has("0-1")).toBe(true);
    expect(visitedSet.has("0-2")).toBe(true);
  });

  it("devuelve un camino vacío si el destino es inalcanzable", () => {
    const grid = createGrid(5, 5);
    const start = grid[0][0];
    const end = grid[0][2];

    // Colocamos muros entre start y end
    grid[0][1].type = "wall";
    grid[1][0].type = "wall";

    const { pathNodes } = bfs(grid, start, end);
    expect(pathNodes).toEqual([]);
  });

  it("no se rompe si el start y end son el mismo nodo", () => {
    const grid = createGrid(3, 3);
    const start = grid[1][1];

    const { pathNodes } = bfs(grid, start, start);
    expect(pathNodes).toEqual([start]);
  });
});
