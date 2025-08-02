"use client";

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from "react";
import { Weight } from "../data/trueFitness";
import { computeWeightsNeeded } from "@/app/util";

interface WeightsNeededResult {
  error: boolean;
  weights: Weight[];
  amount: number;
}

interface SelectWeightsContextType {
  weightsNeeded: WeightsNeededResult;
  selection: Weight[];
  input: string;
  isBarbell: boolean;
  handleToggleBarbell: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleNumber: (weight: Weight) => void;
  setSelection: React.Dispatch<React.SetStateAction<Weight[]>>;
}

const SelectWeightsContext = createContext<
  SelectWeightsContextType | undefined
>(undefined);

export function SelectWeightsProvider({
  children,
  initialSelection = [],
}: {
  children: ReactNode;
  initialSelection?: Weight[];
}) {
  const [selection, setSelection] = useState<Weight[]>(initialSelection);
  const [input, setInput] = useState("");
  const [isBarbell, setIsBarbell] = useState<boolean>(true);

  const handleToggleNumber = useCallback((weight: Weight) => {
    setSelection((prev) =>
      prev.map((p) => p.value).includes(weight.value)
        ? prev.filter((n) => n.value !== weight.value)
        : [...prev, weight],
    );
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Allow only numbers and decimals
      if (!/^\d*\.?\d*$/.test(value)) return;

      // Clamp the numeric value
      const num = parseFloat(value);
      if (!isNaN(num)) {
        const clamped = Math.min(1000, Math.max(0, num));
        setInput(clamped.toString());
      } else {
        setInput("");
      }
    },
    [],
  );

  const handleToggleBarbell = useCallback(() => {
    setIsBarbell((prev) => !prev);
  }, []);

  const weightsNeeded = useMemo(() => {
    if (Number.isNaN(input) || input === "") {
      return {
        error: true,
        weights: [],
        amount: 0,
      };
    }
    let target = parseFloat(input);
    if (isBarbell) {
      target = Math.max(0, (target - 44) / 2);
    }
    return computeWeightsNeeded(selection, target);
  }, [selection, input, isBarbell]);

  return (
    <SelectWeightsContext.Provider
      value={{
        weightsNeeded,
        selection,
        input,
        isBarbell,
        handleToggleBarbell,
        handleInputChange,
        handleToggleNumber,
        setSelection,
      }}
    >
      {children}
    </SelectWeightsContext.Provider>
  );
}

export function useSelectWeights() {
  const context = useContext(SelectWeightsContext);
  if (context === undefined) {
    throw new Error(
      "useSelectWeights must be used within a SelectWeightsProvider",
    );
  }
  return context;
}
