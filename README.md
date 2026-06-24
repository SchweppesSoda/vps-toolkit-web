# VPS Toolkit Web

Static browser tools for the VPS Toolkit project.

Canonical site:

- <https://schweppessoda.github.io/vps-toolkit-web/>
- <https://schweppessoda.github.io/vps-toolkit-web/tools/proxy-node-manager/proxy_node_manager.html>
- <https://schweppessoda.github.io/vps-toolkit-web/tools/argosbx-argo-batch/argosbx_argo_batch.html>

Operational scripts remain in [`SchweppesSoda/VPS-Toolkit`](https://github.com/SchweppesSoda/VPS-Toolkit). This repository only owns static browser-tool source and GitHub Pages deployment.

## Layout

- `site/`: GitHub Pages artifact source.
- `docs/`: technical notes for maintaining browser tools.
- `.github/workflows/pages.yml`: deploys `site/` with GitHub Pages Actions.

## Maintenance

Open `site/index.html` directly for a quick local smoke check. For UI changes, read the matching `docs/*/*_technical.md` file first and verify the affected page at desktop and mobile widths.
