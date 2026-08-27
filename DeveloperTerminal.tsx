"use client";

import {
  type CSSProperties,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Bug,
  ChevronDown,
  CircleHelp,
  Code2,
  Gamepad2,
  Maximize2,
  Minimize2,
  Palette,
  Play,
  Power,
  RotateCcw,
  TerminalSquare,
  Zap,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { contactLinks, projects, skillGroups } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";
import {
  isLayoutMode,
  isThemeMode,
  layoutForTheme,
  type LayoutMode,
  type ThemeMode,
} from "@/lib/themeRuntime";

type LineKind = "command" | "output" | "success" | "error" | "system";
type TerminalLine = { id: number; kind: LineKind; text: string };
type Panel = "snake" | "tic" | "guess" | "playground" | "proficiency" | null;
type WeatherMode = "clear" | "rain" | "wind" | "summer" | "storm" | "snow";
type PetMode = "cat" | "dog" | null;

type SkillProficiency = {
  name: string;
  level: number;
  category: string;
};

const skillProficiency: SkillProficiency[] = [
  { name: "HTML & CSS", level: 93, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 83, category: "Frontend" },
  { name: "Firebase", level: 86, category: "Cloud" },
  { name: "Flutter & Dart", level: 82, category: "Mobile" },
  { name: "Python & Flask", level: 78, category: "Backend" },
  { name: "Java", level: 74, category: "Backend" },
  { name: "Spring Boot", level: 68, category: "Backend" },
  { name: "Git & GitHub", level: 89, category: "Workflow" },
  { name: "AI-assisted development", level: 87, category: "Workflow" },
];

const weatherModes: WeatherMode[] = [
  "clear",
  "rain",
  "wind",
  "summer",
  "storm",
  "snow",
];

function isWeatherMode(value: unknown): value is WeatherMode {
  return (
    typeof value === "string" && weatherModes.includes(value as WeatherMode)
  );
}

const commandNames = [
  "help",
  "about",
  "skills",
  "skill",
  "proficiency",
  "scan",
  "projects",
  "experience",
  "internships",
  "certificates",
  "contact",
  "whoami",
  "neofetch",
  "github",
  "linkedin",
  "cv",
  "open",
  "layout",
  "theme",
  "effects",
  "matrix",
  "weather",
  "rain",
  "wind",
  "summer",
  "storm",
  "snow",
  "make it rain",
  "make it windy",
  "make it summer",
  "cat",
  "dog",
  "pet",
  "feed",
  "play",
  "ls",
  "pwd",
  "tree",
  "status",
  "uptime",
  "git status",
  "git log",
  "npm run portfolio",
  "coffee",
  "motivate",
  "boot",
  "loader",
  "startup",
  "glitch",
  "crash",
  "recover",
  "reboot",
  "game",
  "guess",
  "rps",
  "playground",
  "joke",
  "fortune",
  "date",
  "history",
  "echo",
  "sudo hire-me",
  "close",
  "clear",
];

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "A SQL query walks into a bar, approaches two tables, and asks: May I join you?",
  "There are 10 kinds of people: those who understand binary and those who do not.",
  "I would tell you a UDP joke, but you might not get it.",
  "My code does not have bugs. It develops unexpected features. ✨",
  "The frontend asked the backend for space. The backend returned 404: feelings not found.",
];

const fortunes = [
  "Your next bug will become your best learning moment.",
  "A clean component is waiting to be extracted from your next project.",
  "The commit you are afraid to push will pass the build.",
  "A recruiter will appreciate the project you almost removed.",
  "Your future self says: write the README now.",
  "Today is a good day to replace duplicated code with a reusable component.",
];

const helpText = `DEVOS 4.16 COMMANDS

Portfolio
  about · projects · experience · internships · certificates · contact
  open monopoly · open portfolio
  open flowershop · open meditation
  open neon · open ecommerce · open taskflow · open smartfix
  open weather2 · open taskflow-repo
  open softgrowtech · open qwetrum · open qwetrum-linkedin
  skills · proficiency · scan · skill <name>
  whoami · neofetch · github · linkedin · cv · open <section>

World controls — the portfolio reacts immediately
  weather clear|rain|wind|summer|storm|snow
  rain · wind · summer · storm · snow
  make it rain · make it windy · make it summer
  effects on|off

Desktop pets
  cat · dog · pet cat|dog|off · feed · play

Virtual developer shell
  ls · pwd · tree · cat <file> · cat internships.json · status · uptime
  git status · git log · npm run portfolio · coffee · motivate

Interface controls
  layout classic|console|arcade|minimal
  theme matrix|cyan|purple|ember|red
  glitch · crash · recover · reboot

Games and fun
  game snake · game tic · game guess
  guess <1-100> · rps rock|paper|scissors
  joke · fortune · sudo hire-me

Developer tools
  boot · loader · startup · playground
  date · history · echo <message> · close · clear

Keyboard
  ↑/↓ command history · Tab autocomplete · Ctrl+L clear · Ctrl+K focus terminal`;

function lineTextFromSkills() {
  return skillGroups
    .map((group) => `${group.title}: ${group.skills.slice(0, 7).join(", ")}`)
    .join("\n");
}

function lineTextFromProjects() {
  return projects
    .map(
      (project, index) =>
        `${String(index + 1).padStart(2, "0")}. ${project.shortTitle} — ${project.technologies.slice(0, 4).join(" · ")}`,
    )
    .join("\n");
}

function proficiencyBar(level: number, width = 24) {
  const filled = Math.round((level / 100) * width);
  return `${"█".repeat(filled)}${"░".repeat(width - filled)}`;
}

function lineTextFromProficiency() {
  return [
    "SELF-ASSESSMENT SKILL SCAN",
    "────────────────────────────────────────────────────",
    ...skillProficiency.map(
      (skill) =>
        `${skill.name.padEnd(26)} ${proficiencyBar(skill.level)} ${String(skill.level).padStart(3)}%`,
    ),
    "────────────────────────────────────────────────────",
    "Levels reflect portfolio projects, coursework, and hands-on practice—not formal certification scores.",
  ].join("\n");
}

