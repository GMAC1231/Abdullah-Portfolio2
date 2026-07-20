"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ThemeName = "matrix" | "cyan" | "purple" | "ember" | "red";

type MatrixDrop = {
  x: number;
  y: number;
  speed: number;
  length: number;
  values: string[];
};

type NetworkNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  twinkle: number;
};

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
};

type RedParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
};

type ThemeProfile = {
  label: string;
  title: string;
  engine: string;
  footer: string;
  logs: string[];
  stages: Array<{ at: number; label: string }>;
};

const BOOT_DURATION = 4300;
const EXIT_DURATION = 720;
const VALID_THEMES: ThemeName[] = [
  "matrix",
  "cyan",
  "purple",
  "ember",
  "red",
];

const THEME_PROFILES: Record<ThemeName, ThemeProfile> = {
  matrix: {
    label: "MATRIX // BINARY RAIN",
    title: "Entering the matrix",
    engine: "BINARY_STREAM + KERNEL_LINK",
    footer: "MATRIX RAIN ENGINE ONLINE",
    logs: [
      "binary stream..................online",
      "cipher modules.................loaded",
      "terminal runtime...............ready",
      "portfolio shell................mounted",
    ],
    stages: [
      { at: 0, label: "Initializing Matrix kernel" },
      { at: 18, label: "Decrypting binary modules" },
      { at: 36, label: "Linking terminal commands" },
      { at: 56, label: "Mounting project records" },
      { at: 76, label: "Running cipher diagnostics" },
      { at: 94, label: "Opening Abdullah.dev" },
    ],
  },
  cyan: {
    label: "CYAN // DATA NETWORK",
    title: "Linking the network",
    engine: "NODE_GRAPH + SCAN_GRID",
    footer: "DATA-LINK NETWORK SYNCHRONIZED",
    logs: [
      "node graph.....................linked",
      "glass interface................stable",
      "data channels..................open",
      "dashboard runtime..............ready",
    ],
    stages: [
      { at: 0, label: "Initializing cyan network" },
      { at: 18, label: "Discovering data nodes" },
      { at: 36, label: "Linking interface channels" },
      { at: 56, label: "Synchronizing dashboards" },
      { at: 76, label: "Scanning connected modules" },
      { at: 94, label: "Launching Abdullah.dev" },
    ],
  },
  purple: {
    label: "PURPLE // COSMIC FIELD",
    title: "Mapping the cosmos",
    engine: "STAR_FIELD + ORBIT_ENGINE",
    footer: "COSMIC ORBIT FIELD STABILIZED",
    logs: [
      "star field.....................mapped",
      "orbital paths..................aligned",
      "creative modules...............loaded",
      "studio runtime.................ready",
    ],
    stages: [
      { at: 0, label: "Initializing cosmic field" },
      { at: 18, label: "Mapping stellar coordinates" },
      { at: 36, label: "Aligning orbital systems" },
      { at: 56, label: "Loading creative modules" },
      { at: 76, label: "Stabilizing constellation" },
      { at: 94, label: "Revealing Abdullah.dev" },
    ],
  },
  ember: {
    label: "EMBER // FORGE CORE",
    title: "Igniting the forge",
    engine: "THERMAL_WAVE + SPARK_CORE",
    footer: "EMBER FORGE CORE AT TEMPERATURE",
    logs: [
      "thermal renderer...............stable",
      "spark chamber..................active",
      "toolchain manifest.............loaded",
      "forge runtime..................ready",
    ],
    stages: [
      { at: 0, label: "Igniting forge core" },
      { at: 18, label: "Heating interface modules" },
      { at: 36, label: "Loading toolchain manifest" },
      { at: 56, label: "Forging project components" },
      { at: 76, label: "Testing thermal stability" },
      { at: 94, label: "Opening Abdullah.dev" },
    ],
  },
  red: {
    label: "RED // CRIMSON FLUX",
    title: "Charging crimson flux",
    engine: "CRIMSON_GRID + PULSE_CORE",
    footer: "CRIMSON FLUX CHANNEL ESTABLISHED",
    logs: [
      "crimson grid...................charged",
      "pulse core.....................stable",
      "flux channels..................open",
      "studio runtime.................ready",
    ],
    stages: [
      { at: 0, label: "Charging crimson core" },
      { at: 18, label: "Calibrating pulse channels" },
      { at: 36, label: "Building red interface grid" },
      { at: 56, label: "Loading portfolio modules" },
      { at: 76, label: "Running flux diagnostics" },
      { at: 94, label: "Launching Abdullah.dev" },
    ],
  },
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function binaryValue() {
  return Math.random() > 0.5 ? "1" : "0";
}

function isThemeName(value: string | undefined): value is ThemeName {
  return VALID_THEMES.includes(value as ThemeName);
}

function readActiveTheme(): ThemeName {
  const dataTheme = document.documentElement.dataset.theme;

  if (isThemeName(dataTheme)) {
    return dataTheme;
  }

  try {
    const savedRuntime = JSON.parse(
      window.localStorage.getItem(
        "portfolio-devos-settings",
      ) || "{}",
    ) as {
      theme?: string;
      accent?: string;
    };

    const savedTheme =
      savedRuntime.theme || savedRuntime.accent;

    if (isThemeName(savedTheme)) {
      return savedTheme;
    }
  } catch {
    // Ignore malformed saved settings and use the fallback below.
  }

  const legacyTheme =
    window.localStorage.getItem("devos-theme");

  if (isThemeName(legacyTheme ?? undefined)) {
    return legacyTheme as ThemeName;
  }

  return "matrix";
}

function stageForProgress(theme: ThemeName, progress: number) {
  let stage = THEME_PROFILES[theme].stages[0];

  for (const candidate of THEME_PROFILES[theme].stages) {
    if (progress >= candidate.at) {
      stage = candidate;
    }
  }

  return stage.label;
}

export default function BootLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const leavingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const activeThemeRef = useRef<ThemeName>("matrix");

  const [theme, setTheme] = useState<ThemeName>("matrix");
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState(0);

  const finish = useCallback(() => {
    if (leavingRef.current) {
      return;
    }

    leavingRef.current = true;
    setProgress(100);
    progressRef.current = 100;
    setLeaving(true);

    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("devos-booting");
      document.body.classList.remove("devos-booting");
    }, EXIT_DURATION);
  }, []);

  const replay = useCallback(() => {
    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
    }

    const activeTheme = readActiveTheme();

    activeThemeRef.current = activeTheme;
    setTheme(activeTheme);
    progressRef.current = 0;
    leavingRef.current = false;
    setProgress(0);
    setLeaving(false);
    setVisible(true);
    setRunId((current) => current + 1);
  }, []);

  useEffect(() => {
    const initialTheme = readActiveTheme();

    activeThemeRef.current = initialTheme;

    const initialThemeFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    const activateThemeLoader = () => {
      const nextTheme = readActiveTheme();

      if (nextTheme === activeThemeRef.current) {
        return;
      }

      activeThemeRef.current = nextTheme;
      setTheme(nextTheme);

      /*
       * The first loader may already be hidden.
       * Reset and replay it whenever the active theme changes.
       */
      replay();
    };

    const observer = new MutationObserver(
      activateThemeLoader,
    );

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener(
      "devos-theme-change",
      activateThemeLoader,
    );

    return () => {
      window.cancelAnimationFrame(initialThemeFrame);
      observer.disconnect();

      window.removeEventListener(
        "devos-theme-change",
        activateThemeLoader,
      );
    };
  }, [replay]);

  useEffect(() => {
    const handleReplay = () => replay();
    window.addEventListener("devos-replay-boot", handleReplay);

    return () => {
      window.removeEventListener("devos-replay-boot", handleReplay);
    };
  }, [replay]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    document.documentElement.classList.add("devos-booting");
    document.body.classList.add("devos-booting");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        finish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finish, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return;
    }

    const drawingContext = context;
    const canvasElement = canvas;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let startedAt = performance.now();
    let previousTime = startedAt;
    let lastProgress = -1;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let matrixDrops: MatrixDrop[] = [];
    let nodes: NetworkNode[] = [];
    let stars: Star[] = [];
    let embers: Ember[] = [];
    let redParticles: RedParticle[] = [];

    function createMatrixDrop(index: number, spacing: number): MatrixDrop {
      const length = 7 + Math.floor(Math.random() * 18);

      return {
        x: index * spacing + randomBetween(-5, 5),
        y: randomBetween(-height, height),
        speed: randomBetween(90, 250),
        length,
        values: Array.from({ length }, binaryValue),
      };
    }

    function createNode(): NetworkNode {
      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-12, 12),
        vy: randomBetween(-9, 9),
        radius: randomBetween(1.4, 3.3),
        pulse: randomBetween(0, Math.PI * 2),
      };
    }

    function createStar(): Star {
      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        radius: randomBetween(0.5, 2.2),
        alpha: randomBetween(0.2, 0.9),
        speed: randomBetween(2, 12),
        twinkle: randomBetween(0, Math.PI * 2),
      };
    }

    function createEmber(initial = false): Ember {
      const maxLife = randomBetween(1.8, 4.4);

      return {
        x: randomBetween(0, width),
        y: initial ? randomBetween(height * 0.55, height) : height + 20,
        vx: randomBetween(-18, 18),
        vy: randomBetween(-70, -170),
        size: randomBetween(0.8, 3.1),
        life: initial ? randomBetween(0, maxLife) : maxLife,
        maxLife,
      };
    }

    function createRedParticle(): RedParticle {
      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-24, 24),
        vy: randomBetween(-18, 18),
        size: randomBetween(1, 3.8),
        pulse: randomBetween(0, Math.PI * 2),
      };
    }

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawingContext.textAlign = "center";
      drawingContext.textBaseline = "middle";

      const spacing = width < 700 ? 24 : 29;

      matrixDrops = Array.from(
        { length: Math.ceil(width / spacing) + 1 },
        (_, index) => createMatrixDrop(index, spacing),
      );

      nodes = Array.from(
        { length: width < 700 ? 24 : 42 },
        createNode,
      );

      stars = Array.from(
        { length: width < 700 ? 70 : 135 },
        createStar,
      );

      embers = Array.from(
        { length: width < 700 ? 38 : 72 },
        () => createEmber(true),
      );

      redParticles = Array.from(
        { length: width < 700 ? 30 : 58 },
        createRedParticle,
      );
    }

    function drawBackground(activeTheme: ThemeName) {
      const backgrounds: Record<
        ThemeName,
        [string, string, string]
      > = {
        matrix: ["#010805", "#03130b", "#06180e"],
        cyan: ["#020b13", "#061b2b", "#071325"],
        purple: ["#080412", "#170928", "#2a103e"],
        ember: ["#0d0602", "#241006", "#3a1607"],
        red: ["#080405", "#19070c", "#300912"],
      };

      const [start, middle, end] = backgrounds[activeTheme];
      const gradient = drawingContext.createLinearGradient(
        0,
        0,
        width,
        height,
      );

      gradient.addColorStop(0, start);
      gradient.addColorStop(0.5, middle);
      gradient.addColorStop(1, end);

      drawingContext.globalAlpha = 1;
      drawingContext.fillStyle = gradient;
      drawingContext.fillRect(0, 0, width, height);
    }

    function drawMatrix(deltaSeconds: number, elapsed: number) {
      const fontSize = width < 700 ? 13 : 15;

      drawingContext.font =
        `600 ${fontSize}px Consolas, "JetBrains Mono", monospace`;

      for (const drop of matrixDrops) {
        drop.y += drop.speed * deltaSeconds;

        if (Math.random() < 0.09) {
          const index = Math.floor(Math.random() * drop.values.length);
          drop.values[index] = binaryValue();
        }

        for (let index = 0; index < drop.length; index += 1) {
          const y = drop.y - index * fontSize;

          if (y < -fontSize || y > height + fontSize) {
            continue;
          }

          const trail = 1 - index / drop.length;
          const isHead = index === 0;

          drawingContext.globalAlpha = isHead
            ? 0.94
            : Math.max(0.025, trail * 0.38);

          drawingContext.fillStyle = isHead ? "#e7fff0" : "#39ff88";
          drawingContext.shadowColor = "rgba(57, 255, 136, 0.86)";
          drawingContext.shadowBlur = isHead ? 11 : 3;
          drawingContext.fillText(drop.values[index], drop.x, y);
        }

        if (drop.y - drop.length * fontSize > height) {
          drop.y = randomBetween(-height * 0.8, -40);
          drop.speed = randomBetween(90, 250);
        }
      }

      drawingContext.globalAlpha =
        0.1 + Math.sin(elapsed * 0.0016) * 0.035;

      drawingContext.fillStyle = "#39ff88";
      drawingContext.fillRect(
        0,
        (elapsed * 0.15) % height,
        width,
        1,
      );

      drawingContext.shadowBlur = 0;
      drawingContext.globalAlpha = 1;
    }

    function drawCyanNetwork(
      deltaSeconds: number,
      elapsed: number,
    ) {
      for (const node of nodes) {
        node.x += node.vx * deltaSeconds;
        node.y += node.vy * deltaSeconds;
        node.pulse += deltaSeconds * 1.6;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      drawingContext.lineWidth = 0.8;

      for (let first = 0; first < nodes.length; first += 1) {
        for (
          let second = first + 1;
          second < nodes.length;
          second += 1
        ) {
          const dx = nodes[first].x - nodes[second].x;
          const dy = nodes[first].y - nodes[second].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 140) {
            drawingContext.globalAlpha =
              (1 - distance / 140) * 0.3;

            drawingContext.strokeStyle = "#22d3ee";
            drawingContext.beginPath();
            drawingContext.moveTo(nodes[first].x, nodes[first].y);
            drawingContext.lineTo(nodes[second].x, nodes[second].y);
            drawingContext.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse =
          1 + Math.sin(node.pulse + elapsed * 0.001) * 0.35;

        drawingContext.globalAlpha = 0.78;
        drawingContext.fillStyle = "#67e8f9";
        drawingContext.shadowColor = "rgba(34, 211, 238, 0.9)";
        drawingContext.shadowBlur = 11;
        drawingContext.beginPath();
        drawingContext.arc(
          node.x,
          node.y,
          node.radius * pulse,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      const scanY = (elapsed * 0.18) % (height + 120) - 60;
      const scanner = drawingContext.createLinearGradient(
        0,
        scanY - 42,
        0,
        scanY + 42,
      );

      scanner.addColorStop(0, "rgba(34, 211, 238, 0)");
      scanner.addColorStop(0.5, "rgba(34, 211, 238, 0.13)");
      scanner.addColorStop(1, "rgba(34, 211, 238, 0)");

      drawingContext.globalAlpha = 1;
      drawingContext.fillStyle = scanner;
      drawingContext.fillRect(0, scanY - 42, width, 84);
      drawingContext.shadowBlur = 0;
    }

    function drawPurpleCosmos(
      deltaSeconds: number,
      elapsed: number,
    ) {
      for (const star of stars) {
        star.y += star.speed * deltaSeconds;
        star.twinkle += deltaSeconds * 1.7;

        if (star.y > height + 5) {
          star.y = -5;
          star.x = randomBetween(0, width);
        }

        const twinkle =
          star.alpha *
          (0.68 + Math.sin(star.twinkle) * 0.32);

        drawingContext.globalAlpha = twinkle;
        drawingContext.fillStyle =
          star.radius > 1.6 ? "#f0abfc" : "#ddd6fe";

        drawingContext.shadowColor = "rgba(192, 132, 252, 0.75)";
        drawingContext.shadowBlur = star.radius > 1.6 ? 9 : 3;
        drawingContext.beginPath();
        drawingContext.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      const centerX = width * 0.72;
      const centerY = height * 0.3;

      for (let orbit = 0; orbit < 4; orbit += 1) {
        const radiusX = 80 + orbit * 58;
        const radiusY = 35 + orbit * 26;

        drawingContext.globalAlpha = 0.12 - orbit * 0.015;
        drawingContext.strokeStyle =
          orbit % 2 === 0 ? "#c084fc" : "#f472b6";

        drawingContext.lineWidth = 1;
        drawingContext.beginPath();
        drawingContext.ellipse(
          centerX,
          centerY,
          radiusX,
          radiusY,
          -0.35,
          0,
          Math.PI * 2,
        );
        drawingContext.stroke();

        const angle = elapsed * 0.00045 * (orbit + 1);
        const particleX =
          centerX + Math.cos(angle) * radiusX;
        const particleY =
          centerY + Math.sin(angle) * radiusY;

        drawingContext.globalAlpha = 0.85;
        drawingContext.fillStyle =
          orbit % 2 === 0 ? "#f0abfc" : "#f9a8d4";

        drawingContext.shadowColor =
          "rgba(240, 171, 252, 0.9)";

        drawingContext.shadowBlur = 12;
        drawingContext.beginPath();
        drawingContext.arc(
          particleX,
          particleY,
          2.5,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      drawingContext.globalAlpha = 1;
      drawingContext.shadowBlur = 0;
    }

    function drawEmberForge(
      deltaSeconds: number,
      elapsed: number,
    ) {
      const baseY = height * 0.79;

      for (let wave = 0; wave < 5; wave += 1) {
        drawingContext.beginPath();

        const amplitude = 8 + wave * 5;
        const frequency = 0.008 + wave * 0.0014;
        const phase =
          elapsed * (0.0011 + wave * 0.00018);

        for (let x = -20; x <= width + 20; x += 8) {
          const y =
            baseY +
            wave * 22 +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * 0.0035 - phase * 1.4) * 5;

          if (x === -20) {
            drawingContext.moveTo(x, y);
          } else {
            drawingContext.lineTo(x, y);
          }
        }

        drawingContext.globalAlpha = 0.18 - wave * 0.019;
        drawingContext.strokeStyle =
          wave % 2 === 0 ? "#fb923c" : "#fbbf24";

        drawingContext.lineWidth = 1.5;
        drawingContext.shadowColor =
          "rgba(251, 146, 60, 0.75)";

        drawingContext.shadowBlur = 12;
        drawingContext.stroke();
      }

      for (const ember of embers) {
        ember.life -= deltaSeconds;
        ember.x += ember.vx * deltaSeconds;
        ember.y += ember.vy * deltaSeconds;

        if (ember.life <= 0 || ember.y < height * 0.2) {
          Object.assign(ember, createEmber(false));
        }

        const lifeRatio = Math.max(
          0,
          ember.life / ember.maxLife,
        );

        drawingContext.globalAlpha = lifeRatio * 0.78;
        drawingContext.fillStyle =
          lifeRatio > 0.65 ? "#fde68a" : "#fb923c";

        drawingContext.shadowColor =
          "rgba(251, 146, 60, 0.92)";

        drawingContext.shadowBlur = 9;
        drawingContext.beginPath();
        drawingContext.arc(
          ember.x,
          ember.y,
          ember.size,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      drawingContext.globalAlpha = 1;
      drawingContext.shadowBlur = 0;
    }

    function drawRedFlux(
      deltaSeconds: number,
      elapsed: number,
    ) {
      drawingContext.lineWidth = 0.7;

      for (const particle of redParticles) {
        particle.x += particle.vx * deltaSeconds;
        particle.y += particle.vy * deltaSeconds;
        particle.pulse += deltaSeconds * 2;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      }

      for (
        let first = 0;
        first < redParticles.length;
        first += 1
      ) {
        for (
          let second = first + 1;
          second < redParticles.length;
          second += 1
        ) {
          const dx =
            redParticles[first].x - redParticles[second].x;

          const dy =
            redParticles[first].y - redParticles[second].y;

          const distance = Math.hypot(dx, dy);

          if (distance < 125) {
            drawingContext.globalAlpha =
              (1 - distance / 125) * 0.22;

            drawingContext.strokeStyle = "#ef233c";
            drawingContext.beginPath();
            drawingContext.moveTo(
              redParticles[first].x,
              redParticles[first].y,
            );
            drawingContext.lineTo(
              redParticles[second].x,
              redParticles[second].y,
            );
            drawingContext.stroke();
          }
        }
      }

      for (const particle of redParticles) {
        const pulse =
          1 + Math.sin(particle.pulse) * 0.32;

        drawingContext.globalAlpha = 0.8;
        drawingContext.fillStyle =
          particle.size > 2.4 ? "#ffb4c0" : "#ff4d67";

        drawingContext.shadowColor =
          "rgba(239, 35, 60, 0.95)";

        drawingContext.shadowBlur = 12;
        drawingContext.beginPath();
        drawingContext.arc(
          particle.x,
          particle.y,
          particle.size * pulse,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const pulseRadius =
        90 + ((elapsed * 0.06) % Math.max(width, height));

      drawingContext.globalAlpha =
        Math.max(0, 0.22 - pulseRadius / 2600);

      drawingContext.strokeStyle = "#ff4d67";
      drawingContext.lineWidth = 1.2;
      drawingContext.beginPath();
      drawingContext.arc(
        centerX,
        centerY,
        pulseRadius,
        0,
        Math.PI * 2,
      );
      drawingContext.stroke();

      const scanX = (elapsed * 0.23) % (width + 160) - 80;
      const laser = drawingContext.createLinearGradient(
        scanX - 55,
        0,
        scanX + 55,
        0,
      );

      laser.addColorStop(0, "rgba(239, 35, 60, 0)");
      laser.addColorStop(0.5, "rgba(255, 77, 103, 0.12)");
      laser.addColorStop(1, "rgba(239, 35, 60, 0)");

      drawingContext.globalAlpha = 1;
      drawingContext.fillStyle = laser;
      drawingContext.fillRect(scanX - 55, 0, 110, height);
      drawingContext.shadowBlur = 0;
    }

    function draw(time: number) {
      const elapsed = time - startedAt;
      const deltaSeconds = Math.min(
        (time - previousTime) / 1000,
        0.05,
      );

      previousTime = time;

      const duration = reducedMotion ? 1400 : BOOT_DURATION;
      const rawProgress = Math.min(1, elapsed / duration);
      const easedProgress =
        1 - Math.pow(1 - rawProgress, 2.2);

      const progressValue = Math.min(
        100,
        Math.floor(easedProgress * 100),
      );

      if (progressValue !== lastProgress) {
        lastProgress = progressValue;
        progressRef.current = progressValue;
        setProgress(progressValue);
      }

      drawBackground(theme);

      switch (theme) {
        case "matrix":
          drawMatrix(deltaSeconds, elapsed);
          break;

        case "cyan":
          drawCyanNetwork(deltaSeconds, elapsed);
          break;

        case "purple":
          drawPurpleCosmos(deltaSeconds, elapsed);
          break;

        case "ember":
          drawEmberForge(deltaSeconds, elapsed);
          break;

        case "red":
          drawRedFlux(deltaSeconds, elapsed);
          break;
      }

      if (rawProgress >= 1) {
        finish();
        return;
      }

      frameId = window.requestAnimationFrame(draw);
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        startedAt =
          performance.now() -
          (progressRef.current / 100) * BOOT_DURATION;

        previousTime = performance.now();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [finish, runId, theme, visible]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }

      document.documentElement.classList.remove("devos-booting");
      document.body.classList.remove("devos-booting");
    };
  }, []);

  if (!visible) {
    return null;
  }

  const profile = THEME_PROFILES[theme];
  const stage = stageForProgress(theme, progress);

  const visibleLogs = Math.min(
    profile.logs.length,
    Math.max(
      1,
      Math.ceil((progress / 100) * profile.logs.length),
    ),
  );

  return (
    <div
      className={[
        "theme-boot",
        `theme-boot--${theme}`,
        leaving ? "is-leaving" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-boot-theme={theme}
      role="status"
      aria-live="polite"
      aria-label={`${profile.label}: ${progress}%`}
    >
      <canvas
        ref={canvasRef}
        className="theme-boot__canvas"
      />

      <div className="theme-boot__vignette" />
      <div className="theme-boot__scanlines" />

      <div className="theme-boot__hud">
        <div className="theme-boot__topline">
          <span>{profile.label}</span>
          <span>DEVOS BUILD 4.26</span>
        </div>

        <div className="theme-boot__center-layer">
          <div
            key={`${theme}-${runId}`}
            className="theme-boot__panel"
          >
          <div
            className="theme-boot__core"
            aria-hidden="true"
          >
            <span className="theme-boot__orbit theme-boot__orbit--one" />
            <span className="theme-boot__orbit theme-boot__orbit--two" />
            <span className="theme-boot__core-mark">
              &lt;/&gt;
            </span>
          </div>

          <p className="theme-boot__eyebrow">
            ABDULLAH MUHAMMAD // DEVELOPER PORTFOLIO
          </p>

          <h1>{profile.title}</h1>

          <p className="theme-boot__stage">
            {stage}
          </p>

          <div
            className="theme-boot__progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="theme-boot__progress-row">
            <span>
              {String(progress).padStart(3, "0")}%
            </span>

            <span>{profile.engine}</span>
          </div>

          <div
            className="theme-boot__logs"
            aria-hidden="true"
          >
            {profile.logs
              .slice(0, visibleLogs)
              .map((line, index) => (
                <div key={line}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <code>{line}</code>
                  <strong>OK</strong>
                </div>
              ))}
          </div>

          <button
            type="button"
            className="theme-boot__skip"
            onClick={finish}
          >
            Skip intro <kbd>Enter</kbd>
          </button>
          </div>
        </div>

        <div className="theme-boot__footer">
          <span>
            REACT // NEXT.JS // FIREBASE // FLUTTER
          </span>

          <span>{profile.footer}</span>
        </div>
      </div>
    </div>
  );
}