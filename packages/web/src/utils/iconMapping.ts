import type { Component } from "vue";
import {
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BeakerIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  LinkIcon,
  ShoppingCartIcon,
  SparklesIcon,
  CloudIcon,
  ShoppingBagIcon,
  CubeIcon,
  TruckIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";

/**
 * Maps icon name strings to Heroicon components
 * This allows data files to reference icons by name without importing them
 */
export const iconMap: Record<string, Component> = {
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BeakerIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  LinkIcon,
  ShoppingCartIcon,
  SparklesIcon,
  CloudIcon,
  ShoppingBagIcon,
  CubeIcon,
  TruckIcon,
  ClockIcon,
  UserGroupIcon,
};

/**
 * Get a Heroicon component by name
 * Returns undefined if icon name not found
 */
export function getIconByName(iconName: string): Component | undefined {
  return iconMap[iconName];
}
