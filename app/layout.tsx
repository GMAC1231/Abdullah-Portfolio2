import type { Metadata } from "next";

import "./globals.css";
import "./theme-layouts.css";
import "./red-theme.css";
import "./boot-loader-themes.css";

import BootLoader from "@/components/BootLoader";
import MatrixRain from "@/components/MatrixRain";

export const metadata: Metadata = {
  title: {
    default: "Abdullah Muhammad | Frontend, Web & Mobile Developer",
    template: "%s | Abdullah Muhammad",
  },
  description:
    "Portfolio of Abdullah Muhammad, a frontend, web, and mobile application developer building responsive React, Next.js, Firebase, Flutter, and Flask solutions.",
  keywords: [
    "Abdullah Muhammad",
    "Frontend Developer Oman",
    "React Developer",
    "Next.js Developer",
    "Firebase Developer",
    "Mobile App Developer",
    "Flutter Developer",
  ],
  authors: [{ name: "Abdullah Muhammad" }],
  creator: "Abdullah Muhammad",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    title: "Abdullah Muhammad | Frontend, Web & Mobile Developer",
    description:
      "Responsive web applications, mobile experiences, Firebase systems, and practical software solutions.",
    type: "website",
  },
};

const themeScript = `
  try {
    document.documentElement.classList.add('dark');

    const allowedThemes = ['matrix', 'cyan', 'purple', 'ember', 'red'];

    const themeLayouts = {
      matrix: 'console',
      cyan: 'classic',
      purple: 'arcade',
      ember: 'minimal',
      red: 'classic',
    };

    const savedRuntime = JSON.parse(
      localStorage.getItem('portfolio-devos-settings') || '{}'
    );

    const requestedTheme = savedRuntime.theme || savedRuntime.accent;

    const runtimeTheme = allowedThemes.includes(requestedTheme)
      ? requestedTheme
      : 'matrix';

    const runtimeLayout = themeLayouts[runtimeTheme];
    const matrixEnabled = savedRuntime.matrixEnabled !== false;

    const allowedWeather = [
      'clear',
      'rain',
      'wind',
      'summer',
      'storm',
      'snow',
    ];

    const runtimeWeather = allowedWeather.includes(savedRuntime.weather)
      ? savedRuntime.weather
      : 'clear';

    document.documentElement.dataset.layout = runtimeLayout;
    document.documentElement.dataset.themeLayout = runtimeLayout;
    document.documentElement.dataset.theme = runtimeTheme;
    document.documentElement.dataset.accent = runtimeTheme;
    document.documentElement.dataset.matrix = matrixEnabled ? 'on' : 'off';
    document.documentElement.dataset.weather = runtimeWeather;
  } catch (_) {
    document.documentElement.classList.add('dark');
    document.documentElement.dataset.layout = 'console';
    document.documentElement.dataset.themeLayout = 'console';
    document.documentElement.dataset.theme = 'matrix';
    document.documentElement.dataset.accent = 'matrix';
    document.documentElement.dataset.matrix = 'on';
    document.documentElement.dataset.weather = 'clear';
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body id="top">
        <BootLoader />
        <MatrixRain />

        <div className="app-shell">
          {children}
        </div>
      </body>
    </html>
  );
}