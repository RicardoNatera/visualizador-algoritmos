"use client";

import React, { useEffect, useState } from "react";
import { bubbleSortSteps } from "./sortingAlgorithms/bubbleSortSteps";
import { selectionSortSteps } from "./sortingAlgorithms/selectionSortSteps";
import { insertionSortSteps } from "./sortingAlgorithms/insertionSortSteps";
import { SortStep } from "./types";

type SortingAlgorithm = "bubble" | "selection" | "insertion";

const SortingVisualizer: React.FC<{ algorithm: SortingAlgorithm }> = ({ algorithm }) => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(30);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [swapped, setSwapped] = useState(false);
  const [speed, setSpeed] = useState(50);

  const generateRandomArray = (size: number): number[] => {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 5
    );
  };

  const startSorting = () => {
    let generatedSteps: SortStep[] = [];

    if (algorithm === "bubble") {
      generatedSteps = bubbleSortSteps(array);
    } else if (algorithm === "selection") {
      generatedSteps = selectionSortSteps(array);
    } else if (algorithm === "insertion") {
      generatedSteps = insertionSortSteps(array);
    }

    setSteps(generatedSteps);
    setStepIndex(0);
    setIsSorting(true);
  };

  useEffect(() => {
    setArray(generateRandomArray(arraySize));
  }, [arraySize]);

  useEffect(() => {
    if (!isSorting || steps.length === 0) return;

    if (stepIndex >= steps.length) {
      setIsSorting(false);
      return;
    }

    const timeout = setTimeout(() => {
      const currentStep = steps[stepIndex];
      setArray(currentStep.array);
      setActiveIndices(currentStep.activeIndices || []);
      setSwapped(currentStep.swapped || false);
      setStepIndex(stepIndex + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [isSorting, stepIndex, steps]);

  return (
    <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1">
            Tamaño del array: {arraySize}
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsSorting(false);
              setSteps([]);
              setStepIndex(0);
              setActiveIndices([]);
              setSwapped(false);
              setArray(generateRandomArray(arraySize));
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
          >
            Generar nuevo
          </button>

          <button
            onClick={startSorting}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
            disabled={isSorting}
          >
            Iniciar
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Velocidad:</span>
          <button
            onClick={() => setSpeed((prev) => Math.min(prev + 50, 1000))}
            className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded"
          >
            -
          </button>
          <span>{speed} ms</span>
          <button
            onClick={() => setSpeed((prev) => Math.max(prev - 50, 10))}
            className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-end justify-center h-64 gap-[2px]">
        {array.map((value, idx) => {
          const isActive = activeIndices.includes(idx);
          const barColor = isActive
            ? swapped
              ? "bg-red-500"
              : "bg-yellow-400"
            : "bg-blue-400";

          return (
            <div
              key={idx}
              style={{ height: `${value * 2}px` }}
              className={`w-[4px] ${barColor}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SortingVisualizer;
