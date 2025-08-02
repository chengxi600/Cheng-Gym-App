import { Weight } from "./data/trueFitness";

type WeightNeeded = {
  error: boolean;
  weights: Weight[];
  amount: number; // actual float amount achieved
};

export function computeWeightsNeeded(
  weights: Weight[],
  target: number,
): WeightNeeded {
  const SCALE = 100; // multiply all values by 100 to avoid float precision issues

  const scaledTarget = Math.round(target * SCALE);
  const scaledDp = new Array(scaledTarget + 1).fill(Infinity);
  const prev = new Array(scaledTarget + 1).fill(null as Weight | null);

  scaledDp[0] = 0;

  for (let amount = 1; amount <= scaledTarget; amount++) {
    for (const weight of weights) {
      const scaledWeight = Math.round(weight.value * SCALE);
      if (
        amount >= scaledWeight &&
        scaledDp[amount - scaledWeight] + 1 < scaledDp[amount]
      ) {
        scaledDp[amount] = scaledDp[amount - scaledWeight] + 1;
        prev[amount] = weight;
      }
    }
  }

  // Find closest achievable amount ≤ target
  let closest = scaledTarget;
  while (closest >= 0 && scaledDp[closest] === Infinity) {
    closest--;
  }

  if (closest < 0) return { error: true, weights: [], amount: 0 };

  // Reconstruct weight usage
  const result: Weight[] = [];
  let amt = closest;
  while (amt > 0) {
    const weight = prev[amt];
    if (!weight) break; // safety check
    result.push(weight);
    amt -= Math.round(weight.value * SCALE);
  }

  return {
    error: false,
    amount: closest / SCALE,
    weights: result,
  };
}
