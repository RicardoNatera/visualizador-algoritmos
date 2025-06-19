import { GridNode } from "./types";

export interface PathfindingResult {
  visitedNodesInOrder: GridNode[];
  pathNodes: GridNode[];
}

export function bfs(grid: GridNode[][], start: GridNode, end: GridNode): PathfindingResult {
  const visitedNodesInOrder: GridNode[] = [];
  const queue: GridNode[] = [];
  const visited = new Set<string>();

  queue.push(start);
  visited.add(`${start.row}-${start.col}`);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedNodesInOrder.push(current);

    if (current === end) break;

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(key) && neighbor.type !== "wall") {
        visited.add(key);
        neighbor.previousNode = current;
        queue.push(neighbor);
      }
    }
  }

  const pathNodes = reconstructPath(start, end);
  return { visitedNodesInOrder, pathNodes };
}

function getNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const { row, col } = node;
  const neighbors: GridNode[] = [];

  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right

  return neighbors;
}

function reconstructPath(start: GridNode, end: GridNode): GridNode[] {
  const path: GridNode[] = [];
  let current: GridNode | null | undefined = end;

  while (current && current !== start) {
    path.unshift(current);
    current = current.previousNode;
  }

  if (current === start) path.unshift(start); // optional: include start

  return path;
}
