#!/bin/bash

# GitHub 上传脚本 - 使用 gh CLI
# 项目：微信小程序抽奖应用

echo "=================================="
echo "📦 GitHub 仓库创建和代码上传"
echo "=================================="
echo ""

# 设置项目目录
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
cd "$PROJECT_DIR" || exit 1

# 检查 gh 是否已安装
if ! command -v gh &> /dev/null; then
    echo "❌ 错误：未安装 GitHub CLI"
    echo ""
    echo "请先安装 GitHub CLI："
    echo "  macOS: brew install gh"
    echo "  Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo "  Windows: winget install GitHub.cli"
    exit 1
fi

# 检查认证状态
echo "🔍 检查 GitHub 认证状态..."
if ! gh auth status &> /dev/null; then
    echo ""
    echo "⚠️  需要进行 GitHub 认证"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "步骤 1: 运行认证命令"
    echo "  gh auth login"
    echo ""
    echo "步骤 2: 选择认证方式"
    echo "  ? What account do you want to log into? GitHub.com"
    echo "  ? What is your preferred protocol for Git operations? HTTPS"
    echo "  ? Authenticate Git with your GitHub credentials? Yes"
    echo "  ? How would you like to authenticate GitHub CLI? Login with a web browser"
    echo ""
    echo "步骤 3: 复制 one-time code"
    echo "步骤 4: 按 Enter 打开浏览器"
    echo "步骤 5: 在浏览器中粘贴 code 并授权"
    echo ""
    echo "完成认证后，重新运行此脚本"
    exit 1
fi

echo "✅ GitHub 已认证"
echo ""

# 获取用户信息
USER=$(gh api user --jq '.login')
echo "👤 当前用户: $USER"
echo ""

# 创建仓库
echo "📦 创建 GitHub 仓库..."
REPO_NAME="wechat-lottery-miniprogram"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# 检查仓库是否已存在
if gh repo view "$USER/$REPO_NAME" &> /dev/null; then
    echo "⚠️  仓库 $REPO_NAME 已存在"
    echo ""
    read -p "是否继续推送代码？ (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    # 创建新仓库
    gh repo create "$REPO_NAME" \
        --public \
        --description "$DESCRIPTION" \
        --no-add-readme
    
    if [ $? -ne 0 ]; then
        echo "❌ 创建仓库失败"
        exit 1
    fi
    
    echo "✅ 仓库创建成功"
fi

# 初始化 Git（如果还没有）
if [ ! -d ".git" ]; then
    echo ""
    echo "📝 初始化 Git 仓库..."
    git init
    git branch -m main
fi

# 添加远程仓库
echo ""
echo "🔗 配置远程仓库..."
if git remote | grep -q "^origin$"; then
    git remote set-url origin "https://github.com/$USER/$REPO_NAME.git"
else
    git remote add origin "https://github.com/$USER/$REPO_NAME.git"
fi

# 添加所有文件
echo ""
echo "📦 添加文件到暂存区..."
git add .

# 创建提交
if git diff --staged --quiet; then
    echo "ℹ️  没有需要提交的更改"
else
    echo ""
    echo "💾 创建提交..."
    git commit -m "🎉 初始提交：微信小程序抽奖应用 v1.0.0

功能亮点：
- 🎯 完整的抽奖功能
- 📱 支持群聊和手动添加参与者
- 🎨 精美的抽奖动画
- 📊 历史记录管理
- 🎲 公平的随机算法"
fi

# 推送代码
echo ""
echo "🚀 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码推送成功！"
    echo ""
    echo "🔗 仓库地址："
    echo "   https://github.com/$USER/$REPO_NAME"
    echo ""
    
    # 创建版本标签
    echo "🏷️  创建版本标签 v1.0.0..."
    git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布"
    git push origin v1.0.0
    
    if [ $? -eq 0 ]; then
        echo "✅ 标签创建成功"
        echo ""
        echo "🎉 完成！你的项目已成功上传到 GitHub"
        echo ""
        echo "接下来你可以："
        echo "1. 访问仓库查看代码"
        echo "2. 编辑 README.md 添加更多说明"
        echo "3. 在 Releases 页面查看 v1.0.0 标签"
        echo "4. 分享项目给其他人"
    fi
else
    echo "❌ 推送失败"
    exit 1
fi