const virtualFiles: Record<string, string> = {
  "about.md":
    "# Abdullah Muhammad\nFrontend, web, and mobile developer based in Oman.",
  "skills.json": JSON.stringify(skillProficiency, null, 2),
  "projects.json": JSON.stringify(
    projects.map(
      ({
        shortTitle,
        technologies,
        slug,
        liveUrl,
        deploymentUrl,
        githubUrl,
        internship,
      }) => ({
        shortTitle,
        technologies,
        slug,
        liveUrl,
        deploymentUrl,
        githubUrl,
        internship,
      }),
    ),
    null,
    2,
  ),
  "internships.json": JSON.stringify(
    projects
      .filter((project) => project.internship)
      .map((project) => ({
        project: project.shortTitle,
        ...project.internship,
      })),
    null,
    2,
  ),
  "contact.txt": `Email: ${contactLinks.email}\nGitHub: ${contactLinks.github}\nLinkedIn: ${contactLinks.linkedin}`,
  "README.md":
    "DEVOS is an interactive portfolio runtime. Type help to explore commands.",
};

const petMessages = {
  cat: [
    "Compiling purr.ts...",
    "I found a bug. I am sitting on it.",
    "Your keyboard is warm. Mine now.",
    "Deploy treats, human.",
  ],
  dog: [
    "Build passed! Who is a good developer?",
    "Fetching repository... literally.",
    "I guarded your production branch.",
    "Ready for pair programming!",
  ],
};

