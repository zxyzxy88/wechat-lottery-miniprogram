# 🚀 GitHub 上传完整指南

## 📦 项目信息

- **项目名称**: wechat-lottery-miniprogram
- **版本**: v1.0.0
- **描述**: 微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录
- **压缩包**: `wechat-lottery-miniprogram-v1.0.0.tar.gz` (20KB)

---

## 方法一：使用 GitHub 网页上传（最简单）

### 步骤 1: 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `wechat-lottery-miniprogram`
   - **Description**: `微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录`
   - **可见性**: 选择 Public（公开）
   - ⚠️ **不要**勾选 "Add a README file"
   - ⚠️ **不要**勾选 "Add .gitignore"
   - ⚠️ **不要**勾选 "Choose a license"
3. 点击 "Create repository"

### 步骤 2: 上传文件

**方式 A: 直接上传压缩包**
1. 下载 `wechat-lottery-miniprogram-v1.0.0.tar.gz`
2. 解压缩到本地
3. 在 GitHub 仓库页面点击 "uploading an existing file"
4. 将所有文件拖拽到上传区域
5. 在 Commit 信息中填写: `🎉 初始提交：微信小程序抽奖应用 v1.0.0`
6. 点击 "Commit changes"

**方式 B: 使用命令行（推荐）**

```bash
# 1. 解压下载的压缩包
tar -xzf wechat-lottery-miniprogram-v1.0.0.tar.gz

# 2. 进入项目目录
cd wechat-lottery-miniprogram

# 3. 初始化 Git
git init
git branch -m main

# 4. 添加所有文件
git add .

# 5. 创建提交
git commit -m "🎉 初始提交：微信小程序抽奖应用 v1.0.0"

# 6. 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram.git

# 7. 推送到 GitHub
git push -u origin main

# 8. 创建版本标签
git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布"
git push origin v1.0.0
```

---

## 方法二：使用 GitHub CLI（gh 命令）

如果你已安装 GitHub CLI，可以使用以下命令：

```bash
# 1. 解压项目
tar -xzf wechat-lottery-miniprogram-v1.0.0.tar.gz
cd wechat-lottery-miniprogram

# 2. 登录 GitHub（如果还未登录）
gh auth login

# 3. 初始化 Git
git init
git branch -m main
git add .
git commit -m "🎉 初始提交：微信小程序抽奖应用 v1.0.0"

# 4. 创建仓库并推送（一步完成）
gh repo create wechat-lottery-miniprogram \
  --public \
  --description "微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录" \
  --source=. \
  --remote=origin \
  --push

# 5. 创建版本标签
git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布"
git push origin v1.0.0
```

---

## 方法三：使用 Personal Access Token

### 步骤 1: 创建 GitHub Token

1. 访问 https://github.com/settings/tokens/new
2. 填写信息：
   - **Note**: `wechat-lottery-upload`
   - **Expiration**: 选择有效期（建议 7 days）
   - **Select scopes**: 勾选 `repo`（完整仓库权限）
3. 点击 "Generate token"
4. ⚠️ **重要**: 复制生成的 token（只显示一次）

### 步骤 2: 使用 Token 推送

```bash
# 1. 解压项目
tar -xzf wechat-lottery-miniprogram-v1.0.0.tar.gz
cd wechat-lottery-miniprogram

# 2. 初始化 Git
git init
git branch -m main
git add .
git commit -m "🎉 初始提交：微信小程序抽奖应用 v1.0.0"

# 3. 创建 GitHub 仓库（使用 Token）
export GH_TOKEN=your_token_here
gh repo create wechat-lottery-miniprogram \
  --public \
  --description "微信小程序抽奖应用" \
  --source=. \
  --remote=origin \
  --push

# 4. 创建版本标签
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

---

## ✅ 验证上传成功

上传完成后，访问你的仓库页面：
```
https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram
```

确认以下内容：
- ✅ 所有文件都已上传
- ✅ README.md 正确显示
- ✅ 可以看到 v1.0.0 标签（在 Releases 或 Tags 页面）
- ✅ 仓库描述正确

---

## 📋 项目文件清单

上传后应包含以下文件：

```
wechat-lottery-miniprogram/
├── .gitignore
├── LICENSE
├── README.md
├── PROJECT.md
├── app.js
├── app.json
├── app.wxss
├── sitemap.json
├── pages/
│   ├── index/          (4 files)
│   ├── lottery/        (4 files)
│   └── history/        (4 files)
├── utils/
│   └── util.js
└── images/
    ├── README.md
    └── participants.svg
```

---

## 🎯 创建 Release（可选）

在 GitHub 上创建正式发布：

1. 进入仓库页面
2. 点击右侧 "Releases"
3. 点击 "Draft a new release"
4. 填写信息：
   - **Tag version**: v1.0.0
   - **Release title**: 🎉 v1.0.0 - 首次发布
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
5. 点击 "Publish release"

---

## ❓ 常见问题

### Q: 推送时提示 "fatal: 'origin' already exists"
**A**: 运行 `git remote remove origin` 后重新添加

### Q: 推送时需要输入密码
**A**: 使用 Personal Access Token 作为密码，而不是 GitHub 密码

### Q: 如何更新代码？
**A**: 
```bash
git add .
git commit -m "更新说明"
git push
```

---

## 📞 需要帮助？

如果在上传过程中遇到问题，请提供：
1. 具体的错误信息
2. 你使用的上传方法
3. 你的操作系统

我会帮你解决！

---

**推荐**: 使用方法一（网页上传）最简单快捷！
