import { GridNode } from "@/components/PathfindingVisualizer/types";
import { getNeighbors, reconstructPath } from "@/components/PathfindingVisualizer/algorithms/utils";

export interface PathfindingResult {
  visitedNodesInOrder: GridNode[];
  pathNodes: GridNode[];
}

export function dijkstra(grid: GridNode[][], start: GridNode, end: GridNode): PathfindingResult {
  if (start === end) {
    return {
      visitedNodesInOrder: [start],
      pathNodes: [start],
    };
  }

  const visitedNodesInOrder: GridNode[] = [];
  const unvisitedNodes: GridNode[] = [];

  // Inicializar distancias
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.previousNode = null;
      unvisitedNodes.push(node);
    }
  }

  start.distance = 0;

  while (unvisitedNodes.length > 0) {
    // Ordenar nodos no visitados por distancia
    unvisitedNodes.sort((a, b) => a.distance! - b.distance!);
    const closestNode = unvisitedNodes.shift()!;

    if (closestNode.type === "wall") continue;
    if (closestNode.distance === Infinity) break;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === end) break;

    const neighbors = getNeighbors(closestNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.type === "wall") continue;
      const tentativeDistance = closestNode.distance! + 1;
      if (tentativeDistance < neighbor.distance!) {
        neighbor.distance = tentativeDistance;
        neighbor.previousNode = closestNode;
      }
    }
  }

  const pathNodes = end.previousNode ? reconstructPath(start, end) : [];
  return { visitedNodesInOrder, pathNodes };
}
