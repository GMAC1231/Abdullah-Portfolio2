# Mobile Navigation Update

The portfolio header and mobile menu were rebuilt for reliable use on phones, tablets, landscape screens, and GitHub Pages.

## Improvements

- Responsive header spacing at 900px, 700px, 480px, and 350px breakpoints
- Full-height mobile menu using `100dvh` and safe-area padding
- Mobile navigation rendered through a React portal so sticky headers and backdrop filters cannot trap the overlay
- Scrollable menu on short and landscape screens
- Active-section highlighting
- Escape-key, backdrop, hash-change, and viewport-resize closing
- Body scroll lock while the menu is open
- Focus moves to the close button and returns to the menu button
- Larger touch targets
- Compact branding on narrow phones
- Theme control available inside the mobile menu
- Correct section scroll offsets below the sticky header
- Reduced-motion support
