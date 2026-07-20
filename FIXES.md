# Fixes applied

- Replaced the corrupted `app/globals.css` file that contained pasted Python and TSX code.
- Recreated `components/MatrixRain.tsx` as a valid React client component.
- Added `MatrixRain` correctly to `app/layout.tsx`.
- Added the `app-shell` content layer so page content stays above the Matrix animation.
- Kept the enquiry form removed and centered the remaining contact information.
- Replaced internal anchor navigation with Next.js `Link` components.
- Fixed the theme toggle effect to satisfy React Hooks linting.
- Added an ESLint 9 flat configuration for Next.js 16.
- Fixed the PostCSS configuration warning.
- Verified TypeScript, ESLint, static generation, and GitHub Pages output.
