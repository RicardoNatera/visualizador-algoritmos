"use client";

import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { GridNode, NodeType } from "./types";
import { bfs as bfsFunction } from "@/components/PathfindingVisualizer/algorithms/bfs";
import { dijkstra as dijkstraFunction } from "@/components/PathfindingVisualizer/algorithms/dijkstra";
import { astar as astarFunction } from "@/components/PathfindingVisualizer/algorithms/astar";

const NUM_ROWS = 20;
const NUM_COLS = 40;

type Props = {
  selectedKey: "bfs" | "dijkstra" | "astar";
};

const PathfindingVisualizer: React.FC<Props> = ({ selectedKey }) => {
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [startNode, setStartNode] = useState<{ row: number; col: number } | null>(null);
  const [endNode, setEndNode] = useState<{ row: number; col: number } | null>(null);
  const [mode, setMode] = useState<"start" | "end" | "wall">("wall");
  const [isAnimating, setIsAnimating] = useState(false);
  const shouldCancelRef = useRef(false);

  const createInitialGrid = (): GridNode[][] =>
    Array.from({ length: NUM_ROWS }, (_, row) =>
      Array.from({ length: NUM_COLS }, (_, col) => ({
        row,
        col,
        type: "empty",
        isVisited: false,
        distance: Infinity,
        previousNode: null,
      }))
    );

  const cloneGrid = (): GridNode[][] =>
    grid.map((row) => row.map((node) => ({ ...node })));

  const resetGrid = () => {
    setGrid(createInitialGrid());
    setStartNode(null);
    setEndNode(null);
    setMode("wall");
    setIsAnimating(false);
    shouldCancelRef.current = false;
    toast("Grid reseteado");
  };

  const handleCellClick = (row: number, col: number) => {
    if (isAnimating) return;

    const newGrid = cloneGrid();
    const currentNode = newGrid[row][col];

    switch (mode) {
      case "start":
        if (startNode) newGrid[startNode.row][startNode.col].type = "empty";
        currentNode.type = "start";
        setStartNode({ row, col });
        break;
      case "end":
        if (endNode) newGrid[endNode.row][endNode.col].type = "empty";
        currentNode.type = "end";
        setEndNode({ row, col });
        break;
      case "wall":
        currentNode.type = currentNode.type === "wall" ? "empty" : "wall";
        break;
    }

    setGrid(newGrid);
  };

  const prepareGrid = (): GridNode[][] =>
    grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        previousNode: null,
        distance: Infinity,
      }))
    );

  const animate = async (
    visitedNodesInOrder: GridNode[],
    pathNodes: GridNode[]
  ) => {
    for (const node of visitedNodesInOrder) {
      if (shouldCancelRef.current) return;
      if (!["start", "end"].includes(grid[node.row][node.col].type)) {
        setGrid((prev) => {
          const updated = prev.map((row) =>
            row.map((cell) =>
              cell.row === node.row && cell.col === node.col
                ? { ...cell, type: "visited" as NodeType }
                : cell
            )
          );
          return updated;
        });
      }
      await new Promise((res) => setTimeout(res, 20));
    }



    if (pathNodes.length === 0) {
      toast.error("No hay un camino posible entre el inicio y el final");
      return;
    }

    for (const node of pathNodes) {
      if (shouldCancelRef.current) return;
      if (!["start", "end"].includes(node.type)) {
        setGrid((prev) => {
          const updated = prev.map((row) =>
            row.map((cell) =>
              cell.row === node.row && cell.col === node.col
                ? { ...cell, type: "path" as NodeType }
                : cell
            )
          );
          return updated;
        });
      }
      await new Promise((res) => setTimeout(res, 30));
    }

    toast.success("¡Camino encontrado exitosamente!");
  };

  const clearVisitedAndPath = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          type: ["visited", "path"].includes(node.type) ? "empty" : node.type,
          isVisited: false,
          previousNode: null,
          distance: Infinity,
        }))
      )
    );
  };

  const runSelectedAlgorithm = async () => {
    if (!startNode || !endNode) {
      toast.error("Debes establecer el punto de inicio y fin antes de ejecutar");
      return;
    }

    if (isAnimating) {
      shouldCancelRef.current = true;
      setIsAnimating(false);
      return;
    }

    clearVisitedAndPath();
    shouldCancelRef.current = false;
    setIsAnimating(true);

    const newGrid = prepareGrid();
    const start = newGrid[startNode.row][startNode.col];
    const end = newGrid[endNode.row][endNode.col];

    const algorithmMap = {
      bfs: bfsFunction,
      dijkstra: dijkstraFunction,
      astar: astarFunction,
    };

    const algorithm = algorithmMap[selectedKey];
    const { visitedNodesInOrder, pathNodes } = algorithm(newGrid, start, end);
    await animate(visitedNodesInOrder, pathNodes);

    setIsAnimating(false);
    shouldCancelRef.current = false;
  };

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

  useEffect(() => {
    if (isAnimating) {
      toast("Algoritmo cambiado. Se reinició la animación.");
      shouldCancelRef.current = true;
      setIsAnimating(false);
      clearVisitedAndPath();
    }
  }, [selectedKey]);

  return (
    <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
      <h2 className="text-white text-lg mb-4">Visualizador de Algoritmos de Ruta</h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <button onClick={() => setMode("start")} className="px-3 py-1 bg-blue-600 text-white rounded">
          Establecer Inicio
        </button>
        <button onClick={() => setMode("end")} className="px-3 py-1 bg-green-600 text-white rounded">
          Establecer Fin
        </button>
        <button onClick={() => setMode("wall")} className="px-3 py-1 bg-gray-600 text-white rounded">
          Colocar Obstáculos
        </button>
        <button onClick={resetGrid} className="px-3 py-1 bg-red-600 text-white rounded">
          Resetear
        </button>
        <button
          onClick={runSelectedAlgorithm}
          disabled={isAnimating}
          className="px-3 py-1 bg-yellow-500 text-black rounded"
        >
          Ejecutar {selectedKey.toUpperCase()}
        </button>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`,
        }}
      >
        {grid.flat().map((node) => {
          const colorMap: Record<NodeType, string> = {
            empty: "bg-gray-200",
            start: "bg-blue-500",
            end: "bg-green-500",
            wall: "bg-gray-600",
            visited: "bg-yellow-300",
            path: "bg-purple-600",
          };

          return (
            <div
              key={`${node.row}-${node.col}`}
              onClick={() => handleCellClick(node.row, node.col)}
              className={`w-5 h-5 border border-gray-600 ${colorMap[node.type]} cursor-pointer`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
