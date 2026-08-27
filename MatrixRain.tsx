"use client";

import { useEffect, useRef } from "react";

type ThemeName = "matrix" | "cyan" | "purple" | "ember" | "red";
type WeatherMode = "clear" | "rain" | "wind" | "summer" | "storm" | "snow";

type MatrixColumn = {
  x: number;
  y: number;
  speed: number;
  trailLength: number;
  characters: string[];
  changeTimer: number;
};

type CyanNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type PurpleStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  twinkleSpeed: number;
};

type PurpleOrbiter = {
  radiusX: number;
  radiusY: number;
  angle: number;
  speed: number;
  size: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type EmberParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  phase: number;
};

type RainDrop = {
  x: number;
  y: number;
  speed: number;
  length: number;
  drift: number;
  alpha: number;
};

type WindTrail = {
  x: number;
  y: number;
  speed: number;
  length: number;
  phase: number;
  amplitude: number;
  alpha: number;
  leaf: boolean;
};

type SummerMote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

type SnowParticle = {
  x: number;
  y: number;
  speed: number;
  drift: number;
  size: number;
  phase: number;
};

const MATRIX_CHARACTERS = [
  "0",
  "1",
  "0",
  "1",
  "0",
  "1",
  "{",
  "}",
  "<",
  ">",
  "/",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomMatrixCharacter() {
  return MATRIX_CHARACTERS[
    Math.floor(Math.random() * MATRIX_CHARACTERS.length)
  ];
}

function readTheme(): ThemeName {
  const value = document.documentElement.dataset.theme;

  if (
    value === "cyan" ||
    value === "purple" ||
    value === "ember" ||
    value === "red"
  ) {
    return value;
  }

  return "matrix";
}

function readWeather(): WeatherMode {
  const value = document.documentElement.dataset.weather;

  if (
    value === "rain" ||
    value === "wind" ||
    value === "summer" ||
    value === "storm" ||
    value === "snow"
  ) {
    return value;
  }

  return "clear";
}

function createMatrixColumn(
  index: number,
  fontSize: number,
  viewportHeight: number,
): MatrixColumn {
  const trailLength = 12 + Math.floor(Math.random() * 20);

  return {
    x: index * fontSize,
    y:
      Math.random() * (viewportHeight + trailLength * fontSize) -
      trailLength * fontSize,
    speed: randomBetween(125, 315),
    trailLength,
    characters: Array.from({ length: trailLength }, randomMatrixCharacter),
    changeTimer: randomBetween(0.03, 0.11),
  };
}

function createCyanNode(width: number, height: number): CyanNode {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-13, 13),
    vy: randomBetween(-9, 9),
    radius: randomBetween(1.4, 3.4),
    phase: Math.random() * Math.PI * 2,
  };
}

function createPurpleStar(width: number, height: number): PurpleStar {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-2.8, 2.8),
    vy: randomBetween(-1.8, 1.8),
    radius: randomBetween(0.5, 2.1),
    phase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(0.8, 2.6),
  };
}

function createPurpleOrbiter(width: number, height: number): PurpleOrbiter {
  const minDimension = Math.min(width, height);

  return {
    radiusX: randomBetween(minDimension * 0.1, minDimension * 0.48),
    radiusY: randomBetween(minDimension * 0.05, minDimension * 0.24),
    angle: Math.random() * Math.PI * 2,
    speed: randomBetween(-0.17, 0.17),
    size: randomBetween(1.3, 3.2),
  };
}

function createEmberParticle(
  width: number,
  height: number,
  initial = false,
): EmberParticle {
  const life = randomBetween(1.7, 4.8);

  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : height + randomBetween(5, 90),
    vx: randomBetween(-18, 18),
    vy: randomBetween(-58, -175),
    size: randomBetween(0.8, 3.4),
    life: initial ? Math.random() * life : life,
    maxLife: life,
    phase: Math.random() * Math.PI * 2,
  };
}

function createRainDrop(
  width: number,
  height: number,
  initial = false,
): RainDrop {
  return {
    x: randomBetween(-80, width + 80),
    y: initial ? Math.random() * height : randomBetween(-height * 0.35, -20),
    speed: randomBetween(430, 980),
    length: randomBetween(12, 34),
    drift: randomBetween(-70, -24),
    alpha: randomBetween(0.18, 0.62),
  };
}

