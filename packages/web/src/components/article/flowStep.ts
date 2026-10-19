export interface FlowStep {
  text: string;
  /** Highlights the step as one AI performs */
  ai?: boolean;
  /** Dashed border for a step that only happens when needed */
  optional?: boolean;
  eyebrow?: string;
  note?: string;
}

export const flowStepClass = (step: FlowStep) => {
  if (step.ai) return "border-purple-500/50 bg-purple-500/15 text-purple-100";
  if (step.optional) return "border-dashed border-slate-600 text-slate-300";
  return "border-slate-700 bg-slate-800/40 text-slate-200";
};
