# 🚀 上传代码到 GitHub - 完整指南

## 📦 项目信息

- **项目名称**: wechat-lottery-miniprogram
- **版本**: v1.0.0
- **文件**: 23 个
- **代码**: 3468+ 行
- **压缩包**: `/workspace/wechat-lottery-miniprogram-v1.0.0.tar.gz` (20KB)

---

## 🎯 方法一：使用 GitHub Token（最快）

### 步骤 1: 创建 GitHub Personal Access Token

1. 访问 https://github.com/settings/tokens/new
2. 填写信息：
   - **Note**: `wechat-lottery-upload`
   - **Expiration**: 7 days（或更长）
   - **Select scopes**: 勾选 ✅ `repo` (完整仓库权限)
3. 点击 **Generate token**
4. ⚠️ **立即复制** token（只显示一次）

### 步骤 2: 设置环境变量并运行脚本

```bash
# 设置 Token 环境变量
export GITHUB_TOKEN='ghp_xxxxxxxxxxxxxxxxxxxx'

# 运行上传脚本
/workspace/upload-with-token.sh
```

脚本会自动：
- ✅ 获取你的 GitHub 用户名
- ✅ 创建公开仓库
- ✅ 推送所有代码
- ✅ 创建 v1.0.0 标签
- ✅ 显示仓库地址

---

## 🎯 方法二：使用 GitHub CLI

### 步骤 1: 安装 GitHub CLI

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
# Debian/Ubuntu
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

**Windows:**
```powershell
winget install GitHub.cli
```

### 步骤 2: 认证 GitHub CLI

```bash
gh auth login
```

按提示选择：
- `GitHub.com`
- `HTTPS`
- `Yes` (authenticate Git)
- `Login with a web browser`
- 复制 one-time code
- 按 Enter 打开浏览器
- 在浏览器中粘贴 code 并授权

### 步骤 3: 运行上传脚本

```bash
/workspace/upload-to-github.sh
```

---

## 🎯 方法三：手动上传（最简单）

### 步骤 1: 在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `wechat-lottery-miniprogram`
   - **Description**: `微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录`
   - **Public**
   - ⚠️ **不要**勾选任何初始化选项
3. 点击 **Create repository**

### 步骤 2: 下载并解压项目

```bash
# 解压项目
cd /workspace
tar -xzf wechat-lottery-miniprogram-v1.0.0.tar.gz
cd wechat-lottery-miniprogram
```

### 步骤 3: 推送代码

```bash
# 初始化 Git
git init
git branch -m main

# 添加文件
git add .

# 创建提交
git commit -m "🎉 初始提交：微信小程序抽奖应用 v1.0.0"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram.git

# 推送代码
git push -u origin main

# 创建版本标签
git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布"
git push origin v1.0.0
```

---

## 🎯 方法四：网页直接上传

1. 下载 `/workspace/wechat-lottery-miniprogram-v1.0.0.tar.gz`
2. 解压缩到本地
3. 在 GitHub 仓库页面点击 **"uploading an existing file"**
4. 拖拽所有文件到上传区域
5. Commit 信息: `🎉 初始提交：微信小程序抽奖应用 v1.0.0`
6. 点击 **Commit changes**

---

## ✅ 验证上传成功

访问你的仓库页面，确认：

```
https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram
```

检查清单：
- ✅ 所有文件都已上传
- ✅ README.md 正确显示项目介绍
- ✅ 可以看到 v1.0.0 标签
- ✅ 仓库描述正确显示

---

## 📋 项目内容

```
wechat-lottery-miniprogram/
├── 📄 README.md              # 完整使用文档
├── 📄 PROJECT.md             # 项目配置说明
├── 📄 LICENSE                # MIT 开源协议
├── 📄 .gitignore             # Git 忽略配置
├── 📱 app.js/json/wxss       # 小程序入口文件
├── 📂 pages/                 # 页面文件
│   ├── index/                # 选择参与者页面 (4 files)
│   ├── lottery/              # 抽奖页面 (4 files)
│   └── history/              # 历史记录页面 (4 files)
├── 📂 utils/                 # 工具函数
│   └── util.js               # 通用工具
└── 📂 images/                # 图标资源
    ├── README.md             # 图标说明
    └── participants.svg      # 矢量图标
```

---

## 🏷️ 创建 GitHub Release（推荐）

上传成功后，创建正式发布：

1. 进入仓库页面
2. 点击右侧 **"Releases"**
3. 点击 **"Draft a new release"**
4. 填写信息：
   - **Tag version**: `v1.0.0`
   - **Release title**: `🎉 v1.0.0 - 首次发布`
   - **Description**:
     ```markdown
     ## ✨ 功能亮点
     
     - 🎯 完整的抽奖功能
     - 📱 支持群聊和手动添加参与者
     - 🎨 精美的抽奖动画
     - 📊 历史记录管理
     - 🎲 公平的随机算法
     
     ## 📖 使用说明
     
     详见 [README.md](README.md)
     ```
5. 点击 **"Publish release"**

---

## 💡 推荐

- **最快方法**: 方法一（使用 Token 脚本自动上传）
- **最简单方法**: 方法四（网页直接上传）
- **最安全方法**: 方法二（GitHub CLI）

---

## ❓ 需要帮助？

如果遇到问题，请提供：
1. 具体的错误信息
2. 你使用的方法
3. 操作系统信息

我会帮你解决！

---

**准备好上传了吗？选择一种方法开始吧！** 🚀
