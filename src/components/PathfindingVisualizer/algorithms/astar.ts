import { GridNode } from "../types";
import { getNeighbors, reconstructPath } from "./utils";

type AStarResult = {
  visitedNodesInOrder: GridNode[];
  pathNodes: GridNode[];
};

function heuristic(a: GridNode, b: GridNode): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col); // Manhattan distance
}

export function astar(grid: GridNode[][], startNode: GridNode, endNode: GridNode): AStarResult {
  const visitedNodesInOrder: GridNode[] = [];
  const openSet: GridNode[] = [startNode];

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const getKey = (node: GridNode) => `${node.row}-${node.col}`;

  for (const row of grid) {
    for (const node of row) {
      gScore.set(getKey(node), Infinity);
      fScore.set(getKey(node), Infinity);
      node.previousNode = null;
    }
  }

  gScore.set(getKey(startNode), 0);
  fScore.set(getKey(startNode), heuristic(startNode, endNode));

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore.get(getKey(a))! - fScore.get(getKey(b))!);
    const current = openSet.shift()!;
    visitedNodesInOrder.push(current);

    if (current === endNode) break;

    current.isVisited = true;

    const neighbors: GridNode[] = getUnvisitedNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (neighbor.type === "wall") continue;

      const tentativeGScore = gScore.get(getKey(current))! + 1;
      if (tentativeGScore < gScore.get(getKey(neighbor))!) {
        neighbor.previousNode = current;
        gScore.set(getKey(neighbor), tentativeGScore);
        fScore.set(getKey(neighbor), tentativeGScore + heuristic(neighbor, endNode));

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  const pathNodes = reconstructPath(startNode, endNode);
  return { visitedNodesInOrder, pathNodes };
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const { row, col } = node;
  const neighbors: GridNode[] = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((n) => !n.isVisited);
}
