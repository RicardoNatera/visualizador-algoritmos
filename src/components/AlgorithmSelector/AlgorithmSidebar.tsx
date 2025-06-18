'use client';

import { useState } from "react";
import { algorithmOptions, AlgorithmOption, AlgorithmCategory } from "./AlgorithmType";

export default function AlgorithmSidebar({
  onSelect,
}: {
  onSelect: (algorithm: AlgorithmOption) => void;
}) {
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleSelect = (option: AlgorithmOption) => {
    setSelectedKey(option.key);
    onSelect(option);
  };

  const renderSection = (category: AlgorithmCategory) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold capitalize mb-2">{category}</h3>
      <ul className="space-y-1">
        {algorithmOptions
          .filter((opt) => opt.category === category)
          .map((opt) => (
            <li key={opt.key}>
              <button
  onClick={() => handleSelect(opt)}
  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
    selectedKey === opt.key ? "bg-blue-600 text-white font-bold" : ""
  }`}
>
  {opt.name}
</button>

            </li>
          ))}
      </ul>
    </div>
  );

  return (
        <aside className="w-full md:w-60 bg-gray-800 text-gray-100 shadow-md p-4 border-r border-gray-700">
            {renderSection("ordenamiento")}
            {renderSection("rutas")}
        </aside>
  );
}
