export type AlgorithmCategory = "ordenamiento" | "rutas";

export type AlgorithmOption = {
  name: string;
  key: string;
  category: AlgorithmCategory;
};

export const algorithmOptions: AlgorithmOption[] = [
  { name: "Bubble Sort", key: "bubble", category: "ordenamiento" },
  { name: "Insertion Sort", key: "insertion", category: "ordenamiento" },
  { name: "BFS", key: "bfs", category: "rutas" },
  { name: "Dijkstra", key: "dijkstra", category: "rutas" },
  { name: "A*", key: "astar", category: "rutas" },
];
