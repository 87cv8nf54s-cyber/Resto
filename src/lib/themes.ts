export type ColorTheme = "beige" | "blue" | "green" | "red" | "yellow" | "orange";
export type TemplateStyle = "resto" | "sushi" | "thai";

export const colorThemes: Record<ColorTheme, {
  accent: string;
  accentLight: string;
  accentDark: string;
}> = {
  beige: {
    accent: "#c9b99a",
    accentLight: "#e8dcc8",
    accentDark: "#a89970",
  },
  blue: {
    accent: "#3b82f6",
    accentLight: "#93c5fd",
    accentDark: "#1d4ed8",
  },
  green: {
    accent: "#22c55e",
    accentLight: "#86efac",
    accentDark: "#15803d",
  },
  red: {
    accent: "#ef4444",
    accentLight: "#fca5a5",
    accentDark: "#b91c1c",
  },
  yellow: {
    accent: "#eab308",
    accentLight: "#fde047",
    accentDark: "#a16207",
  },
  orange: {
    accent: "#f97316",
    accentLight: "#fdba74",
    accentDark: "#c2410c",
  },
};

export function getThemeCSSVariables(theme: ColorTheme): Record<string, string> {
  const colors = colorThemes[theme] || colorThemes.beige;
  return {
    "--color-accent": colors.accent,
    "--color-accent-light": colors.accentLight,
    "--color-accent-dark": colors.accentDark,
  };
}
