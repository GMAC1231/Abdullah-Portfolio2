export type ThemeMode = "matrix" | "cyan" | "purple" | "ember" | "red";
export type LayoutMode = "classic" | "console" | "arcade" | "minimal";

export const THEMES: ThemeMode[] = ["matrix", "cyan", "purple", "ember", "red"];
export const LAYOUTS: LayoutMode[] = ["classic", "console", "arcade", "minimal"];

export const THEME_LAYOUT_MAP: Record<ThemeMode, LayoutMode> = {
  matrix: "console",
  cyan: "classic",
  purple: "arcade",
  ember: "minimal",
  red: "classic",
};

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && THEMES.includes(value as ThemeMode);
}

export function isLayoutMode(value: unknown): value is LayoutMode {
  return typeof value === "string" && LAYOUTS.includes(value as LayoutMode);
}

export function layoutForTheme(theme: ThemeMode): LayoutMode {
  return THEME_LAYOUT_MAP[theme];
}

export function applyThemeToDocument(theme: ThemeMode) {
  const layout = layoutForTheme(theme);
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.dataset.accent = theme;
  root.dataset.layout = layout;
  root.dataset.themeLayout = layout;

  return layout;
}
