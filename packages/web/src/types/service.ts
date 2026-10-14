// Type definitions for service page data structure

import type {
  ColorScheme,
  BreadcrumbItem,
  PortfolioSection,
} from "./shared/ui";
import type { ExpertiseBadge } from "./shared/card";
import type { IntegrationDiagramConfig } from "./shared/integration";

/**
 * Fields every service page shares: navigation, hero, portfolio, and CTA
 */
export interface ServicePageBase {
  breadcrumbs: BreadcrumbItem[];
  hero: {
    title: string;
    subtitle: string;
    colorScheme: ColorScheme;
  };
  portfolio: PortfolioSection;
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

/**
 * Icon tile content, with icon name from iconMapping
 */
export interface IconCardContent {
  icon: string;
  title: string;
  desc: string;
}

/**
 * Integration service specific data
 */
export type IntegrationDiagramKey =
  | "accounting"
  | "fulfillment"
  | "marketplace";

export interface IntegrationServiceData extends ServicePageBase {
  tabs: { id: IntegrationDiagramKey; label: string }[];
  stats: { value: string; label: string }[];
  integrationDiagrams: Record<IntegrationDiagramKey, IntegrationDiagramConfig>;
}

/**
 * Tech Admin service specific data
 */
export interface TechAdminServiceData extends ServicePageBase {
  signals: string[];
}

/**
 * Category of everyday AI use cases, with icon name from iconMapping
 */
export interface AIUseCase {
  title: string;
  icon: string;
  color: "cyan" | "purple" | "emerald" | "orange";
  items: string[];
}

/**
 * AI Enablement service specific data
 */
export interface AIEnablementServiceData extends ServicePageBase {
  useCases: AIUseCase[];
}

/**
 * Cloud Consulting service specific data
 */
export interface CloudConsultingServiceData extends ServicePageBase {
  deliverables: IconCardContent[];
  awsServices: { area: string; services: string[] }[];
}

/**
 * Ids of the example sections on the eCommerce page
 */
export type EcommerceExampleId =
  | "orders"
  | "inventory"
  | "product-data"
  | "pos";

/**
 * Common eCommerce challenge, optionally linked to an example section
 */
export interface EcommerceChallenge extends IconCardContent {
  example?: EcommerceExampleId;
}

/**
 * Platforms named on the eCommerce page: main ones shown large, others grouped
 */
export interface EcommercePlatforms {
  featured: { name: string; desc: string; path?: string }[];
  groups: { label: string; names: string[] }[];
}

/**
 * Ecommerce Ops service specific data
 */
export interface EcommerceOpsServiceData extends ServicePageBase {
  challenges: EcommerceChallenge[];
  platforms: EcommercePlatforms;
}

/**
 * Request pattern an agent uses against an MCP server
 */
export interface McpRequestPattern {
  name: string;
  question: string;
  code: string;
  insteadOf: string;
  result: string;
  color: ColorScheme;
}

/**
 * MCP Development service specific data
 */
export interface McpDevelopmentServiceData extends ServicePageBase {
  requestPatterns: McpRequestPattern[];
}

/**
 * Stage of the Flxpoint data flow (ids double as URL hashes for sitelinks)
 */
export type FlxpointStageId =
  | "sources"
  | "catalog"
  | "listings"
  | "orders"
  | "fulfillment"
  | "integrations";

export interface FlxpointStage {
  id: FlxpointStageId;
  icon: string;
  label: string;
  summary: string;
  issue: string;
  help: string;
  projects: string[];
}

export interface FlxpointStartingPoint extends IconCardContent {
  projects: string[];
}

export interface FlxpointService extends IconCardContent {
  path: string;
}

export interface FlxpointCredential {
  value: string;
  label: string;
  desc: string;
}

/**
 * Flxpoint Consulting page data
 */
export interface FlxpointConsultingData extends ServicePageBase {
  expertiseBadge: ExpertiseBadge;
  startingPoints: FlxpointStartingPoint[];
  stages: FlxpointStage[];
  services: FlxpointService[];
  experience: FlxpointCredential[];
}
