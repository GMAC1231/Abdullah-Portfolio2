"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

import {
  applyThemeToDocument,
  isThemeMode,
  layoutForTheme,
  THEMES,
  type ThemeMode,
} from "@/lib/themeRuntime";

const labels: Record<ThemeMode, string> = {
  matrix: "Matrix Console",
  cyan: "Cyan Glass Dashboard",
  purple: "Purple Cosmic Studio",
  ember: "Ember Workshop",
  red: "Crimson Flux",
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("matrix");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const current = document.documentElement.dataset.theme;

      if (isThemeMode(current)) {
        setTheme(current);
      }
    });

    function syncTheme(event: Event) {
      const customEvent =
        event as CustomEvent<{ theme?: ThemeMode }>;

      const nextTheme = customEvent.detail?.theme;

      if (isThemeMode(nextTheme)) {
        setTheme(nextTheme);
      }
    }

    window.addEventListener(
      "devos-theme-change",
      syncTheme,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      window.removeEventListener(
        "devos-theme-change",
        syncTheme,
      );
    };
  }, []);

  function cycleTheme() {
    const index = THEMES.indexOf(theme);

    const nextTheme =
      THEMES[(index + 1) % THEMES.length];

    delete document.documentElement.dataset
      .themeChangeSource;

    const nextLayout =
      applyThemeToDocument(nextTheme);

    setTheme(nextTheme);

    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "portfolio-devos-settings",
        ) || "{}",
      ) as Record<string, unknown>;

      localStorage.setItem(
        "portfolio-devos-settings",
        JSON.stringify({
          ...saved,
          theme: nextTheme,
          accent: nextTheme,
          layout: nextLayout,
          runtimeVersion: 4.23,
        }),
      );
    } catch {
      localStorage.setItem(
        "portfolio-devos-settings",
        JSON.stringify({
          theme: nextTheme,
          accent: nextTheme,
          layout: layoutForTheme(nextTheme),
          runtimeVersion: 4.23,
        }),
      );
    }

    window.dispatchEvent(
      new CustomEvent("devos-theme-change", {
        detail: {
          theme: nextTheme,
          layout: nextLayout,
          source: "manual",
        },
      }),
    );

  }

  return (
    <button
      type="button"
      className="icon-button theme-cycle-button"
      onClick={cycleTheme}
      aria-label={
        `Change portfolio theme. Current theme: ${labels[theme]}`
      }
      title={
        `${labels[theme]} — click to rebuild the page in the next theme`
      }
    >
      <Palette size={18} />

      <span
        className="theme-cycle-indicator"
        aria-hidden="true"
      />
    </button>
  );
}