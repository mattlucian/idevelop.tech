import type { Component } from "vue";
import {
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BeakerIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
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
  ServerStackIcon,
  BoltIcon,
  CommandLineIcon,
  TagIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
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
  Cog6ToothIcon,
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
  ServerStackIcon,
  BoltIcon,
  CommandLineIcon,
  TagIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
};

/**
 * Get a Heroicon component by name
 * Returns undefined if icon name not found
 */
export function getIconByName(iconName: string): Component | undefined {
  return iconMap[iconName];
}

/**
 * Resolve each item's icon name to its component, keeping the other fields
 */
export function withIcons<T extends { icon: string }>(
  items: T[],
): (T & { iconComponent: Component | undefined })[] {
  return items.map((item) => ({
    ...item,
    iconComponent: getIconByName(item.icon),
  }));
}
