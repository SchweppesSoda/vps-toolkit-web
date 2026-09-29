# VPS Toolkit browser tools

本仓维护静态浏览器工具；运维脚本归 `VPS-Toolkit`。

## 本地工作与完成标准

- 在主目录 `main` 自主完成范围内的编辑、可逆本地生成、相关验证和提交，不在第一版后等待 review。同仓一个写入任务；仅用户要求隔离/并行时另建工作树，完成后按内容收回并清理。
- 开始核对仓库、分支、工作树、已有改动和上游。保留无关改动；需要刷新上游便 fetch，离线注明未核实并继续独立本地工作。安全时 fast-forward，分叉不重置/强推；发布前再确认目标。
- 搜索和测试从变更对象与直接消费者开始；共享契约、重命名/删除或失败证据才扩大。文档检查链接/diff，行为修改跑对应测试，通过后不无理由重复；正式发布门禁保留。
- 完成包括请求落地、相关验证/文档和范围明确的本地提交；报告限制、本地/远程及发布状态。推送、Release、部署沿用会话授权；缺少授权时先准备可审阅的本地结果，仅暂停依赖该授权的动作。
- 临时输出用 `.tmp/`；清理前核对未跟踪、忽略文件及恢复依赖，必要备份放仓库外。保留历史 tag/冻结归档，不整目录忽略共享 `.codex/` 配置。

## Structure

- `site/`: GitHub Pages source. It must stay static and build-free unless the repository explicitly adopts a build step later.
- `docs/`: technical notes for maintaining each browser tool. Do not publish these files as Pages artifacts.
- `.github/workflows/pages.yml`: deploys `site/` to `https://schweppessoda.github.io/vps-toolkit-web/`.

## Maintenance Rules

- For UI changes, read the relevant `docs/*/*_technical.md` first.
- Keep relative links under `site/` working when served from `/vps-toolkit-web/`.
- Do not add secrets, subscriptions, node links, exports, or server-specific files.
- If a public URL changes, update `README.md` and add redirects in `SchweppesSoda/SchweppesSoda.github.io` when old links already existed.

## 按变更验证

- 首页导航或公共 URL 改动：核对受影响链接与 `/vps-toolkit-web/` 子路径。
- 工具 UI 改动：查看该工具相关技术文档，验证改变的交互及桌面/手机布局；共享样式变化再扩到消费者。
- 纯文档/指令改动：链接与 `git diff --check`，无需打开所有工具或重跑全部 UI。

## 文档归属

- README（含子目录）只写当前功能、使用方法、必要限制和固定文档入口。
- 逐次维护、部署、验收、测速、测试通过数量及收尾状态放 `docs/maintenance/` 的独立记录，由 `docs/maintenance/INDEX.md` 收录；版本变更沿用已有 CHANGELOG。README 不追加单次记录或其链接。
- “更新文档”指同步受影响的当前用法，不等于复制执行过程。记录历史时保留日期、版本与验证限制；不把旧现场状态改写成当前保证。
- 纯文档修改检查链接和 diff；不为整理文档运行部署或业务全量测试。
