# 2026-09-21 Pages 页面脚本测试门禁

本次基于 `main 781368d4c730c61cf4392a435ca7c3cc13af9068`，仅本地修改工作流与文档；
未 push、运行远端 Actions 或发布 Pages。没有修改网站脚本、引入构建工具或安装 npm 包。

原 Pages 流程 checkout 后直接上传 `site/`，未运行已有页面脚本测试。现在增加 Node 22
的 `test` job，执行原有 `node --test tests/*.test.cjs`，部署 job 使用 `needs: test`，只允许
非 PR 的 main 运行进入发布。PR 同样运行测试；触发路径增加 `tests/**`，修改门禁自身也
会检查。`pages: write` 与 `id-token: write` 从全局收窄到 deploy job，测试只有只读仓库权限。

artifact 仍仅为 `site/`；README 与本记录所在 `docs/` 不进入发布包。没有更改公开 URL 或
重定向归属，也没有假定下次提交等于已发布。

本机运行现有 9 项 Node 测试，9/9 通过：涵盖 Argosbx 文本渲染/XSS 输入、Base64 Unicode/
二进制回退与下载状态同步。测试使用虚拟 DOM 与 fake fetch，不访问真实 API；它们不是
全站浏览器、视觉、移动端布局或真实服务验收。YAML、job 依赖、PR 禁止部署、权限范围、
站点 artifact 路径与文档链接检查通过。GitHub runner 尚未执行，不能计为远端 CI 通过。

本地可撤销本次 workflow/doc 提交。未来若需调整 CI，应保持发布依赖测试成功；删除
`needs` 或绕过测试会重新允许坏页面脚本直接发布，应由维护者明确决定。因为本轮没有
发布，当前线上站点无需恢复操作。
