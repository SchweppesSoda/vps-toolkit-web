# VPS Toolkit Web

Static browser tools for the VPS Toolkit project.

Canonical site:

- <https://schweppessoda.github.io/vps-toolkit-web/>
- <https://schweppessoda.github.io/vps-toolkit-web/tools/proxy-node-manager/proxy_node_manager.html>
- <https://schweppessoda.github.io/vps-toolkit-web/tools/argosbx-argo-batch/argosbx_argo_batch.html>
- <https://schweppessoda.github.io/vps-toolkit-web/tools/base64-workbench/>

Operational scripts remain in [`SchweppesSoda/VPS-Toolkit`](https://github.com/SchweppesSoda/VPS-Toolkit). This repository only owns static browser-tool source and GitHub Pages deployment.

## Layout

- `site/`: GitHub Pages artifact source.
- `docs/`: technical notes for maintaining browser tools.
- `.github/workflows/pages.yml`: deploys `site/` with GitHub Pages Actions.

## Maintenance

Open `site/index.html` directly for a quick local smoke check. For UI changes, read the matching `docs/*/*_technical.md` file first and verify the affected page at desktop and mobile widths.

## Repository boundaries

Maintain source on `main`; [AGENTS.md](./AGENTS.md) records checkout, validation and commit rules. `site/` is the only Pages artifact. Root documentation and `docs/` remain repository documentation.

Use [VPS-Toolkit](https://github.com/SchweppesSoda/VPS-Toolkit) for operational scripts and [proxy-gateway-plus](https://github.com/SchweppesSoda/proxy-gateway-plus) for gateway implementation. Local previews and validation output belong in `.tmp/`; keep shared tooling configuration visible to Git.

Technical references: [Proxy Node Manager](./docs/proxy-node-manager/proxy_node_manager_technical.md), [Argosbx Argo Batch](./docs/argosbx-argo-batch/argosbx_argo_batch_technical.md), and [Base64 Workbench](./docs/base64-workbench/base64_workbench_technical.md).
