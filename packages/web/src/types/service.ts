// Type definitions for service page data structure

import type {
  ColorScheme,
  BreadcrumbItem,
  TabConfig,
  PortfolioSection,
  ComparisonTabContent,
  JourneyConfig,
  BeforeAfterComparison,
  WorkflowStage,
  PlatformConfig,
  MigrationPhase,
} from "./shared/ui";
import type {
  BenefitItem,
  ExpertiseBadge,
  TimelineStep,
  VisualStep,
  DesignProcessStep,
} from "./shared/card";
import type { IntegrationDiagramConfig } from "./shared/integration";

/**
 * Complete service page data structure
 */
export interface ServicePageData {
  // Navigation
  breadcrumbs: BreadcrumbItem[];

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    colorScheme: ColorScheme;
  };

  // Tab System (optional)
  tabs?: TabConfig[];

  // Benefits Section
  benefits: BenefitItem[];
  expertiseBadge: ExpertiseBadge;

  // What I Offer / How It Works
  whatIOffer: string[];
  howItWorks: string[];

  // Portfolio
  portfolio: PortfolioSection;

  // CTA Section
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

/**
 * Integration service specific data
 */
export interface IntegrationServiceData extends ServicePageData {
  integrationDiagrams: {
    accounting: IntegrationDiagramConfig;
    fulfillment: IntegrationDiagramConfig;
    marketplace: IntegrationDiagramConfig;
  };
}

/**
 * Tech Admin service specific data
 */
export interface TechAdminServiceData extends ServicePageData {
  timelineSteps: TimelineStep[];
}

/**
 * AI Enablement service specific data
 */
export interface AIEnablementServiceData extends ServicePageData {
  tabContent: {
    workflow: ComparisonTabContent;
    training: ComparisonTabContent;
    implementation: ComparisonTabContent;
  };
}

/**
 * Cloud Consulting service specific data
 */
export interface CloudConsultingServiceData extends ServicePageData {
  cloudJourneys: {
    strategy: JourneyConfig;
    migration: JourneyConfig;
    optimization: JourneyConfig;
  };
}

/**
 * Ecommerce Ops tab content configurations
 */
export interface EcommerceOpsTabContent {
  "order-routing": {
    title: string;
    description: string;
    benefits: string[];
    visual: {
      title: string;
      steps: VisualStep[];
    };
  };
  "inventory-sync": {
    title: string;
    description: string;
    benefits: string[];
    beforeAfter: BeforeAfterComparison;
  };
  "product-data": {
    title: string;
    description: string;
    benefits: string[];
    workflow: {
      title: string;
      stages: WorkflowStage[];
    };
  };
}

/**
 * Ecommerce Ops service specific data
 */
export interface EcommerceOpsServiceData extends ServicePageData {
  tabContent: EcommerceOpsTabContent;
}

/**
 * Web Design service specific data
 */
export interface WebDesignServiceData extends ServicePageData {
  designProcess: {
    steps: DesignProcessStep[];
  };
  platforms: PlatformConfig[];
  migrationSteps: MigrationPhase[];
}
