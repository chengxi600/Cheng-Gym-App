"use client";

import { useMemo } from "react";
import { useSelectWeights } from "../providers/SelectWeightsContext";

export default function OutputDisplay() {
  const { weightsNeeded, isBarbell } = useSelectWeights();

  const weightDisplay = useMemo(() => {
    if (weightsNeeded.error) {
      return "N/A";
    }

    if (isBarbell) {
      return weightsNeeded.amount * 2 + 44;
    }

    return weightsNeeded.amount;
  }, [weightsNeeded]);

  return (
    <div className="p-6 rounded-xl bg-white shadow-md border space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Total Weight
        </h2>
        <p className="text-gray-700 text-md">{weightDisplay} lb</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Selected Weights
        </h2>
        {weightsNeeded.weights.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {weightsNeeded.weights.map((w, i) => (
              <li key={i}>
                {w.label} {isBarbell && "x2"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">None selected</p>
        )}
      </div>
    </div>
  );
}
