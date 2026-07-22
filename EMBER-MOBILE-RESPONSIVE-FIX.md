# Ember Mobile Responsive Fix

This update repairs the Ember project cards on phones and tablets.

## Fixed
- Project cards no longer extend beyond the viewport.
- The TaskFlow green miniature reserves room for its Ember offset shadow.
- The GitHub repository action is no longer reduced to a 35px legacy icon button.
- Project actions remain full-width and readable.
- Internship attribution, technology badges, and project text stay inside the card.
- The floating DEVOS launcher respects phone safe areas.
- Very small phones use a simplified TaskFlow miniature.

The main correction is in `app/responsive-fixes.css`, with one legacy selector
repair in `app/globals.css`.
