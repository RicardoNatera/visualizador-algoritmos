import { GridNode } from "@/components/PathfindingVisualizer/types"
import { getNeighbors, reconstructPath } from "@/components/PathfindingVisualizer/algorithms/utils";

export interface PathfindingResult {
  visitedNodesInOrder: GridNode[];
  pathNodes: GridNode[];
}

export function bfs(grid: GridNode[][], start: GridNode, end: GridNode): PathfindingResult {
  if (start === end) {
    return {
      visitedNodesInOrder: [start],
      pathNodes: [start],
    };
  }

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

  const pathNodes = end.previousNode ? reconstructPath(start, end) : [];
  return { visitedNodesInOrder, pathNodes };
}


