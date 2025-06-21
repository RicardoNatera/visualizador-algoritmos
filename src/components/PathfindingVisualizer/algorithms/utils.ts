import { GridNode } from "@/components/PathfindingVisualizer/types";

export function getNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const { row, col } = node;
  const neighbors: GridNode[] = [];

  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right

  return neighbors;
}

export function reconstructPath(start: GridNode, end: GridNode): GridNode[] {
  const path: GridNode[] = [];
  let current: GridNode | null | undefined = end;

  while (current && current !== start) {
    path.unshift(current);
    current = current.previousNode;
  }

  if (current === start) path.unshift(start); // optional: include start
  return path;
}
