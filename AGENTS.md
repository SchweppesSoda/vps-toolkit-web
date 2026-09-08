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

- Open `site/index.html` locally and verify all tool links.
- For changed tools, verify desktop and mobile layouts.
- Run `git diff --check` before committing.

## 日常维护与收尾

- 日常在本仓主目录的 `main` 工作；同仓一次只允许一个任务写入，只读检查可以并行。
- 开始前核对仓库、分支、工作树、未提交/未跟踪改动和远程状态。执行 `git fetch --tags --prune`，落后时在辨认遗留改动后使用 fast-forward；分叉先查明原因，不重置或强推。
- 只有用户明确要求并行或隔离才建立临时分支/工作树。验证后将适用改动收回主目录，检查未跟踪及忽略文件，再清理临时工作树；必要备份放仓库外。
- 已验证的改动在本仓源码主分支留下范围明确的本地提交。提交前再次核对远程和 staged 范围；推送、Release 和部署按用户已有授权执行，结束时说明本地/远程状态及剩余工作。
- `.tmp/` 只放可重建的构建、测试和临时核验输出；现场备份与长期维护资料另行保管。历史 tag、冻结归档和兼容入口按既有合同保留。
- 只忽略 `.codex/visualizations/`、`.codex/show-me-*.html` 等本地预览，不整目录忽略可能共享的 `.codex/` 配置。
