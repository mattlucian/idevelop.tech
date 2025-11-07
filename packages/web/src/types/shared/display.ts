// Display/presentation type definitions
import type { Step } from "./card";

export interface StepDisplay {
  type: "workflow";
  data: {
    title: string;
    steps: Step[];
    style?: "boxed" | "boxed-inline" | "timeline";
  };
}

export interface BeforeAfterSection {
  title?: string;
  items?: string[];
}

export interface DiagramDisplay {
  type: "diagram" | "before-after";
  data: {
    title: string;
    before: BeforeAfterSection | string[];
    after: BeforeAfterSection | string[];
  };
}

export interface CodeDisplay {
  type: "code";
  data: {
    title: string;
    code: string;
  };
}

export interface OptionItem {
  icon?: string;
  title: string;
  description?: string;
  items: string[];
}

export interface OptionsDisplay {
  type: "options";
  data: {
    title?: string;
    options: OptionItem[];
  };
}

export interface HighlightPoint {
  icon: string;
  title: string;
  description: string;
}

export interface HighlightsDisplay {
  type: "highlights";
  data: {
    benefits: HighlightPoint[];
    expertise: HighlightPoint[];
  };
}

export type Display =
  | StepDisplay
  | DiagramDisplay
  | CodeDisplay
  | OptionsDisplay
  | HighlightsDisplay;
