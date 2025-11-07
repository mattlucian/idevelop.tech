// Types for /components/integration/ components

import type { ColorScheme } from "./ui";

/**
 * Integration diagram system configuration
 */
export interface IntegrationSystem {
  name: string;
  label: string;
  iconPath: string;
  colorScheme: ColorScheme;
}

/**
 * Integration mapping between systems
 */
export interface IntegrationMapping {
  from: string;
  to: string;
  direction?: "forward" | "backward";
}

/**
 * Integration diagram configuration
 */
export interface IntegrationDiagramConfig {
  leftSystem: IntegrationSystem;
  rightSystem: IntegrationSystem;
  mappings: IntegrationMapping[];
  caption: string;
  mappingColorScheme: ColorScheme;
}
