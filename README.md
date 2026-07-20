# Abdullah Muhammad — Coding Portfolio

A responsive developer portfolio built with **Next.js, React, TypeScript, Tailwind CSS, Motion, and Lucide React**.

## Design upgrade

- Deep navy coding interface
- Cyan, Matrix-green, and purple accents
- Animated falling `0` and `1` Matrix rain
- Subtle grid and monitor scan-line effects
- Blinking terminal cursor and developer-style labels
- Responsive project cards, timelines, certificate cards, and project case studies
- Accessible reduced-motion support
- Dark and light theme control

## Portfolio features

- Responsive sticky navigation and mobile menu
- Animated hero and scroll reveals
- Filterable project gallery
- Static project case-study pages
- Skills and internship experience sections
- Embedded certificate PDF viewer for IBM and Qwetrum credentials
- Interactive developer terminal
- Email, WhatsApp, GitHub, and LinkedIn contact links
- Contact enquiry form removed
- Static export and GitHub Pages deployment workflow
- Original AD logo, profile image, CV, and certificates preserved

## Technology stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- Motion for React
- Lucide React
- React Icons


## DEVOS 3.0 interactive terminal

The upgraded portfolio includes a command-driven developer operating system with:

- Four portfolio layouts controlled from the terminal
- Four runtime color themes
- Matrix and glitch effects
- A safe simulated portfolio crash and recovery screen
- Snake, Tic-Tac-Toe, number guessing, and rock-paper-scissors
- A sandboxed live HTML/CSS playground
- Command history, autocomplete, quick actions, and keyboard shortcuts

See [`DEVOS-COMMANDS.md`](./DEVOS-COMMANDS.md) for the full command reference.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate the code

```bash
npm run lint
npm run build
```

The static website is generated in `out/`.

## GitHub Pages

The included `.github/workflows/deploy.yml` workflow deploys the site whenever code is pushed to `main`.

1. Upload the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Select **GitHub Actions** as the source.
4. Push to `main` or manually run the deployment workflow.

`next.config.ts` automatically detects the repository name and applies the required GitHub Pages `basePath`.

## Main files

- `data/portfolio.ts` — projects, skills, experience, certificates, and contact details
- `app/globals.css` — complete coding/Matrix design system
- `components/MatrixRain.tsx` — animated binary and coding-symbol background
- `components/` — reusable portfolio sections and UI
- `public/documents/` — CV and certificate PDFs

## Update your information

Edit `data/portfolio.ts` to change project descriptions, links, skills, certificates, and contact details.

## DEVOS 4.7 startup sequence

The portfolio begins with a mixed cinematic boot screen combining Matrix binary rain, a cyan connected-node network, orange thermal waves, rising sparks, loading progress, and system diagnostics. Replay it from the terminal with `boot`, `loader`, or `startup`.
