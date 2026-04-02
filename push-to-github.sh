#!/bin/bash

# GitHub 仓库创建和推送脚本
# 项目：微信小程序抽奖应用

echo "=================================="
echo "GitHub 仓库创建和代码推送"
echo "=================================="
echo ""

# 检查是否已安装 gh 命令
if ! command -v gh &> /dev/null; then
    echo "❌ 错误：未找到 gh 命令"
    echo "请安装 GitHub CLI: https://cli.github.com/"
    exit 1
fi

# 检查是否已认证
if ! gh auth status &> /dev/null; then
    echo "⚠️  需要进行 GitHub 认证"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 创建 GitHub 个人访问令牌："
    echo "   访问: https://github.com/settings/tokens/new"
    echo "   权限: 选择 repo (完整仓库操作权限)"
    echo ""
    echo "2. 设置环境变量："
    echo "   export GH_TOKEN=your_token_here"
    echo ""
    echo "3. 或使用命令登录："
    echo "   gh auth login"
    echo ""
    exit 1
fi

# 进入项目目录
cd /workspace/wechat-lottery-miniprogram

# 创建 GitHub 仓库
echo "📦 正在创建 GitHub 仓库..."
gh repo create wechat-lottery-miniprogram \
    --public \
    --description "微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录" \
    --source=. \
    --remote=origin \
    --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 成功！仓库已创建并推送"
    echo ""
    echo "🔗 仓库地址："
    gh repo view --web
else
    echo ""
    echo "❌ 创建仓库失败"
    echo "请检查你的 GitHub 认证信息"
fi
