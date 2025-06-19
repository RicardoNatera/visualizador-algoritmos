export type NodeType = "start" | "end" | "wall" | "empty" | "visited" | "path";

export interface GridNode {
  row: number;
  col: number;
  type: NodeType;
  isVisited: boolean;
  distance: number;
  previousNode?: GridNode | null;
}
