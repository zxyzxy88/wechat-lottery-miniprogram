# 📦 已安装的全局技能列表

## 🎯 通过 `npx skills` 安装的全局技能

| 技能名称 | 安装位置 | 描述 |
|---------|----------|------|
| **github-release** | `~/.agents/skills/github-release` | 准备和发布 GitHub Release，包括代码安全检查、标签创建、发布等功能 |
| **recipe-front-design** | `~/.agents/skills/recipe-front-design` | 前端设计阶段工作流，包括需求分析、UI 规格设计、技术设计文档等 |

## 🔌 CodeBuddy 内置连接器技能

| 技能名称 | 安装位置 | 描述 |
|---------|----------|------|
| **cnb-connector** | `~/.codebuddy/skills/cnb-connector` | 腾讯 CNB 代码平台集成 - clone/push 代码、PR 管理 |
| **figma-connector** | `~/.codebuddy/skills/figma-connector` | Figma API 连接器 - 获取设计数据、导出图片、生成代码 |
| **github-connector** | `~/.codebuddy/skills/github-connector` | GitHub 连接器 - clone/push 代码、PR 和 Issues 管理 |
| **gongfeng-connector** | `~/.codebuddy/skills/gongfeng-connector` | 工蜂代码平台集成 - clone/push 代码、PR 管理 |
| **preview** | `~/.codebuddy/skills/preview` | 预览、部署或运行 Web 项目 |

## 📊 统计信息

- **全局技能总数**: 7 个
- **通过 npx skills 安装**: 2 个
- **内置连接器**: 5 个

## 🔗 符号链接

以下技能通过符号链接到全局技能目录：
- `github-release` → `../../.agents/skills/github-release`
- `recipe-front-design` → `../../.agents/skills/recipe-front-design`

## 📝 查看已安装技能命令

```bash
# 列出全局技能
npx skills list -g

# 列出项目技能
npx skills list

# 查看技能目录
ls -la ~/.agents/skills/
ls -la ~/.codebuddy/skills/
```

## 🔍 技能详情

### github-release (jezweb/claude-skills@github-release)
- **安装次数**: 482
- **功能**:
  - 代码安全检查（secrets 扫描）
  - 移除个人文件
  - 验证 LICENSE 和 README
  - 创建版本标签
  - 发布 GitHub Release
- **触发词**: release, publish, open source, prepare for release, create release, github release

### recipe-front-design (shinpr/claude-code-workflows@recipe-front-design)
- **安装次数**: 9
- **功能**:
  - 需求分析
  - UI 规格设计
  - 技术设计文档创建
  - 文档审查

### 连接器技能
所有连接器技能都支持 OAuth 认证，通过 `get_token.sh` 脚本获取访问令牌。

---

生成时间: $(date '+%Y-%m-%d %H:%M:%S')
