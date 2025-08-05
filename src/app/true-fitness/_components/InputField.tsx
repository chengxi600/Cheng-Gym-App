"use client";

import { useSelectWeights } from "@/providers/SelectWeightsContext";

export default function WeightInputFields() {
  const { input, isBarbell, handleInputChange, handleToggleBarbell } =
    useSelectWeights();

  return (
    <div>
      <input
        type="number"
        value={input}
        step={0.5}
        onChange={handleInputChange}
        placeholder="Enter weight (lbs)..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="mb-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isBarbell}
            onChange={handleToggleBarbell}
            className="w-4 h-4"
          />
          <span className="flex flex-row gap-3 items-center">
            Barbell{" "}
            <p className="opacity-50 text-xs">
              This will exclude 44lbs bar when calculating plates.
            </p>
          </span>
        </label>
      </div>
    </div>
  );
}
