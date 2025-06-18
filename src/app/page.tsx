"use client";

import { useState } from "react";
import AlgorithmSidebar from "../components/AlgorithmSelector/AlgorithmSidebar";
import { AlgorithmOption } from "../components/AlgorithmSelector/AlgorithmType";

export default function HomePage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmOption | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <AlgorithmSidebar onSelect={setSelectedAlgorithm} />
      <div className="flex-grow p-6 bg-gray-800 rounded shadow border border-gray-700">
        {selectedAlgorithm ? (
          <p className="text-xl font-semibold text-white">
            Algoritmo seleccionado: {selectedAlgorithm.name}
          </p>
        ) : (
          <p className="text-gray-400">Selecciona un algoritmo para comenzar.</p>
        )}
      </div>
    </div>
  );
}
