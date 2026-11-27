# Martin Hanispak — Art Portfolio

## Vision

A calm, image-led portfolio that presents Martin Hanispak's paintings clearly, works well on phones and desktops, and stays straightforward to maintain.

## Current site

- Static HTML, CSS, and JavaScript hosted on GitHub Pages.
- The homepage features artwork slideshows and a responsive portfolio layout.
- Detailed development and maintenance rules are in [PROJECT_RULES.md](./PROJECT_RULES.md).
- The Rive CLI is installed locally, but no Rive runtime is currently part of the site.
- No comments or likes backend is connected yet.

## Priorities

1. **Paused — homepage artwork teaser:** The CSS color-shimmer experiment was reverted. Revisit only after previewing the effect in the page and getting approval.
2. **Deferred — homepage title:** Revisit a Rive title animation later. The homepage title is unchanged; no Rive prototype or runtime is connected to the site.
3. **Deferred — portfolio updates:** Finish planned artwork and layout changes before adding visitor interactions.
4. **Later — comments and likes:** Add per-painting comments and likes using a managed backend such as Firebase Spark, so visitors do not need GitHub accounts. Revisit this after the portfolio structure is settled.

## Project guidelines

- Keep the paintings as the focus; avoid unnecessary captions or visual clutter.
- Keep the site responsive, lightweight, and accessible.
- Do not add a self-hosted server requirement.
- Treat comments and likes as separate backend data; downloading the static site alone will not include them.
- Do not publish a watermarked Rive runtime unless that is explicitly approved.
- Do not upload Rive experiments to an external workspace without explicit approval.
- Keep this README as the source for project goals, priorities, and implementation status.
- Show visual changes in the page context and get approval before publishing them.