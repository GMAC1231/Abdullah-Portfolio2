"use client";

import { useEffect } from "react";

import {
  applyThemeToDocument,
  isThemeMode,
  THEMES,
  type ThemeMode,
} from "@/lib/themeRuntime";

const AUTO_THEME_INTERVAL_MS = 30_000;
const RETRY_WHILE_BOOTING_MS = 5_000;
const TRANSITION_DURATION_MS = 1_000;

type DevosSettings = {
  autoThemeEnabled?: boolean;
};

type ThemeChangeDetail = {
  theme?: ThemeMode;
  source?: "automatic" | "manual";
};

function readSettings(): DevosSettings {
  try {
    return JSON.parse(
      window.localStorage.getItem(
        "portfolio-devos-settings",
      ) || "{}",
    ) as DevosSettings;
  } catch {
    return {};
  }
}

function getCurrentTheme(): ThemeMode {
  const currentTheme =
    document.documentElement.dataset.theme;

  return isThemeMode(currentTheme)
    ? currentTheme
    : "matrix";
}

function getNextTheme(currentTheme: ThemeMode) {
  const currentIndex = THEMES.indexOf(currentTheme);

  return THEMES[(currentIndex + 1) % THEMES.length];
}

export default function AutoThemeController() {
  useEffect(() => {
    const settings = readSettings();

    // Automatic theme rotation is enabled by default. It can be
    // disabled later by saving autoThemeEnabled: false in the
    // existing portfolio-devos-settings object.
    if (settings.autoThemeEnabled === false) {
      return;
    }

    const root = document.documentElement;
    let timerId: number | null = null;
    let cleanupTimerId: number | null = null;

    const clearRotationTimer = () => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    };

    const clearTransitionTimer = () => {
      if (cleanupTimerId !== null) {
        window.clearTimeout(cleanupTimerId);
        cleanupTimerId = null;
      }
    };

    const scheduleNextTheme = (
      delay = AUTO_THEME_INTERVAL_MS,
    ) => {
      clearRotationTimer();

      timerId = window.setTimeout(() => {
        if (
          document.hidden ||
          root.classList.contains("devos-booting")
        ) {
          scheduleNextTheme(RETRY_WHILE_BOOTING_MS);
          return;
        }

        const nextTheme = getNextTheme(
          getCurrentTheme(),
        );

        root.dataset.themeChangeSource = "automatic";
        root.classList.add(
          "devos-auto-theme-transition",
        );

        const nextLayout =
          applyThemeToDocument(nextTheme);

        window.dispatchEvent(
          new CustomEvent<ThemeChangeDetail>(
            "devos-theme-change",
            {
              detail: {
                theme: nextTheme,
                source: "automatic",
              },
            },
          ),
        );

        clearTransitionTimer();

        cleanupTimerId = window.setTimeout(() => {
          root.classList.remove(
            "devos-auto-theme-transition",
          );

          if (
            root.dataset.themeChangeSource ===
            "automatic"
          ) {
            delete root.dataset.themeChangeSource;
          }
        }, TRANSITION_DURATION_MS);

        // Automatic changes are intentionally not written to
        // localStorage. A visitor's manually selected theme remains
        // their starting theme the next time the portfolio opens.
        void nextLayout;
        scheduleNextTheme();
      }, delay);
    };

    const handleThemeChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<ThemeChangeDetail>;

      // Reset the countdown after a manual selection so the chosen
      // theme remains visible for a full interval.
      if (customEvent.detail?.source !== "automatic") {
        scheduleNextTheme();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearRotationTimer();
        return;
      }

      scheduleNextTheme();
    };

    window.addEventListener(
      "devos-theme-change",
      handleThemeChange,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    scheduleNextTheme();

    return () => {
      clearRotationTimer();
      clearTransitionTimer();

      root.classList.remove(
        "devos-auto-theme-transition",
      );

      if (
        root.dataset.themeChangeSource ===
        "automatic"
      ) {
        delete root.dataset.themeChangeSource;
      }

      window.removeEventListener(
        "devos-theme-change",
        handleThemeChange,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  return null;
}
