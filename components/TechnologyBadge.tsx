import type { CSSProperties, ComponentType } from "react";
import type { IconType } from "react-icons";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Mail,
  Server,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { FaGithub, FaJava } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiBootstrap,
  SiCss,
  SiDart,
  SiExpo,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiLatex,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOverleaf,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiFlutter,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { VscCode } from "react-icons/vsc";

type TechnologyIcon = IconType | ComponentType<{ size?: number; "aria-hidden"?: boolean }>;

type TechnologyConfig = {
  icon: TechnologyIcon;
  color: string;
  symbol?: string;
};

const technologyMap: Record<string, TechnologyConfig> = {
  react: { icon: SiReact, color: "#61dafb", symbol: "⚛" },
  "react native": { icon: SiReact, color: "#61dafb", symbol: "⚛" },
  "next.js": { icon: SiNextdotjs, color: "#f8fafc", symbol: "▲" },
  typescript: { icon: SiTypescript, color: "#3178c6", symbol: "TS" },
  javascript: { icon: SiJavascript, color: "#f7df1e", symbol: "JS" },
  "tailwind css": { icon: SiTailwindcss, color: "#06b6d4", symbol: "〰" },
  html: { icon: SiHtml5, color: "#e34f26", symbol: "<>" },
  html5: { icon: SiHtml5, color: "#e34f26", symbol: "<>" },
  css: { icon: SiCss, color: "#1572b6", symbol: "#" },
  css3: { icon: SiCss, color: "#1572b6", symbol: "#" },
  bootstrap: { icon: SiBootstrap, color: "#7952b3", symbol: "B" },
  flutter: { icon: SiFlutter, color: "#54c5f8", symbol: "🦋" },
  dart: { icon: SiDart, color: "#0175c2", symbol: "D" },
  expo: { icon: SiExpo, color: "#f8fafc", symbol: "△" },
  "android studio": { icon: SiAndroidstudio, color: "#3ddc84", symbol: "🤖" },
  java: { icon: FaJava, color: "#f89820", symbol: "☕" },
  python: { icon: SiPython, color: "#ffd43b", symbol: "🐍" },
  flask: { icon: SiFlask, color: "#f8fafc", symbol: "🧪" },
  "spring boot": { icon: SiSpringboot, color: "#6db33f", symbol: "🍃" },
  "node.js": { icon: SiNodedotjs, color: "#5fa04e", symbol: "⬡" },
  "node.js integration": { icon: SiNodedotjs, color: "#5fa04e", symbol: "⬡" },
  firebase: { icon: SiFirebase, color: "#ffca28", symbol: "🔥" },
  "firebase authentication": { icon: SiFirebase, color: "#ffca28", symbol: "🔥" },
  "cloud firestore": { icon: SiFirebase, color: "#ffca28", symbol: "🔥" },
  "realtime database": { icon: SiFirebase, color: "#ffca28", symbol: "🔥" },
  mysql: { icon: SiMysql, color: "#4479a1", symbol: "DB" },
  sql: { icon: Database, color: "#22d3ee", symbol: "DB" },
  nosql: { icon: Database, color: "#39ff88", symbol: "DB" },
  git: { icon: SiGit, color: "#f05032", symbol: "⑂" },
  github: { icon: FaGithub, color: "#f8fafc", symbol: "◉" },
  "github actions": { icon: SiGithubactions, color: "#2088ff", symbol: "⚙" },
  "github pages": { icon: FaGithub, color: "#f8fafc", symbol: "◉" },
  "vs code": { icon: VscCode, color: "#23a8f2", symbol: "⌨" },
  latex: { icon: SiLatex, color: "#3d6117", symbol: "TeX" },
  overleaf: { icon: SiOverleaf, color: "#47a141", symbol: "🍃" },
  vercel: { icon: SiVercel, color: "#f8fafc", symbol: "▲" },
  "rest apis": { icon: Server, color: "#a78bfa", symbol: "API" },
  "google smtp": { icon: Mail, color: "#ea4335", symbol: "✉" },
  "mobile ui": { icon: Smartphone, color: "#f472b6", symbol: "📱" },
  "reusable components": { icon: Braces, color: "#22d3ee", symbol: "{}" },
  "prompt engineering": { icon: Sparkles, color: "#a78bfa", symbol: "✨" },
  "generative ai": { icon: RiOpenaiFill, color: "#10a37f", symbol: "AI" },
  "code review": { icon: FileCode2, color: "#22d3ee", symbol: "✓" },
  debugging: { icon: Code2, color: "#fb7185", symbol: "🐞" },
  documentation: { icon: FileCode2, color: "#fbbf24", symbol: "📄" },
  "workflow automation": { icon: Workflow, color: "#39ff88", symbol: "⚡" },
  "github pages deployment": { icon: Cloud, color: "#22d3ee", symbol: "☁" },
};

function getTechnologyConfig(name: string): TechnologyConfig {
  const normalized = name.trim().toLowerCase();

  if (technologyMap[normalized]) {
    return technologyMap[normalized];
  }

  if (normalized.includes("firebase") || normalized.includes("firestore")) {
    return technologyMap.firebase;
  }

  if (normalized.includes("react")) {
    return technologyMap.react;
  }

  if (normalized.includes("mobile") || normalized.includes("android")) {
    return { icon: Smartphone, color: "#f472b6", symbol: "📱" };
  }

  if (normalized.includes("database") || normalized.includes("sql")) {
    return { icon: Database, color: "#22d3ee", symbol: "DB" };
  }

  if (normalized.includes("api") || normalized.includes("server")) {
    return { icon: Server, color: "#a78bfa", symbol: "API" };
  }

  if (normalized.includes("ai")) {
    return { icon: Sparkles, color: "#a78bfa", symbol: "✨" };
  }

  return { icon: Code2, color: "#8ea9bb", symbol: "</>" };
}

export type TechnologyBadgeProps = {
  name: string;
  compact?: boolean;
  iconOnly?: boolean;
  showSymbol?: boolean;
  className?: string;
};

export default function TechnologyBadge({
  name,
  compact = false,
  iconOnly = false,
  showSymbol = false,
  className = "",
}: TechnologyBadgeProps) {
  const config = getTechnologyConfig(name);
  const Icon = config.icon;
  const style = {
    "--technology-color": config.color,
  } as CSSProperties;

  return (
    <span
      className={`technology-badge${compact ? " technology-badge--compact" : ""}${iconOnly ? " technology-badge--icon" : ""} ${className}`.trim()}
      style={style}
      title={name}
      aria-label={iconOnly ? name : undefined}
    >
      <span className="technology-badge__icon" aria-hidden="true">
        <Icon size={compact ? 14 : iconOnly ? 25 : 16} />
      </span>
      {showSymbol && config.symbol ? (
        <span className="technology-badge__symbol" aria-hidden="true">{config.symbol}</span>
      ) : null}
      {!iconOnly ? <span>{name}</span> : null}
    </span>
  );
}
