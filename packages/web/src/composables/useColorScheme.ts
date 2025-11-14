/**
 * Color scheme composable for consistent theming across components
 * Provides color classes for text, background, border, and other utilities
 */

export type ColorScheme = "cyan" | "emerald" | "purple" | "orange" | "teal";

interface ColorClasses {
  text: string;
  textMuted: string;
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  gradient: string;
  ring: string;
}

/**
 * Get color classes for a given color scheme
 * @param scheme - The color scheme to use
 * @returns Object containing themed color classes
 */
export function useColorScheme(scheme: ColorScheme): ColorClasses {
  const colorMaps: Record<ColorScheme, ColorClasses> = {
    cyan: {
      text: "text-cyan-400",
      textMuted: "text-cyan-500",
      bg: "bg-cyan-500/10",
      bgHover: "hover:bg-cyan-500/20",
      border: "border-cyan-500/30",
      borderHover: "hover:border-cyan-400",
      gradient: "from-cyan-400 to-purple-400",
      ring: "focus:ring-cyan-500",
    },
    emerald: {
      text: "text-emerald-400",
      textMuted: "text-emerald-500",
      bg: "bg-emerald-500/10",
      bgHover: "hover:bg-emerald-500/20",
      border: "border-emerald-500/30",
      borderHover: "hover:border-emerald-400",
      gradient: "from-emerald-400 to-teal-400",
      ring: "focus:ring-emerald-500",
    },
    purple: {
      text: "text-purple-400",
      textMuted: "text-purple-500",
      bg: "bg-purple-500/10",
      bgHover: "hover:bg-purple-500/20",
      border: "border-purple-500/30",
      borderHover: "hover:border-purple-400",
      gradient: "from-purple-400 to-pink-400",
      ring: "focus:ring-purple-500",
    },
    orange: {
      text: "text-orange-400",
      textMuted: "text-orange-500",
      bg: "bg-orange-500/10",
      bgHover: "hover:bg-orange-500/20",
      border: "border-orange-500/30",
      borderHover: "hover:border-orange-400",
      gradient: "from-orange-400 to-red-400",
      ring: "focus:ring-orange-500",
    },
    teal: {
      text: "text-teal-400",
      textMuted: "text-teal-500",
      bg: "bg-teal-500/10",
      bgHover: "hover:bg-teal-500/20",
      border: "border-teal-500/30",
      borderHover: "hover:border-teal-400",
      gradient: "from-teal-400 to-cyan-400",
      ring: "focus:ring-teal-500",
    },
  };

  return colorMaps[scheme];
}
