# GitHub Pages Performance Update

This update keeps automatic theme rotation and themed loading screens while reducing browser workload.

## Changes

- Automatic theme rotation now runs every 60 seconds on desktop and 90 seconds on lower-power/mobile devices.
- Automatic rotation waits while the visitor is scrolling or interacting.
- Automatic changes use a compact loading screen (about 1 second).
- The first-load/manual loading screen is shorter and capped to a lower frame rate.
- The background canvas is capped near 30 FPS (about 24 FPS on lower-power devices).
- Canvas pixel density and particle counts are reduced adaptively.
- The background canvas stops drawing while the loading screen is active.
- Resize work is debounced.
- Expensive all-card gradient/shadow transitions were removed.
- Reduced-motion users receive a static background and no automatic rotation.
