import WeightToggles from "./WeightToggles";
import InputField from "./InputField";
import OutputDisplay from "./OutputDisplay";

export default function TrueFitnessPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Number Grid Toggle</h1>
      <WeightToggles />
      <InputField />
      <OutputDisplay />
      <p className="mt-4 text-sm opacity-50">
        This tool was created because TrueFitness Gym&apos;s rack area somehow
        provides mostly kg weights and some lb weights. It&apos;s a pain to
        calculate the weights I need by mixing the kg and lb weights...
      </p>
    </div>
  );
}
