"use client";
import { useSelectWeights } from "../providers/SelectWeightsContext";
import { weights } from "../data/trueFitness";

export default function WeightToggles() {
  const { selection, handleToggleNumber } = useSelectWeights();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
      {weights.map((weight) => {
        const selected = selection.includes(weight);
        return (
          <button
            key={weight.value}
            onClick={() => handleToggleNumber(weight)}
            value={weight.value}
            className={`py-3 px-2 rounded-lg font-semibold text-center transition 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }
            `}
          >
            {weight.label}
          </button>
        );
      })}
    </div>
  );
}
