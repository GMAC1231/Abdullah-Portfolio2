"use client";

import { useEffect } from "react";

import {
  applyThemeToDocument,
  isThemeMode,
  THEMES,
  type ThemeMode,
} from "@/lib/themeRuntime";

const DESKTOP_INTERVAL_MS = 60_000;
const LOW_POWER_INTERVAL_MS = 90_000;
const RETRY_DELAY_MS = 8_000;
const RECENT_INTERACTION_MS = 10_000;
const TRANSITION_DURATION_MS = 550;

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

function isLowPowerDevice() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
    };
  };

  return (
    window.matchMedia("(max-width: 760px)").matches ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    navigator.hardwareConcurrency <= 4 ||
    nav.connection?.saveData === true
  );
}

export default function AutoThemeController() {
  useEffect(() => {
    const settings = readSettings();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect accessibility and data-saving preferences. Manual
    // theme switching remains available through the theme button.
    if (
      settings.autoThemeEnabled === false ||
      reducedMotion
    ) {
      return;
    }

    const root = document.documentElement;
    const interval = isLowPowerDevice()
      ? LOW_POWER_INTERVAL_MS
      : DESKTOP_INTERVAL_MS;

    let timerId: number | null = null;
    let cleanupTimerId: number | null = null;
    let lastInteractionAt = performance.now();

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

    const noteInteraction = () => {
      lastInteractionAt = performance.now();
    };

    const scheduleNextTheme = (delay = interval) => {
      clearRotationTimer();

      timerId = window.setTimeout(() => {
        const recentlyInteracting =
          performance.now() - lastInteractionAt <
          RECENT_INTERACTION_MS;

        if (
          document.hidden ||
          recentlyInteracting ||
          root.classList.contains("devos-booting")
        ) {
          scheduleNextTheme(RETRY_DELAY_MS);
          return;
        }

        const nextTheme = getNextTheme(
          getCurrentTheme(),
        );

        // BootLoader uses this marker to display the lightweight
        // transition loader rather than the longer first-load intro.
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

        // Automatic rotation does not overwrite the visitor's saved
        // manual theme preference.
        void nextLayout;
        scheduleNextTheme();
      }, delay);
    };

    const handleThemeChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<ThemeChangeDetail>;

      if (customEvent.detail?.source !== "automatic") {
        noteInteraction();
        scheduleNextTheme();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearRotationTimer();
        return;
      }

      noteInteraction();
      scheduleNextTheme();
    };

    window.addEventListener(
      "devos-theme-change",
      handleThemeChange,
    );
    window.addEventListener("pointerdown", noteInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", noteInteraction);
    window.addEventListener("scroll", noteInteraction, {
      passive: true,
    });

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
      window.removeEventListener(
        "pointerdown",
        noteInteraction,
      );
      window.removeEventListener(
        "keydown",
        noteInteraction,
      );
      window.removeEventListener(
        "scroll",
        noteInteraction,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  return null;
}