function createWindTrail(
  width: number,
  height: number,
  initial = false,
): WindTrail {
  return {
    x: initial ? Math.random() * width : randomBetween(-260, -40),
    y: randomBetween(40, height - 30),
    speed: randomBetween(150, 430),
    length: randomBetween(45, 170),
    phase: Math.random() * Math.PI * 2,
    amplitude: randomBetween(4, 18),
    alpha: randomBetween(0.08, 0.36),
    leaf: Math.random() < 0.18,
  };
}

function createSummerMote(width: number, height: number): SummerMote {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-8, 15),
    vy: randomBetween(-13, 5),
    size: randomBetween(0.8, 3.5),
    phase: Math.random() * Math.PI * 2,
  };
}

function createSnowParticle(
  width: number,
  height: number,
  initial = false,
): SnowParticle {
  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : randomBetween(-120, -10),
    speed: randomBetween(24, 95),
    drift: randomBetween(-18, 18),
    size: randomBetween(1.2, 4.8),
    phase: Math.random() * Math.PI * 2,
  };
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const canvasElement = canvas;
    const drawingContext = context;

    let frameId = 0;
    let previousTime = performance.now();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fontSize = 18;
    let theme = readTheme();
    let weather = readWeather();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
    };
    const lowPower =
      window.innerWidth < 760 ||
      (nav.deviceMemory !== undefined &&
        nav.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4;
    const targetFrameMs = reducedMotion
      ? 100
      : lowPower
        ? 42
        : 32;

    let enabled =
      document.documentElement.dataset.matrix !== "off" &&
      !reducedMotion;
    let lastDrawAt = 0;
    let resizeTimerId: number | null = null;

    let matrixColumns: MatrixColumn[] = [];
    let cyanNodes: CyanNode[] = [];
    let purpleStars: PurpleStar[] = [];
    let purpleOrbiters: PurpleOrbiter[] = [];
    let shootingStar: ShootingStar | null = null;
    let emberParticles: EmberParticle[] = [];
    let rainDrops: RainDrop[] = [];
    let windTrails: WindTrail[] = [];
    let summerMotes: SummerMote[] = [];
    let snowParticles: SnowParticle[] = [];
    let nextLightningAt = performance.now() + randomBetween(1200, 3600);
    let lightningUntil = 0;

    function rebuildScene() {
      const qualityScale = lowPower ? 0.5 : 0.72;
      const matrixColumnCount = Math.ceil(width / fontSize) + 1;
      const cyanNodeCount = Math.round(
        Math.min(64, Math.max(24, Math.floor(width / 22))) *
          qualityScale,
      );
      const purpleStarCount = Math.round(
        Math.min(110, Math.max(44, Math.floor(width / 13))) *
          qualityScale,
      );
      const purpleOrbiterCount = Math.max(
        4,
        Math.round((width < 700 ? 7 : 12) * qualityScale),
      );
      const emberCount = Math.round(
        Math.min(88, Math.max(38, Math.floor(width / 16))) *
          qualityScale,
      );

      matrixColumns = Array.from({ length: matrixColumnCount }, (_, index) =>
        createMatrixColumn(index, fontSize, height),
      );

      cyanNodes = Array.from({ length: cyanNodeCount }, () =>
        createCyanNode(width, height),
      );

      purpleStars = Array.from({ length: purpleStarCount }, () =>
        createPurpleStar(width, height),
      );

      purpleOrbiters = Array.from({ length: purpleOrbiterCount }, () =>
        createPurpleOrbiter(width, height),
      );

      shootingStar = null;

      emberParticles = Array.from({ length: emberCount }, () =>
        createEmberParticle(width, height, true),
      );

      rainDrops = Array.from(
        {
          length: Math.round(
            (width < 700 ? 52 : 88) * qualityScale,
          ),
        },
        () => createRainDrop(width, height, true),
      );

      windTrails = Array.from(
        {
          length: Math.round(
            (width < 700 ? 12 : 22) * qualityScale,
          ),
        },
        () => createWindTrail(width, height, true),
      );

      summerMotes = Array.from(
        {
          length: Math.round(
            (width < 700 ? 24 : 44) * qualityScale,
          ),
        },
        () => createSummerMote(width, height),
      );

      snowParticles = Array.from(
        {
          length: Math.round(
            (width < 700 ? 38 : 70) * qualityScale,
          ),
        },
        () => createSnowParticle(width, height, true),
      );
    }

    function resizeCanvas() {
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        lowPower ? 1 : 1.35,
      );

      width = window.innerWidth;
      height = window.innerHeight;
      fontSize = width < 640 ? 17 : width < 1024 ? 18 : 20;

      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      rebuildScene();
    }

    function clearCanvas() {
      drawingContext.globalAlpha = 1;
      drawingContext.shadowBlur = 0;
      drawingContext.setLineDash([]);
      drawingContext.clearRect(0, 0, width, height);
    }

    function drawMatrix(deltaSeconds: number) {
      drawingContext.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", Consolas, monospace`;
      drawingContext.textAlign = "center";
      drawingContext.textBaseline = "middle";

      for (const column of matrixColumns) {
        column.y += column.speed * deltaSeconds;
        column.changeTimer -= deltaSeconds;

        if (column.changeTimer <= 0) {
          const characterIndex = Math.floor(
            Math.random() * column.characters.length,
          );

          column.characters[characterIndex] = randomMatrixCharacter();
          column.changeTimer = randomBetween(0.03, 0.1);
        }

        for (let index = 0; index < column.trailLength; index += 1) {
          const characterY = column.y - index * fontSize;

          if (characterY < -fontSize || characterY > height + fontSize) {
            continue;
          }

          const progress = 1 - index / Math.max(column.trailLength - 1, 1);
          const isHead = index === 0;

          drawingContext.globalAlpha = isHead
            ? 0.98
            : Math.max(0.025, progress * progress * 0.63);
          drawingContext.fillStyle = isHead ? "#effff4" : "#39ff88";
          drawingContext.shadowColor = "rgba(57, 255, 136, 0.92)";
          drawingContext.shadowBlur = isHead ? 15 : 5;
          drawingContext.fillText(
            column.characters[index],
            column.x + fontSize / 2,
            characterY,
          );
        }

        if (column.y > height + column.trailLength * fontSize) {
          const replacement = createMatrixColumn(
            Math.round(column.x / fontSize),
            fontSize,
            height,
          );

          column.y = -randomBetween(10, height * 0.7);
          column.speed = replacement.speed;
          column.trailLength = replacement.trailLength;
          column.characters = replacement.characters;
          column.changeTimer = replacement.changeTimer;
        }
      }
    }

    function drawCyan(deltaSeconds: number, time: number) {
      const gridSize = width < 700 ? 52 : 68;
      const gridOffset = (time * 0.018) % gridSize;

      drawingContext.save();
      drawingContext.lineWidth = 1;
      drawingContext.strokeStyle = "rgba(56, 189, 248, 0.075)";

      for (
        let x = -gridSize + gridOffset;
        x < width + gridSize;
        x += gridSize
      ) {
        drawingContext.beginPath();
        drawingContext.moveTo(x, 0);
        drawingContext.lineTo(x, height);
        drawingContext.stroke();
      }

      for (
        let y = -gridSize + gridOffset;
        y < height + gridSize;
        y += gridSize
      ) {
        drawingContext.beginPath();
        drawingContext.moveTo(0, y);
        drawingContext.lineTo(width, y);
        drawingContext.stroke();
      }

      const connectionDistance = width < 700 ? 105 : 145;

      for (let firstIndex = 0; firstIndex < cyanNodes.length; firstIndex += 1) {
        const first = cyanNodes[firstIndex];

        first.x += first.vx * deltaSeconds;
        first.y += first.vy * deltaSeconds;

        if (first.x < -20) first.x = width + 20;
        if (first.x > width + 20) first.x = -20;
        if (first.y < -20) first.y = height + 20;
        if (first.y > height + 20) first.y = -20;

        for (
          let secondIndex = firstIndex + 1;
          secondIndex < cyanNodes.length;
          secondIndex += 1
        ) {
          const second = cyanNodes[secondIndex];
          const distanceX = first.x - second.x;
          const distanceY = first.y - second.y;
          const distance = Math.hypot(distanceX, distanceY);

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.25;
            drawingContext.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            drawingContext.beginPath();
            drawingContext.moveTo(first.x, first.y);
            drawingContext.lineTo(second.x, second.y);
            drawingContext.stroke();
          }
        }
      }

      const scanY = ((time * 0.075) % (height + 180)) - 90;
      const scanGradient = drawingContext.createLinearGradient(
        0,
        scanY - 45,
        0,
        scanY + 45,
      );
      scanGradient.addColorStop(0, "rgba(34, 211, 238, 0)");
      scanGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.16)");
      scanGradient.addColorStop(1, "rgba(34, 211, 238, 0)");
      drawingContext.fillStyle = scanGradient;
      drawingContext.fillRect(0, scanY - 45, width, 90);

      for (const node of cyanNodes) {
        const pulse = 0.72 + Math.sin(time * 0.002 + node.phase) * 0.28;
        const radius = node.radius * pulse;

        drawingContext.globalAlpha = 0.78;
        drawingContext.fillStyle = "#a5f3fc";
        drawingContext.shadowColor = "rgba(34, 211, 238, 0.92)";
        drawingContext.shadowBlur = 14;
        drawingContext.beginPath();
        drawingContext.arc(node.x, node.y, radius, 0, Math.PI * 2);
        drawingContext.fill();

        drawingContext.globalAlpha = 0.18;
        drawingContext.strokeStyle = "#38bdf8";
        drawingContext.shadowBlur = 0;
        drawingContext.beginPath();
        drawingContext.arc(
          node.x,
          node.y,
          radius + 5 + pulse * 3,
          0,
          Math.PI * 2,
        );
        drawingContext.stroke();
      }

      drawingContext.restore();
    }

    function drawPurple(deltaSeconds: number, time: number) {
      const centerX = width * 0.5;
      const centerY = height * 0.46;
      const glow = drawingContext.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.62,
      );

      glow.addColorStop(0, "rgba(192, 132, 252, 0.075)");
      glow.addColorStop(0.45, "rgba(244, 114, 182, 0.035)");
      glow.addColorStop(1, "rgba(139, 92, 246, 0)");
      drawingContext.fillStyle = glow;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.save();
      drawingContext.lineWidth = 0.8;
      drawingContext.strokeStyle = "rgba(216, 180, 254, 0.09)";

      const orbitCount = width < 700 ? 3 : 5;
      for (let orbitIndex = 1; orbitIndex <= orbitCount; orbitIndex += 1) {
        drawingContext.beginPath();
        drawingContext.ellipse(
          centerX,
          centerY,
          orbitIndex * Math.min(width, height) * 0.09,
          orbitIndex * Math.min(width, height) * 0.042,
          -0.23,
          0,
          Math.PI * 2,
        );
        drawingContext.stroke();
      }

      for (const star of purpleStars) {
        star.x += star.vx * deltaSeconds;
        star.y += star.vy * deltaSeconds;

        if (star.x < -8) star.x = width + 8;
        if (star.x > width + 8) star.x = -8;
        if (star.y < -8) star.y = height + 8;
        if (star.y > height + 8) star.y = -8;

        const twinkle =
          0.35 +
          (Math.sin(time * 0.001 * star.twinkleSpeed + star.phase) + 1) * 0.3;

        drawingContext.globalAlpha = twinkle;
        drawingContext.fillStyle = star.radius > 1.6 ? "#f5d0fe" : "#c4b5fd";
        drawingContext.shadowColor = "rgba(192, 132, 252, 0.85)";
        drawingContext.shadowBlur = star.radius > 1.5 ? 9 : 3;
        drawingContext.beginPath();
        drawingContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        drawingContext.fill();
      }

      for (const orbiter of purpleOrbiters) {
        orbiter.angle += orbiter.speed * deltaSeconds;
        const x = centerX + Math.cos(orbiter.angle) * orbiter.radiusX;
        const y = centerY + Math.sin(orbiter.angle) * orbiter.radiusY;

        drawingContext.globalAlpha = 0.72;
        drawingContext.fillStyle = orbiter.speed > 0 ? "#f472b6" : "#c084fc";
        drawingContext.shadowColor = "rgba(244, 114, 182, 0.88)";
        drawingContext.shadowBlur = 13;
        drawingContext.beginPath();
        drawingContext.arc(x, y, orbiter.size, 0, Math.PI * 2);
        drawingContext.fill();
      }

      if (!shootingStar && Math.random() < deltaSeconds * 0.12) {
        shootingStar = {
          x: randomBetween(width * 0.35, width * 0.95),
          y: randomBetween(-30, height * 0.3),
          vx: randomBetween(-360, -220),
          vy: randomBetween(150, 240),
          life: 1,
          maxLife: 1,
        };
      }

      if (shootingStar) {
        shootingStar.x += shootingStar.vx * deltaSeconds;
        shootingStar.y += shootingStar.vy * deltaSeconds;
        shootingStar.life -= deltaSeconds;

        const alpha = Math.max(0, shootingStar.life / shootingStar.maxLife);
        const tailX = shootingStar.x - shootingStar.vx * 0.18;
        const tailY = shootingStar.y - shootingStar.vy * 0.18;
        const starGradient = drawingContext.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          tailX,
          tailY,
        );

        starGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        starGradient.addColorStop(0.25, `rgba(244, 114, 182, ${alpha * 0.7})`);
        starGradient.addColorStop(1, "rgba(192, 132, 252, 0)");
        drawingContext.globalAlpha = 1;
        drawingContext.strokeStyle = starGradient;
        drawingContext.lineWidth = 2;
        drawingContext.beginPath();
        drawingContext.moveTo(shootingStar.x, shootingStar.y);
        drawingContext.lineTo(tailX, tailY);
        drawingContext.stroke();

        if (shootingStar.life <= 0 || shootingStar.y > height + 60) {
          shootingStar = null;
        }
      }

      drawingContext.restore();
    }

    function drawEmber(deltaSeconds: number, time: number) {
      const lowerGlow = drawingContext.createLinearGradient(
        0,
        height,
        0,
        height * 0.45,
      );
      const redMode = theme === "red";
      lowerGlow.addColorStop(
        0,
        redMode ? "rgba(239, 68, 68, 0.16)" : "rgba(251, 146, 60, 0.12)",
      );
      lowerGlow.addColorStop(
        0.5,
        redMode ? "rgba(190, 18, 60, 0.055)" : "rgba(239, 68, 68, 0.035)",
      );
      lowerGlow.addColorStop(
        1,
        redMode ? "rgba(127, 29, 29, 0)" : "rgba(251, 146, 60, 0)",
      );
      drawingContext.fillStyle = lowerGlow;
      drawingContext.fillRect(0, height * 0.45, width, height * 0.55);

      drawingContext.save();
      drawingContext.lineCap = "round";

      for (let index = 0; index < emberParticles.length; index += 1) {
        const particle = emberParticles[index];
        particle.life -= deltaSeconds;
        particle.phase += deltaSeconds * 2.2;
        particle.x +=
          (particle.vx + Math.sin(particle.phase) * 12) * deltaSeconds;
        particle.y += particle.vy * deltaSeconds;

        if (
          particle.life <= 0 ||
          particle.y < -80 ||
          particle.x < -90 ||
          particle.x > width + 90
        ) {
          emberParticles[index] = createEmberParticle(width, height);
          continue;
        }

        const lifeProgress = particle.life / particle.maxLife;
        const alpha = Math.min(1, lifeProgress * 1.8);
        const tailLength = Math.max(5, Math.abs(particle.vy) * 0.055);
        const emberGradient = drawingContext.createLinearGradient(
          particle.x,
          particle.y,
          particle.x - particle.vx * 0.03,
          particle.y + tailLength,
        );

        emberGradient.addColorStop(
          0,
          redMode
            ? `rgba(255, 228, 230, ${alpha})`
            : `rgba(255, 247, 214, ${alpha})`,
        );
        emberGradient.addColorStop(
          0.28,
          redMode
            ? `rgba(248, 113, 113, ${alpha * 0.92})`
            : `rgba(251, 191, 36, ${alpha * 0.9})`,
        );
        emberGradient.addColorStop(
          1,
          redMode ? "rgba(136, 19, 55, 0)" : "rgba(239, 68, 68, 0)",
        );

        drawingContext.globalAlpha = 1;
        drawingContext.strokeStyle = emberGradient;
        drawingContext.lineWidth = particle.size;
        drawingContext.shadowColor = redMode
          ? "rgba(239, 68, 68, 0.95)"
          : "rgba(251, 146, 60, 0.9)";
        drawingContext.shadowBlur = 10;
        drawingContext.beginPath();
        drawingContext.moveTo(particle.x, particle.y);
        drawingContext.lineTo(
          particle.x - particle.vx * 0.03,
          particle.y + tailLength,
        );
        drawingContext.stroke();
      }

      drawingContext.shadowBlur = 0;
      drawingContext.globalAlpha = 0.08;
      drawingContext.strokeStyle = redMode ? "#ef4444" : "#fb923c";
      drawingContext.lineWidth = 1;

      for (let wave = 0; wave < 3; wave += 1) {
        drawingContext.beginPath();

        for (let x = 0; x <= width; x += 24) {
          const y =
            height * (0.77 + wave * 0.07) +
            Math.sin(x * 0.012 + time * 0.0015 + wave) * (8 + wave * 3);

          if (x === 0) drawingContext.moveTo(x, y);
          else drawingContext.lineTo(x, y);
        }

        drawingContext.stroke();
      }

      drawingContext.restore();
    }

    function drawRain(deltaSeconds: number, time: number, storm = false) {
      drawingContext.save();

      if (storm) {
        drawingContext.globalAlpha = 0.12;
        drawingContext.fillStyle = "#020617";
        drawingContext.fillRect(0, 0, width, height);
      }

      drawingContext.lineCap = "round";
      drawingContext.lineWidth = storm ? 1.35 : 1;

      for (let index = 0; index < rainDrops.length; index += 1) {
        const drop = rainDrops[index];
        drop.x += drop.drift * deltaSeconds;
        drop.y += drop.speed * deltaSeconds;

        if (drop.y > height + drop.length || drop.x < -120) {
          rainDrops[index] = createRainDrop(width, height);
          continue;
        }

        const rainGradient = drawingContext.createLinearGradient(
          drop.x,
          drop.y,
          drop.x - drop.drift * 0.025,
          drop.y - drop.length,
        );
        rainGradient.addColorStop(0, `rgba(224, 242, 254, ${drop.alpha})`);
        rainGradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        drawingContext.strokeStyle = rainGradient;
        drawingContext.shadowColor = "rgba(56, 189, 248, 0.45)";
        drawingContext.shadowBlur = storm ? 5 : 2;
        drawingContext.beginPath();
        drawingContext.moveTo(drop.x, drop.y);
        drawingContext.lineTo(
          drop.x - drop.drift * 0.025,
          drop.y - drop.length,
        );
        drawingContext.stroke();
      }

      const wetGlow = drawingContext.createLinearGradient(
        0,
        height * 0.65,
        0,
        height,
      );
      wetGlow.addColorStop(0, "rgba(14, 165, 233, 0)");
      wetGlow.addColorStop(
        1,
        storm ? "rgba(30, 64, 175, 0.12)" : "rgba(14, 165, 233, 0.075)",
      );
      drawingContext.fillStyle = wetGlow;
      drawingContext.fillRect(0, height * 0.65, width, height * 0.35);

      if (storm) {
        if (time >= nextLightningAt) {
          lightningUntil = time + randomBetween(65, 145);
          nextLightningAt = time + randomBetween(1800, 4800);
        }

        if (time < lightningUntil) {
          drawingContext.globalAlpha = 0.2 + Math.random() * 0.2;
          drawingContext.fillStyle = "#dbeafe";
          drawingContext.fillRect(0, 0, width, height);

          const startX = randomBetween(width * 0.2, width * 0.85);
          drawingContext.globalAlpha = 0.75;
          drawingContext.strokeStyle = "#f8fafc";
          drawingContext.lineWidth = 1.7;
          drawingContext.shadowColor = "#93c5fd";
          drawingContext.shadowBlur = 18;
          drawingContext.beginPath();
          drawingContext.moveTo(startX, 0);
          drawingContext.lineTo(startX - 18, height * 0.18);
          drawingContext.lineTo(startX + 10, height * 0.31);
          drawingContext.lineTo(startX - 32, height * 0.5);
          drawingContext.stroke();
        }
      }

      drawingContext.restore();
    }

    function drawWind(deltaSeconds: number, time: number) {
      drawingContext.save();
      drawingContext.lineCap = "round";

      for (let index = 0; index < windTrails.length; index += 1) {
        const trail = windTrails[index];
        trail.x += trail.speed * deltaSeconds;
        trail.phase += deltaSeconds * 2.1;

        if (trail.x - trail.length > width + 100) {
          windTrails[index] = createWindTrail(width, height);
          continue;
        }

        const wave = Math.sin(trail.phase + time * 0.0008) * trail.amplitude;
        const gradient = drawingContext.createLinearGradient(
          trail.x - trail.length,
          trail.y,
          trail.x,
          trail.y,
        );
        gradient.addColorStop(0, "rgba(165, 243, 252, 0)");
        gradient.addColorStop(
          0.55,
          `rgba(165, 243, 252, ${trail.alpha * 0.55})`,
        );
        gradient.addColorStop(1, `rgba(240, 253, 250, ${trail.alpha})`);
        drawingContext.strokeStyle = gradient;
        drawingContext.lineWidth = trail.leaf ? 1.7 : 1;
        drawingContext.shadowColor = "rgba(34, 211, 238, 0.35)";
        drawingContext.shadowBlur = 5;
        drawingContext.beginPath();
        drawingContext.moveTo(trail.x - trail.length, trail.y);
        drawingContext.bezierCurveTo(
          trail.x - trail.length * 0.65,
          trail.y - wave,
          trail.x - trail.length * 0.28,
          trail.y + wave,
          trail.x,
          trail.y,
        );
        drawingContext.stroke();

        if (trail.leaf) {
          drawingContext.save();
          drawingContext.translate(trail.x, trail.y);
          drawingContext.rotate(Math.sin(trail.phase) * 0.9);
          drawingContext.globalAlpha = 0.62;
          drawingContext.fillStyle = "#86efac";
          drawingContext.beginPath();
          drawingContext.ellipse(0, 0, 5, 2.3, 0.4, 0, Math.PI * 2);
          drawingContext.fill();
          drawingContext.restore();
        }
      }

      drawingContext.restore();
    }

    function drawSummer(deltaSeconds: number, time: number) {
      drawingContext.save();
      const sunX = width * 0.86;
      const sunY = height * 0.16;
      const radius = Math.min(width, height) * 0.28;
      const sunGlow = drawingContext.createRadialGradient(
        sunX,
        sunY,
        0,
        sunX,
        sunY,
        radius,
      );
      sunGlow.addColorStop(0, "rgba(254, 249, 195, 0.25)");
      sunGlow.addColorStop(0.25, "rgba(251, 191, 36, 0.11)");
      sunGlow.addColorStop(1, "rgba(251, 146, 60, 0)");
      drawingContext.fillStyle = sunGlow;
      drawingContext.fillRect(
        sunX - radius,
        sunY - radius,
        radius * 2,
        radius * 2,
      );

      drawingContext.save();
      drawingContext.translate(sunX, sunY);
      drawingContext.rotate(time * 0.000035);
      drawingContext.globalAlpha = 0.08;
      drawingContext.strokeStyle = "#fde68a";
      drawingContext.lineWidth = 1.2;
      for (let ray = 0; ray < 12; ray += 1) {
        drawingContext.rotate((Math.PI * 2) / 12);
        drawingContext.beginPath();
        drawingContext.moveTo(radius * 0.18, 0);
        drawingContext.lineTo(radius * 0.72, 0);
        drawingContext.stroke();
      }
      drawingContext.restore();

      for (const mote of summerMotes) {
        mote.phase += deltaSeconds * 1.5;
        mote.x += (mote.vx + Math.sin(mote.phase) * 7) * deltaSeconds;
        mote.y += (mote.vy + Math.cos(mote.phase * 0.7) * 3) * deltaSeconds;

        if (mote.x < -20) mote.x = width + 20;
        if (mote.x > width + 20) mote.x = -20;
        if (mote.y < -20) mote.y = height + 20;
        if (mote.y > height + 20) mote.y = -20;

        const pulse = 0.45 + (Math.sin(time * 0.0015 + mote.phase) + 1) * 0.22;
        drawingContext.globalAlpha = pulse;
        drawingContext.fillStyle = mote.size > 2.5 ? "#fef3c7" : "#fbbf24";
        drawingContext.shadowColor = "rgba(251, 191, 36, 0.65)";
        drawingContext.shadowBlur = 8;
        drawingContext.beginPath();
        drawingContext.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        drawingContext.fill();
      }

      const warmth = drawingContext.createLinearGradient(
        0,
        height * 0.4,
        0,
        height,
      );
      warmth.addColorStop(0, "rgba(251, 191, 36, 0)");
      warmth.addColorStop(1, "rgba(249, 115, 22, 0.055)");
      drawingContext.globalAlpha = 1;
      drawingContext.fillStyle = warmth;
      drawingContext.fillRect(0, height * 0.4, width, height * 0.6);
      drawingContext.restore();
    }

    function drawSnow(deltaSeconds: number, time: number) {
      drawingContext.save();

      for (let index = 0; index < snowParticles.length; index += 1) {
        const flake = snowParticles[index];
        flake.phase += deltaSeconds * 1.2;
        flake.x += (flake.drift + Math.sin(flake.phase) * 11) * deltaSeconds;
        flake.y += flake.speed * deltaSeconds;

        if (flake.y > height + 20 || flake.x < -30 || flake.x > width + 30) {
          snowParticles[index] = createSnowParticle(width, height);
          continue;
        }

        const alpha = 0.35 + (Math.sin(time * 0.001 + flake.phase) + 1) * 0.2;
        drawingContext.globalAlpha = alpha;
        drawingContext.fillStyle = "#f8fafc";
        drawingContext.shadowColor = "rgba(186, 230, 253, 0.6)";
        drawingContext.shadowBlur = 7;
        drawingContext.beginPath();
        drawingContext.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        drawingContext.fill();
      }

      const frost = drawingContext.createLinearGradient(0, 0, 0, height);
      frost.addColorStop(0, "rgba(186, 230, 253, 0.04)");
      frost.addColorStop(1, "rgba(224, 242, 254, 0.085)");
      drawingContext.globalAlpha = 1;
      drawingContext.fillStyle = frost;
      drawingContext.fillRect(0, 0, width, height);
      drawingContext.restore();
    }

    function drawWeather(deltaSeconds: number, time: number) {
      if (weather === "rain") drawRain(deltaSeconds, time);
      else if (weather === "wind") drawWind(deltaSeconds, time);
      else if (weather === "summer") drawSummer(deltaSeconds, time);
      else if (weather === "storm") drawRain(deltaSeconds, time, true);
      else if (weather === "snow") drawSnow(deltaSeconds, time);
    }

    function updateRuntimeSettings() {
      const nextTheme = readTheme();
      const nextWeather = readWeather();
      const themeChanged = nextTheme !== theme;
      const weatherChanged = nextWeather !== weather;

      theme = nextTheme;
      weather = nextWeather;
      enabled =
        document.documentElement.dataset.matrix !== "off" &&
        !reducedMotion;
      canvasElement.dataset.effect = theme;
      canvasElement.dataset.weather = weather;
      canvasElement.hidden = !enabled;

      if (themeChanged || weatherChanged) {
        rebuildScene();
      }

      if (!enabled) {
        clearCanvas();
      }

      previousTime = performance.now();
    }

    function draw(time: number) {
      const root = document.documentElement;

      if (
        document.visibilityState !== "visible" ||
        root.classList.contains("devos-booting") ||
        time - lastDrawAt < targetFrameMs
      ) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      lastDrawAt = time;

      const deltaSeconds = Math.min(
        (time - previousTime) / 1000,
        0.07,
      );
      previousTime = time;

      if (enabled) {
        clearCanvas();

        if (theme === "matrix") drawMatrix(deltaSeconds);
        else if (theme === "cyan") drawCyan(deltaSeconds, time);
        else if (theme === "purple") drawPurple(deltaSeconds, time);
        else drawEmber(deltaSeconds, time);

        drawWeather(deltaSeconds, time);

        drawingContext.globalAlpha = 1;
        drawingContext.shadowBlur = 0;
      }

      frameId = window.requestAnimationFrame(draw);
    }

    const rootObserver = new MutationObserver(updateRuntimeSettings);

    rootObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "data-theme",
        "data-accent",
        "data-matrix",
        "data-layout",
        "data-weather",
      ],
    });

    function handleVisibilityChange() {
      previousTime = performance.now();
      lastDrawAt = 0;
    }

    function handleResize() {
      if (resizeTimerId !== null) {
        window.clearTimeout(resizeTimerId);
      }

      resizeTimerId = window.setTimeout(() => {
        resizeTimerId = null;
        resizeCanvas();
        previousTime = performance.now();
        lastDrawAt = 0;
      }, 140);
    }

    resizeCanvas();
    updateRuntimeSettings();

    window.addEventListener("resize", handleResize, {
      passive: true,
    });
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);

      if (resizeTimerId !== null) {
        window.clearTimeout(resizeTimerId);
      }

      rootObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="theme-atmosphere" aria-hidden="true" />
  );
}
