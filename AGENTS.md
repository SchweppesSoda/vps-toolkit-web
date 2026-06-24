# AGENTS.md

This repository owns static browser tools for VPS Toolkit. Operational scripts remain in `SchweppesSoda/VPS-Toolkit`.

## Structure

- `site/`: GitHub Pages source. It must stay static and build-free unless the repository explicitly adopts a build step later.
- `docs/`: technical notes for maintaining each browser tool. Do not publish these files as Pages artifacts.
- `.github/workflows/pages.yml`: deploys `site/` to `https://schweppessoda.github.io/vps-toolkit-web/`.

## Maintenance Rules

- For UI changes, read the relevant `docs/*/*_technical.md` first.
- Keep relative links under `site/` working when served from `/vps-toolkit-web/`.
- Do not add secrets, subscriptions, node links, exports, or server-specific files.
- If a public URL changes, update `README.md` and add redirects in `SchweppesSoda/SchweppesSoda.github.io` when old links already existed.

## Validation

- Open `site/index.html` locally and verify both tool links.
- For changed tools, verify desktop and mobile layouts.
- Run `git diff --check` before committing.