export default function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      kind: "system",
      text: "DEVOS 4.16 internship attribution modules loaded.",
    },
    {
      id: 2,
      kind: "success",
      text: "Portfolio runtime connected. Try proficiency, cat, make it rain, or help.",
    },
  ]);
  const [panel, setPanel] = useState<Panel>(null);
  const [layout, setLayout] = useState<LayoutMode>("classic");
  const [theme, setTheme] = useState<ThemeMode>("matrix");
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [crashed, setCrashed] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [guessTarget, setGuessTarget] = useState(42);
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [weather, setWeather] = useState<WeatherMode>("clear");
  const [pet, setPet] = useState<PetMode>(null);
  const [petMessage, setPetMessage] = useState("Hello, developer!");

  const bootTime = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(3);

  const runtimeLabel = useMemo(
    () =>
      `${layout.toUpperCase()} / ${theme.toUpperCase()} / ${weather.toUpperCase()} / FX ${matrixEnabled ? "ON" : "OFF"}`,
    [layout, theme, weather, matrixEnabled],
  );

  function append(kind: LineKind, text: string) {
    setLines((current) => [...current, { id: lineId.current++, kind, text }]);
  }

  function appendCommand(command: string) {
    append("command", `guest@abdullah:~$ ${command}`);
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const root = document.documentElement;
        const saved = window.localStorage.getItem("portfolio-devos-settings");
        const parsed = saved
          ? (JSON.parse(saved) as {
              layout?: LayoutMode;
              theme?: ThemeMode;
              accent?: ThemeMode;
              matrixEnabled?: boolean;
              weather?: WeatherMode;
              pet?: PetMode;
            })
          : {};

        const savedTheme = parsed.theme ?? parsed.accent ?? root.dataset.theme;
        const nextTheme = isThemeMode(savedTheme) ? savedTheme : "matrix";
        const nextLayout = layoutForTheme(nextTheme);
        const savedMatrix =
          typeof parsed.matrixEnabled === "boolean"
            ? parsed.matrixEnabled
            : root.dataset.matrix !== "off";

        const nextWeather = isWeatherMode(parsed.weather)
          ? parsed.weather
          : "clear";
        const nextPet =
          parsed.pet === "cat" || parsed.pet === "dog" ? parsed.pet : null;

        setTheme(nextTheme);
        setLayout(nextLayout);
        setMatrixEnabled(savedMatrix);
        setWeather(nextWeather);
        setPet(nextPet);
      } catch {
        window.localStorage.removeItem("portfolio-devos-settings");
      } finally {
        setRuntimeReady(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.layout = layout;
    root.dataset.themeLayout = layout;
    root.dataset.theme = theme;
    root.dataset.accent = theme;
    root.dataset.matrix = matrixEnabled ? "on" : "off";
    root.dataset.weather = weather;

    if (pet) root.dataset.pet = pet;
    else delete root.dataset.pet;

    if (!runtimeReady) return;

    window.localStorage.setItem(
      "portfolio-devos-settings",
      JSON.stringify({
        layout,
        theme,
        matrixEnabled,
        weather,
        pet,
        runtimeVersion: 4.13,
      }),
    );
  }, [layout, theme, matrixEnabled, weather, pet, runtimeReady]);

  useEffect(() => {
    const output = outputRef.current;
    if (!output) return;

    const frame = window.requestAnimationFrame(() => {
      output.scrollTop = output.scrollHeight;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lines, panel]);

  useEffect(() => {
    function syncExternalTheme(event: Event) {
      const customEvent = event as CustomEvent<{
        theme?: ThemeMode;
        layout?: LayoutMode;
      }>;
      const nextTheme = customEvent.detail?.theme;

      if (isThemeMode(nextTheme)) {
        setTheme(nextTheme);
        setLayout(layoutForTheme(nextTheme));
      }
    }

    window.addEventListener("devos-theme-change", syncExternalTheme);
    return () =>
      window.removeEventListener("devos-theme-change", syncExternalTheme);
  }, []);

  useEffect(() => {
    function focusTerminal(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openTerminal();
      }
    }

    window.addEventListener("keydown", focusTerminal);
    return () => window.removeEventListener("keydown", focusTerminal);
  }, []);

  useEffect(() => {
    if (!crashed && !maximized) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (crashed) {
        setCrashed(false);
        setLines((current) => [
          ...current,
          {
            id: lineId.current++,
            kind: "success",
            text: "Emergency recovery completed. Portfolio runtime restored.",
          },
        ]);
        return;
      }
      setMaximized(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [crashed, maximized]);

  function openTerminal() {
    setTerminalOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById("terminal")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      window.setTimeout(() => inputRef.current?.focus(), 180);
    });
  }

  function closeTerminal() {
    setTerminalOpen(false);
    setMaximized(false);
    setPanel(null);
  }

  function openUrl(url: string, label: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    append("success", `Opening ${label}...`);
  }

  function applyGlitch() {
    document.documentElement.classList.remove("portfolio-glitch");
    window.requestAnimationFrame(() => {
      document.documentElement.classList.add("portfolio-glitch");
      window.setTimeout(
        () => document.documentElement.classList.remove("portfolio-glitch"),
        1900,
      );
    });
    append("success", "Visual glitch injected. No files were harmed. ⚡");
  }

  function resetRuntime() {
    setLayout(layoutForTheme("matrix"));
    setTheme("matrix");
    window.dispatchEvent(
      new CustomEvent("devos-theme-change", { detail: { theme: "matrix" } }),
    );
    setMatrixEnabled(true);
    setWeather("clear");
    setPet(null);
    setPanel(null);
    setCrashed(false);
    window.localStorage.removeItem("portfolio-devos-settings");
    document.documentElement.classList.remove("portfolio-glitch");
    append("success", "Runtime rebooted. Default interface restored.");
  }

  function setPortfolioWeather(nextWeather: WeatherMode) {
    setWeather(nextWeather);
    setMatrixEnabled(true);

    const descriptions: Record<WeatherMode, string> = {
      clear: "Weather layer cleared. The portfolio is calm again.",
      rain: "Rain system deployed. Watch the portfolio become wet and reflective. 🌧️",
      wind: "Wind tunnel enabled. Cards, leaves, and air streams are moving. 💨",
      summer:
        "Summer mode enabled. Sunlight, warm particles, and golden highlights are active. ☀️",
      storm:
        "Storm protocol enabled. Heavy rain and lightning are approaching. ⛈️",
      snow: "Snow renderer enabled. Winter particles are falling. ❄️",
    };

    append("success", descriptions[nextWeather]);
  }

  function summonPet(nextPet: Exclude<PetMode, null>) {
    setPet(nextPet);
    const messages = petMessages[nextPet];
    setPetMessage(messages[Math.floor(Math.random() * messages.length)]);
    append(
      "success",
      `${nextPet === "cat" ? "Cat" : "Dog"} desktop companion launched. Click the pet or use feed/play.`,
    );
  }

  function interactWithPet(action: "feed" | "play") {
    if (!pet) {
      append("error", "No desktop pet is active. Run cat or dog first.");
      return;
    }

    const message =
      action === "feed"
        ? pet === "cat"
          ? "Treat accepted. Purr level: 100%."
          : "Snack received! Tail-wag process running."
        : pet === "cat"
          ? "The cat attacked the cursor and won."
          : "The dog fetched your latest commit.";

    setPetMessage(message);
    append("success", message);
  }

  function scrollToSection(sectionName: string) {
    const aliases: Record<string, string> = {
      home: "home",
      about: "about",
      projects: "projects",
      skills: "skills",
      experience: "experience",
      certificates: "certificates",
      terminal: "terminal",
      contact: "contact",
    };
    const target = aliases[sectionName];
    if (!target) {
      append(
        "error",
        `Unknown section: ${sectionName}. Try open projects or open contact.`,
      );
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    append("success", `Navigating to #${target}`);
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    const [base, ...args] = normalized.split(/\s+/);

    setHistory((current) =>
      [command, ...current.filter((item) => item !== command)].slice(0, 40),
    );
    setHistoryIndex(-1);

    if (base === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    appendCommand(command);

    switch (base) {
      case "help":
        append("output", helpText);
        break;
      case "about":
        append(
          "output",
          "Abdullah Muhammad — Frontend, Web & Mobile Application Developer based in Oman. I build responsive React, Next.js, Firebase, Flutter, Flask, and Java solutions.",
        );
        break;
      case "skills":
        if (args[0] === "--scan" || args[0] === "scan") {
          setPanel("proficiency");
          append("output", lineTextFromProficiency());
        } else if (args[0] === "--json") {
          append("output", JSON.stringify(skillProficiency, null, 2));
        } else {
          append(
            "output",
            `${lineTextFromSkills()}\n\nRun proficiency for animated self-assessment bars.`,
          );
        }
        break;
      case "proficiency":
      case "scan":
      case "benchmark":
        setPanel("proficiency");
        append(
          "system",
          "Scanning repositories, projects, coursework, and development history...",
        );
        window.setTimeout(
          () => append("output", lineTextFromProficiency()),
          280,
        );
        break;
      case "skill": {
        const query = args.join(" ");
        if (!query) {
          append(
            "error",
            "Usage: skill react | skill firebase | skill flutter",
          );
          break;
        }
        const match = skillProficiency.find((item) =>
          item.name.toLowerCase().includes(query),
        );
        if (!match) {
          append("error", `No proficiency record found for: ${query}`);
          break;
        }
        append(
          "output",
          `${match.name}\n${proficiencyBar(match.level, 32)} ${match.level}%\nCategory: ${match.category}\nLevel: self-assessed from practical portfolio work.`,
        );
        break;
      }
      case "projects":
        append("output", lineTextFromProjects());
        break;
      case "experience":
        append(
          "output",
          "SoftGrowTech — Frontend Development Internship\n  Final project: TaskFlow Firebase Web App\nQwetrum Technologies — Web Development Internship\n  Capstone: Complete E-Commerce Website\nIndependent Software Developer — Ongoing self-directed delivery\nCredentials — 7 major programs / 62 completed courses",
        );
        break;
      case "internships":
        append(
          "output",
          "INTERNSHIP PROJECTS\n────────────────────────────────────────────────────\nSoftGrowTech\n  TaskFlow — Firebase Project Management Web App\n  open softgrowtech\n\nQwetrum Technologies\n  Complete E-Commerce Website — Internship Capstone\n  open qwetrum · open qwetrum-linkedin",
        );
        break;
      case "certificates":
        append(
          "output",
          "Qwetrum Technologies — Web Development Remote Internship\nIBM Mobile App Developer\nIBM AI Developer\nIBM Full Stack Software Developer",
        );
        break;
      case "contact":
        append(
          "output",
          `Email: ${contactLinks.email}\nWhatsApp: ${contactLinks.phone}\nLocation: Oman · Available remotely`,
        );
        break;
      case "whoami":
        append(
          "success",
          "guest → viewing Abdullah Muhammad's interactive developer portfolio",
        );
        break;
      case "neofetch":
        append(
          "output",
          `       /\\       Abdullah@portfolio\n      /  \\      ------------------\n     / /\\ \\     OS: DEVOS 4.16\n    / ____ \\    Stack: React · Next.js · TypeScript\n   /_/    \\_\\   Cloud: Firebase · Firestore\n                Mobile: Flutter · React Native\n                Location: Oman\n                Runtime: ${runtimeLabel}`,
        );
        break;
      case "github":
        openUrl(contactLinks.github, "GitHub");
        break;
      case "linkedin":
        openUrl(contactLinks.linkedin, "LinkedIn");
        break;
      case "cv":
        openUrl(withBasePath("/documents/Abdullah-Muhammad-CV.pdf"), "CV");
        break;
      case "open": {
        const target = args.join(" ");

        if (["games", "game-portfolio", "itch", "itch.io"].includes(target)) {
          openUrl(contactLinks.itch, "itch.io Game Portfolio");
          break;
        }

        if (["monopoly", "monopoly-guide", "rules", "rule-guide"].includes(target)) {
          openUrl("https://gmac1231.github.io/Monopoly/", "Monopoly Rules Guide");
          break;
        }

        if (["portfolio", "original-portfolio", "old-portfolio"].includes(target)) {
          openUrl(
            "https://gmac1231.github.io/Abdullah-Portfolio/",
            "Original Portfolio",
          );
          break;
        }

        if (
          ["flowershop", "flower-shop", "plantshop", "e-plant"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/e-plantShopping",
            "FlowerShop repository",
          );
          break;
        }

        if (
          [
            "flowershop-deployment",
            "flower-deployment",
            "plant-deployment",
          ].includes(target)
        ) {
          openUrl(
            "https://github.com/GMAC1231/e-plantShopping/deployments/flowershop",
            "FlowerShop deployment",
          );
          break;
        }

        if (
          ["meditation", "meditation-app", "meditationapp"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/meditationApp",
            "MeditationApp repository",
          );
          break;
        }

        if (
          ["neon", "neon-food", "food", "food-ordering", "food-express"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/food-ordering-system",
            "Neon Food Express repository",
          );
          break;
        }

        if (
          ["ecommerce", "e-commerce", "shop", "capstone-shop"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/Capstone-Complete-E-Commerce-Website",
            "E-Commerce Capstone repository",
          );
          break;
        }

        if (
          ["taskflow", "taskflow-live", "taskflow-web", "tasks"].includes(
            target,
          )
        ) {
          openUrl(
            "https://gmac1231.github.io/taskflow-firebase/login/",
            "TaskFlow live web app",
          );
          break;
        }

        if (
          ["taskflow-repo", "taskflow-github", "project-manager"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/taskflow-firebase",
            "TaskFlow repository",
          );
          break;
        }

        if (
          ["weather2", "weather-app", "weather-mobile", "android-weather"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/Weather2",
            "Weather2 mobile app repository",
          );
          break;
        }

        if (
          ["smartfix", "smartfixoman", "smarrtfix", "services"].includes(
            target,
          )
        ) {
          openUrl(
            "https://github.com/GMAC1231/SmarrtfixOman",
            "SmartFixOman repository",
          );
          break;
        }

        if (
          ["softgrowtech", "softgrow", "softgrowtech-linkedin"].includes(
            target,
          )
        ) {
          openUrl(
            "https://www.linkedin.com/company/officialsoftgrowtech/posts/?feedView=all",
            "SoftGrowTech LinkedIn",
          );
          break;
        }

        if (["qwetrum", "qwetrum-site", "qwetrum-website"].includes(target)) {
          openUrl(
            "https://www.qwetrumtechnologies.tech/",
            "Qwetrum Technologies website",
          );
          break;
        }

        if (["qwetrum-linkedin", "qwetrum-social"].includes(target)) {
          openUrl(
            "https://www.linkedin.com/company/qwetrum-technologies/",
            "Qwetrum Technologies LinkedIn",
          );
          break;
        }

        scrollToSection(target || "projects");
        break;
      }
      case "layout": {
        const next = args[0] as LayoutMode | undefined;
        if (!isLayoutMode(next)) {
          append("error", "Usage: layout classic|console|arcade|minimal");
          break;
        }
        setLayout(next);
        append(
          "success",
          `Layout changed to ${next}. The entire portfolio interface has been recompiled.`,
        );
        break;
      }
      case "theme": {
        const next = args[0];
        if (!isThemeMode(next)) {
          append("error", "Usage: theme matrix|cyan|purple|ember|red");
          break;
        }

        const nextLayout = layoutForTheme(next);
        setTheme(next);
        setLayout(nextLayout);

        window.dispatchEvent(
          new CustomEvent("devos-theme-change", {
            detail: { theme: next, layout: nextLayout },
          }),
        );

        append(
          "success",
          `Theme ${next} loaded with its ${nextLayout} page layout, typography, section order, project grids, project-detail pages, navigation, cards, and terminal.`,
        );
        break;
      }
      case "effects":
      case "matrix":
        if (args[0] === "on") {
          setMatrixEnabled(true);
          append("success", `${theme} atmosphere enabled.`);
        } else if (args[0] === "off") {
          setMatrixEnabled(false);
          append("success", `${theme} atmosphere disabled.`);
        } else {
          append(
            "error",
            "Usage: effects on|off (matrix on|off is also supported)",
          );
        }
        break;
      case "weather": {
        const next = args[0];
        if (!next) {
          append(
            "output",
            `Current portfolio weather: ${weather}. Available: ${weatherModes.join(", ")}`,
          );
          break;
        }
        if (!isWeatherMode(next)) {
          append("error", "Usage: weather clear|rain|wind|summer|storm|snow");
          break;
        }
        setPortfolioWeather(next);
        break;
      }
      case "rain":
        setPortfolioWeather("rain");
        break;
      case "wind":
      case "windy":
        setPortfolioWeather("wind");
        break;
      case "summer":
      case "sunny":
        setPortfolioWeather("summer");
        break;
      case "storm":
        setPortfolioWeather("storm");
        break;
      case "snow":
      case "winter":
        setPortfolioWeather("snow");
        break;
      case "make": {
        const request = args.join(" ");
        if (request === "it rain" || request === "rain")
          setPortfolioWeather("rain");
        else if (["it windy", "it wind", "wind", "windy"].includes(request))
          setPortfolioWeather("wind");
        else if (["it summer", "summer", "it sunny", "sunny"].includes(request))
          setPortfolioWeather("summer");
        else if (request === "it storm" || request === "storm")
          setPortfolioWeather("storm");
        else if (request === "it snow" || request === "snow")
          setPortfolioWeather("snow");
        else
          append("error", "Try: make it rain | make it windy | make it summer");
        break;
      }
      case "cat":
        if (args[0]) {
          const file = virtualFiles[args[0]];
          append(
            file ? "output" : "error",
            file ?? `cat: ${args[0]}: No such file`,
          );
        } else {
          summonPet("cat");
          append(
            "output",
            [" /\\_/\\", "( o.o )", " > ^ <   CAT_PROCESS_RUNNING"].join("\n"),
          );
        }
        break;
      case "dog":
        summonPet("dog");
        append(
          "output",
          [
            " / \\__",
            "(    @\\___",
            " /         O",
            "/   (_____/",
            "/_____/   U   DOG_PROCESS_RUNNING",
          ].join("\n"),
        );
        break;
      case "pet":
        if (args[0] === "cat") summonPet("cat");
        else if (args[0] === "dog") summonPet("dog");
        else if (args[0] === "off") {
          setPet(null);
          append("success", "Desktop pet returned home safely.");
        } else append("error", "Usage: pet cat|dog|off");
        break;
      case "feed":
        interactWithPet("feed");
        break;
      case "play":
        interactWithPet("play");
        break;
      case "ls":
        append(
          "output",
          "about.md  skills.json  projects.json  contact.txt  README.md  games/  effects/",
        );
        break;
      case "pwd":
        append("output", "/home/guest/abdullah-portfolio");
        break;
      case "tree":
        append(
          "output",
          ".\n├── app/\n│   ├── projects/[slug]/\n│   └── theme-layouts.css\n├── components/\n│   ├── DeveloperTerminal.tsx\n│   ├── MatrixRain.tsx\n│   └── TechnologyShowcase.tsx\n├── data/portfolio.ts\n├── games/\n└── effects/",
        );
        break;
      case "status":
        append(
          "success",
          `DEVOS 4.7 operational\nTheme: ${theme}\nLayout: ${layout}\nWeather: ${weather}\nPet: ${pet ?? "none"}\nEffects: ${matrixEnabled ? "online" : "offline"}\nPortfolio integrity: 100%`,
        );
        break;
      case "uptime": {
        const seconds = Math.floor((Date.now() - bootTime.current) / 1000);
        append(
          "output",
          `DEVOS uptime: ${Math.floor(seconds / 60)}m ${seconds % 60}s`,
        );
        break;
      }
      case "git":
        if (args[0] === "status")
          append(
            "success",
            "On branch portfolio/main\nYour portfolio is clean and ready to deploy.",
          );
        else if (args[0] === "log")
          append(
            "output",
            "a11d4h6 feat: interactive weather world\n9f3c2d1 feat: skill proficiency scanner\n7e8b4a0 feat: desktop cat and dog companions\n4c5d6e7 fix: theme-specific visual engines",
          );
        else append("error", "Usage: git status | git log");
        break;
      case "npm":
        if (args.join(" ") === "run portfolio") {
          append(
            "system",
            "> compiling creativity...\n> loading projects...\n> connecting skills...\n> build complete",
          );
          append(
            "success",
            "Portfolio started successfully on http://localhost:3000 🚀",
          );
        } else append("error", "Try: npm run portfolio");
        break;
      case "coffee":
        append(
          "output",
          [
            "   ( (",
            "    ) )",
            "  ........",
            "  |      |]  Coffee compiled successfully. ☕",
            "  \\      /",
            "   `----'",
          ].join("\n"),
        );
        break;
      case "motivate":
        append(
          "success",
          "You do not need to know everything. Build, test, debug, improve, and keep shipping. 🚀",
        );
        break;
      case "boot":
      case "loader":
      case "startup":
        append(
          "system",
          "Restarting mixed visual boot sequence: binary stream + node graph + thermal renderer...",
        );
        window.dispatchEvent(new CustomEvent("devos-replay-boot"));
        break;
      case "glitch":
        applyGlitch();
        break;
      case "crash":
        setCrashed(true);
        append(
          "error",
          "Safe portfolio failure simulation started. Press Escape or use the recovery button.",
        );
        break;
      case "recover":
        setCrashed(false);
        append("success", "System recovered. Portfolio integrity: 100%.");
        break;
      case "reboot":
        resetRuntime();
        break;
      case "game":
        if (["snake", "tic", "guess"].includes(args[0] ?? "")) {
          const game = args[0];
          if (game === "snake") setPanel("snake");
          if (game === "tic") setPanel("tic");
          if (game === "guess") {
            setGuessTarget(Math.floor(Math.random() * 100) + 1);
            setGuessAttempts(0);
            setPanel("guess");
          }
          append("success", `${game} game loaded inside DEVOS.`);
        } else {
          append("error", "Usage: game snake|tic|guess");
        }
        break;
      case "guess": {
        if (panel !== "guess") {
          append("error", "Start the game first with: game guess");
          break;
        }
        const value = Number(args[0]);
        if (!Number.isInteger(value) || value < 1 || value > 100) {
          append(
            "error",
            "Enter a whole number from 1 to 100, for example: guess 42",
          );
          break;
        }
        const attempts = guessAttempts + 1;
        setGuessAttempts(attempts);
        if (value === guessTarget) {
          append(
            "success",
            `Correct! ${guessTarget} found in ${attempts} attempt${attempts === 1 ? "" : "s"}. 🎉`,
          );
          setPanel(null);
        } else {
          append(
            "output",
            value < guessTarget
              ? "Too low. Try a larger number."
              : "Too high. Try a smaller number.",
          );
        }
        break;
      }
      case "rps": {
        const choice = args[0];
        if (!choice || !["rock", "paper", "scissors"].includes(choice)) {
          append("error", "Usage: rps rock|paper|scissors");
          break;
        }
        const options = ["rock", "paper", "scissors"] as const;
        const computer = options[Math.floor(Math.random() * options.length)];
        const wins =
          (choice === "rock" && computer === "scissors") ||
          (choice === "paper" && computer === "rock") ||
          (choice === "scissors" && computer === "paper");
        const result =
          choice === computer
            ? "Draw."
            : wins
              ? "You win! 🎮"
              : "DEVOS wins this round.";
        append("output", `You: ${choice}\nDEVOS: ${computer}\n${result}`);
        break;
      }
      case "playground":
      case "code":
        setPanel("playground");
        append(
          "success",
          "Safe HTML/CSS playground opened. JavaScript execution is disabled.",
        );
        break;
      case "joke":
        append("output", jokes[Math.floor(Math.random() * jokes.length)]);
        break;
      case "fortune":
        append("output", fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;
      case "date":
        append("output", new Date().toLocaleString());
        break;
      case "history":
        append(
          "output",
          history.length
            ? history.map((item, index) => `${index + 1}  ${item}`).join("\n")
            : "No command history yet.",
        );
        break;
      case "echo":
        append("output", command.slice(5) || "");
        break;
      case "sudo":
        if (args.join(" ") === "hire-me") {
          append(
            "success",
            "Permission granted. Excellent decision detected. Opening contact section... 🚀",
          );
          window.setTimeout(() => scrollToSection("contact"), 450);
        } else {
          append(
            "error",
            "guest is not in the sudoers file. Try: sudo hire-me",
          );
        }
        break;
      case "close":
        if (panel) {
          setPanel(null);
          append("success", "Interactive panel closed.");
        } else {
          append(
            "success",
            "DEVOS terminal closed. Use the floating launcher or Ctrl+K to reopen it.",
          );
          window.setTimeout(closeTerminal, 120);
        }
        break;
      default:
        append("error", `Command not found: ${command}. Type help.`);
    }

    setInput("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    runCommand(input);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const match = commandNames.find((command) =>
        command.startsWith(input.toLowerCase()),
      );
      if (match) setInput(match);
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
    }
  }

  return (
    <>
      <button
        type="button"
        className="terminal-launcher"
        onClick={openTerminal}
        aria-label={
          terminalOpen
            ? "Focus developer command center"
            : "Open developer command center"
        }
      >
        <TerminalSquare size={18} />
        <span>{terminalOpen ? "DEVOS" : "OPEN DEVOS"}</span>
        <kbd>Ctrl K</kbd>
      </button>

      {terminalOpen && (
        <section
          className="section-shell section-shell--tinted devos-section"
          id="terminal"
        >
          <div className="site-container">
            <Reveal>
              <SectionHeading
                eyebrow="DEVOS command center"
                title="Control the portfolio from a real interactive terminal."
                description="Run a skill-proficiency scan, summon desktop pets, control rain, wind, summer, storms and snow, launch games, change every theme, and explore the portfolio through a developer shell."
                centered
              />
            </Reveal>

            <Reveal
              className={`devos-window ${maximized ? "devos-window--maximized" : ""}`}
            >
              <div className="devos-titlebar">
                <div className="devos-window-controls" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>
                  <TerminalSquare size={15} /> abdullah.dev / DEVOS 4.6
                </p>
                <div className="devos-title-actions">
                  <button
                    type="button"
                    onClick={() => setMaximized((current) => !current)}
                    aria-label={
                      maximized ? "Restore terminal" : "Maximize terminal"
                    }
                    title={maximized ? "Restore terminal" : "Maximize terminal"}
                  >
                    {maximized ? (
                      <Minimize2 size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    className="devos-close-button"
                    onClick={closeTerminal}
                    aria-label="Close terminal"
                    title="Close terminal"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="devos-workspace">
                <aside className="devos-sidebar">
                  <div className="devos-sidebar-heading">
                    <span>EXPLORER</span>
                    <ChevronDown size={14} />
                  </div>
                  <button type="button" onClick={() => runCommand("help")}>
                    <CircleHelp size={15} /> help.md
                  </button>
                  <button type="button" onClick={() => runCommand("projects")}>
                    <Code2 size={15} /> projects.json
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand("proficiency")}
                  >
                    <Zap size={15} /> proficiency.scan
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand("game snake")}
                  >
                    <Gamepad2 size={15} /> games/
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand("playground")}
                  >
                    <Play size={15} /> playground.html
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand("layout console")}
                  >
                    <Palette size={15} /> interface.css
                  </button>
                  <button type="button" onClick={() => runCommand("crash")}>
                    <Bug size={15} /> safe-error.ts
                  </button>
                  <div className="devos-sidebar-runtime">
                    <small>RUNTIME</small>
                    <span>{runtimeLabel}</span>
                  </div>
                </aside>

                <div className="devos-main">
                  <div
                    className="devos-tabs"
                    role="tablist"
                    aria-label="DEVOS tabs"
                  >
                    <div
                      className="devos-tab active"
                      role="tab"
                      aria-selected="true"
                    >
                      <TerminalSquare size={14} />
                      <span>terminal</span>
                      <button
                        type="button"
                        className="devos-tab-close"
                        onClick={closeTerminal}
                        aria-label="Close terminal tab"
                        title="Close terminal tab"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    {panel && (
                      <div
                        className="devos-tab devos-tab--panel"
                        role="tab"
                        aria-selected="false"
                      >
                        <Zap size={14} />
                        <span>{panel}</span>
                        <button
                          type="button"
                          className="devos-tab-close"
                          onClick={() => setPanel(null)}
                          aria-label={`Close ${panel} tab`}
                          title={`Close ${panel} tab`}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="devos-terminal-body">
                    <div
                      className="devos-output"
                      ref={outputRef}
                      aria-live="polite"
                    >
                      {lines.map((line) => (
                        <pre
                          key={line.id}
                          className={`devos-line devos-line--${line.kind}`}
                        >
                          {line.text}
                        </pre>
                      ))}

                      {panel === "snake" && <SnakeGame />}
                      {panel === "tic" && <TicTacToe />}
                      {panel === "guess" && (
                        <div className="guess-panel">
                          <Gamepad2 size={26} />
                          <strong>Number Protocol</strong>
                          <p>I selected a number from 1 to 100.</p>
                          <code>guess 42</code>
                          <small>Attempts: {guessAttempts}</small>
                        </div>
                      )}
                      {panel === "playground" && <CodePlayground />}
                      {panel === "proficiency" && <ProficiencyPanel />}
                    </div>

                    <form className="devos-input-row" onSubmit={submit}>
                      <label htmlFor="portfolio-command">
                        <span>guest@abdullah</span>:<strong>~</strong>$
                      </label>
                      <input
                        ref={inputRef}
                        id="portfolio-command"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="try proficiency, cat, make it rain, weather summer..."
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className="devos-quickbar">
                <span>Quick run:</span>
                {[
                  ["help", "Help"],
                  ["proficiency", "Skill Scan"],
                  ["make it rain", "Rain"],
                  ["wind", "Wind"],
                  ["summer", "Summer"],
                  ["cat", "Cat"],
                  ["dog", "Dog"],
                  ["game snake", "Snake"],
                  ["playground", "Code"],
                  ["joke", "Joke"],
                  ["glitch", "Glitch"],
                ].map(([command, label]) => (
                  <button
                    key={command}
                    type="button"
                    onClick={() => runCommand(command)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="devos-statusbar">
                <span>
                  <i /> connected
                </span>
                <span>layout: {layout}</span>
                <span>theme: {theme}</span>
                <span>weather: {weather}</span>
                <span>pet: {pet ?? "none"}</span>
                <span>UTF-8</span>
                <span>TypeScript React</span>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {pet && (
        <aside
          className={`devos-pet devos-pet--${pet}`}
          aria-label={`Desktop ${pet} companion`}
        >
          <button
            type="button"
            className="devos-pet__character"
            onClick={() => interactWithPet("play")}
            aria-label={`Play with the ${pet}`}
          >
            <span aria-hidden="true">{pet === "cat" ? "🐈" : "🐕"}</span>
          </button>
          <div className="devos-pet__bubble">{petMessage}</div>
          <button
            type="button"
            className="devos-pet__close"
            onClick={() => setPet(null)}
            aria-label={`Close ${pet} companion`}
          >
            <X size={13} />
          </button>
        </aside>
      )}

      {crashed && (
        <div
          className="dev-crash-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Safe error simulation"
        >
          <div className="dev-crash-noise" />
          <div className="dev-crash-content">
            <span className="dev-crash-icon">:(</span>
            <h2>PORTFOLIO_RUNTIME_EXCEPTION</h2>
            <p>A harmless visual failure was requested from the terminal.</p>
            <pre>{`Error: TooMuchAwesomeError\n  at renderPortfolio (devos.ts:2026)\n  at launchCreativity (terminal.tsx:404)\n  at Abdullah.build (portfolio.ts:100)`}</pre>
            <div className="dev-crash-progress">
              <span />
            </div>
            <small>No data was deleted. This is only an Easter egg.</small>
            <button
              type="button"
              onClick={() => {
                setCrashed(false);
                append(
                  "success",
                  "Recovery completed. All portfolio modules are operational.",
                );
              }}
            >
              <Power size={18} /> Run automatic recovery
            </button>
            <em>Press Escape to recover</em>
          </div>
        </div>
      )}
    </>
  );
}

function ProficiencyPanel() {
  const average = Math.round(
    skillProficiency.reduce((total, skill) => total + skill.level, 0) /
      skillProficiency.length,
  );

  return (
    <div className="proficiency-panel">
      <div className="terminal-game-header">
        <div>
          <Zap size={18} />
          <strong>Developer Proficiency Scanner</strong>
        </div>
        <span>Overall {average}%</span>
      </div>

      <div className="proficiency-panel__summary">
        <span>Repository analysis</span>
        <strong>{average}% practical readiness</strong>
        <small>
          Self-assessment based on completed projects, coursework, and hands-on
          development.
        </small>
      </div>

      <div className="proficiency-panel__grid">
        {skillProficiency.map((skill, index) => (
          <article key={skill.name} className="proficiency-meter">
            <header>
              <span>{skill.name}</span>
              <strong>{skill.level}%</strong>
            </header>
            <div
              className="proficiency-meter__track"
              aria-label={`${skill.name}: ${skill.level}%`}
            >
              <span
                style={
                  {
                    "--skill-level": `${skill.level}%`,
                    "--skill-delay": `${index * 70}ms`,
                  } as CSSProperties
                }
              />
            </div>
            <small>{skill.category}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

type Point = { x: number; y: number };

function createFood(size: number, snake: Point[]) {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
  return food;
}

function SnakeGame() {
  const size = 14;
  const initialSnake = useMemo<Point[]>(
    () => [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
    ],
    [],
  );
  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [food, setFood] = useState<Point>(() => createFood(size, initialSnake));
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const direction = useRef<Point>({ x: 1, y: 0 });

  function setDirection(next: Point) {
    const current = direction.current;
    if (current.x + next.x === 0 && current.y + next.y === 0) return;
    direction.current = next;
    setRunning(true);
  }

  function reset() {
    setSnake(initialSnake);
    setFood(createFood(size, initialSnake));
    setScore(0);
    setGameOver(false);
    setRunning(false);
    direction.current = { x: 1, y: 0 };
  }

  useEffect(() => {
    function handleKey(event: globalThis.KeyboardEvent) {
      const mapping: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const next = mapping[event.key];
      if (!next) return;
      event.preventDefault();
      setDirection(next);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!running || gameOver) return;

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const nextHead = {
          x: head.x + direction.current.x,
          y: head.y + direction.current.y,
        };
        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= size ||
          nextHead.y < 0 ||
          nextHead.y >= size;
        const hitSelf = currentSnake.some(
          (part) => part.x === nextHead.x && part.y === nextHead.y,
        );

        if (hitWall || hitSelf) {
          setRunning(false);
          setGameOver(true);
          return currentSnake;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...currentSnake];
        if (ateFood) {
          setScore((currentScore) => currentScore + 10);
          setFood(createFood(size, nextSnake));
          return nextSnake;
        }
        nextSnake.pop();
        return nextSnake;
      });
    }, 125);

    return () => window.clearInterval(timer);
  }, [running, gameOver, food, initialSnake]);

  return (
    <div className="terminal-game snake-game">
      <div className="terminal-game-header">
        <div>
          <Gamepad2 size={18} />
          <strong>Snake.exe</strong>
        </div>
        <span>Score: {score}</span>
      </div>
      <div
        className="snake-board"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {Array.from({ length: size * size }, (_, index) => {
          const x = index % size;
          const y = Math.floor(index / size);
          const snakeIndex = snake.findIndex(
            (part) => part.x === x && part.y === y,
          );
          const isFood = food.x === x && food.y === y;
          return (
            <i
              key={index}
              className={`${snakeIndex === 0 ? "head" : snakeIndex > 0 ? "body" : ""} ${isFood ? "food" : ""}`}
            />
          );
        })}
      </div>
      <div className="snake-message">
        {gameOver
          ? "GAME OVER — restart to compile again."
          : running
            ? "Use arrows or WASD."
            : "Press an arrow key or Start."}
      </div>
      <div className="snake-controls">
        <button type="button" onClick={() => setDirection({ x: 0, y: -1 })}>
          ↑
        </button>
        <div>
          <button type="button" onClick={() => setDirection({ x: -1, y: 0 })}>
            ←
          </button>
          <button type="button" onClick={() => setDirection({ x: 0, y: 1 })}>
            ↓
          </button>
          <button type="button" onClick={() => setDirection({ x: 1, y: 0 })}>
            →
          </button>
        </div>
        <button type="button" className="game-reset" onClick={reset}>
          <RotateCcw size={15} /> Restart
        </button>
      </div>
    </div>
  );
}

type Cell = "X" | "O" | null;

function getWinner(board: Cell[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array<Cell>(9).fill(null));
  const [turn, setTurn] = useState<Exclude<Cell, null>>("X");
  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  function play(index: number) {
    if (board[index] || winner) return;
    setBoard((current) =>
      current.map((cell, cellIndex) => (cellIndex === index ? turn : cell)),
    );
    setTurn((current) => (current === "X" ? "O" : "X"));
  }

  function reset() {
    setBoard(Array<Cell>(9).fill(null));
    setTurn("X");
  }

  return (
    <div className="terminal-game tic-game">
      <div className="terminal-game-header">
        <div>
          <Gamepad2 size={18} />
          <strong>TicTacToe.tsx</strong>
        </div>
        <span>
          {winner ? `${winner} wins` : draw ? "Draw" : `${turn}'s turn`}
        </span>
      </div>
      <div className="tic-board">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => play(index)}
            aria-label={`Cell ${index + 1}`}
            className={cell ? `mark-${cell.toLowerCase()}` : ""}
          >
            {cell}
          </button>
        ))}
      </div>
      <button type="button" className="game-reset" onClick={reset}>
        <RotateCcw size={15} /> New match
      </button>
    </div>
  );
}

function CodePlayground() {
  const [html, setHtml] = useState(
    `<article class="card">\n  <span>⚛️ React Developer</span>\n  <h2>Hello from DEVOS</h2>\n  <p>Edit this code and watch the preview update.</p>\n  <button>Launch project 🚀</button>\n</article>`,
  );
  const [css, setCss] = useState(
    `body {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  margin: 0;\n  color: #eafff3;\n  background: #04111c;\n  font-family: system-ui;\n}\n\n.card {\n  width: min(360px, 85vw);\n  padding: 28px;\n  border: 1px solid #39ff88;\n  border-radius: 24px;\n  background: #081d2d;\n  box-shadow: 0 0 40px #39ff8824;\n}\n\nspan { color: #22d3ee; }\nbutton {\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #39ff88, #22d3ee);\n}`,
  );
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`;

  return (
    <div className="code-playground">
      <div className="terminal-game-header">
        <div>
          <Code2 size={18} />
          <strong>Safe HTML/CSS Playground</strong>
        </div>
        <span>Sandboxed preview</span>
      </div>
      <div className="playground-grid">
        <div className="playground-editors">
          <label>
            <span>index.html</span>
            <textarea
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              spellCheck={false}
            />
          </label>
          <label>
            <span>styles.css</span>
            <textarea
              value={css}
              onChange={(event) => setCss(event.target.value)}
              spellCheck={false}
            />
          </label>
        </div>
        <iframe title="Safe code preview" srcDoc={srcDoc} sandbox="" />
      </div>
      <small>
        For safety, JavaScript execution is disabled inside this preview.
      </small>
    </div>
  );
}
