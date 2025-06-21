"use client";

import React, { useEffect, useState } from "react";
import { GridNode } from "./types";
import { bfs as bfsFunction } from "@/components/PathfindingVisualizer/algorithms/bfs";

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

  const createInitialGrid = (): GridNode[][] => {
    return Array.from({ length: NUM_ROWS }, (_, row) =>
      Array.from({ length: NUM_COLS }, (_, col) => ({
        row,
        col,
        type: "empty",
        isVisited: false,
        distance: Infinity,
        previousNode: null,
      }))
    );
  };

  const resetGrid = () => {
    setGrid(createInitialGrid());
    setStartNode(null);
    setEndNode(null);
    setMode("wall");
    setIsAnimating(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isAnimating) return;
    const newGrid = grid.map((r) => r.map((node) => ({ ...node })));
    const currentNode = newGrid[row][col];

    if (mode === "start") {
      if (startNode) newGrid[startNode.row][startNode.col].type = "empty";
      currentNode.type = "start";
      setStartNode({ row, col });
    } else if (mode === "end") {
      if (endNode) newGrid[endNode.row][endNode.col].type = "empty";
      currentNode.type = "end";
      setEndNode({ row, col });
    } else if (mode === "wall") {
      currentNode.type = currentNode.type === "wall" ? "empty" : "wall";
    }

    setGrid(newGrid);
  };

  const bfs = async () => {
    if (!startNode || !endNode) return;
    setIsAnimating(true);

    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        previousNode: null,
      }))
    );

    const start = newGrid[startNode.row][startNode.col];
    const end = newGrid[endNode.row][endNode.col];

    const { visitedNodesInOrder, pathNodes } = bfsFunction(newGrid, start, end);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      await new Promise((res) => setTimeout(res, 20));
      const node = visitedNodesInOrder[i];
      if (node.type !== "start" && node.type !== "end") {
        newGrid[node.row][node.col].type = "visited";
        setGrid([...newGrid]);
      }
    }

    for (let i = 0; i < pathNodes.length; i++) {
      await new Promise((res) => setTimeout(res, 30));
      const node = pathNodes[i];
      if (node.type !== "start" && node.type !== "end") {
        newGrid[node.row][node.col].type = "path";
        setGrid([...newGrid]);
      }
    }

    setIsAnimating(false);
  };

  const runAlgorithm = async () => {
    if (selectedKey === "bfs") {
      await bfs();
    } else {
      alert(`El algoritmo "${selectedKey}" aún no está implementado.`);
    }
  };

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

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
          onClick={runAlgorithm}
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
          let color = "bg-gray-200";
          if (node.type === "start") color = "bg-blue-500";
          else if (node.type === "wall") color = "bg-gray-600";
          else if (node.type === "visited") color = "bg-yellow-300";
          else if (node.type === "path") color = "bg-purple-600";
          else if (node.type === "end") color = "bg-green-500";

          return (
            <div
              key={`${node.row}-${node.col}`}
              onClick={() => handleCellClick(node.row, node.col)}
              className={`w-5 h-5 border border-gray-600 ${color} cursor-pointer`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
