import { Weight, weights } from "../data/trueFitness";
import { SelectWeightsProvider } from "../providers/SelectWeightsContext";
import TrueFitnessPage from "./TrueFitnessPage";

export default function TrueFitness() {
  //filter out 25kg by default
  const initSelection: Weight[] = weights.filter((w) => w.value != 55);

  return (
    <SelectWeightsProvider initialSelection={initSelection}>
      <TrueFitnessPage />
    </SelectWeightsProvider>
  );
}
