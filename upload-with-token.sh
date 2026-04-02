#!/bin/bash

# GitHub 上传脚本 - 使用 Personal Access Token
# 项目：微信小程序抽奖应用 v1.0.0

echo "==============================================="
echo "🚀 GitHub 自动上传脚本"
echo "==============================================="
echo ""
echo "项目：wechat-lottery-miniprogram"
echo "版本：v1.0.0"
echo "描述：微信小程序抽奖应用"
echo ""

# 检查是否提供了 GITHUB_TOKEN
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  需要设置 GitHub Personal Access Token"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "步骤 1: 创建 GitHub Token"
    echo "  1. 访问: https://github.com/settings/tokens/new"
    echo "  2. Note: wechat-lottery-upload"
    echo "  3. Expiration: 7 days (或更长)"
    echo "  4. Select scopes: 勾选 ✅ repo (完整仓库权限)"
    echo "  5. 点击 'Generate token'"
    echo "  6. ⚠️  复制生成的 token（只显示一次）"
    echo ""
    echo "步骤 2: 设置环境变量"
    echo "  export GITHUB_TOKEN='your_token_here'"
    echo ""
    echo "步骤 3: 重新运行此脚本"
    echo "  /workspace/upload-with-token.sh"
    echo ""
    exit 1
fi

echo "✅ 检测到 GITHUB_TOKEN"
echo ""

# 进入项目目录
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
cd "$PROJECT_DIR" || exit 1

# 获取 GitHub 用户名
echo "🔍 获取 GitHub 用户信息..."
USER_API=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER=$(echo "$USER_API" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"//')

if [ -z "$USER" ]; then
    echo "❌ 无法获取用户信息，请检查 Token 是否有效"
    exit 1
fi

echo "👤 GitHub 用户: $USER"
echo ""

# 仓库名称和描述
REPO_NAME="wechat-lottery-miniprogram"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# 检查仓库是否已存在
echo "🔍 检查仓库是否存在..."
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USER/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo "ℹ️  仓库已存在: $USER/$REPO_NAME"
else
    # 创建新仓库
    echo "📦 创建新仓库..."
    CREATE_REPO=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/user/repos" \
        -d "{
            \"name\": \"$REPO_NAME\",
            \"description\": \"$DESCRIPTION\",
            \"private\": false,
            \"auto_init\": false
        }")
    
    REPO_URL=$(echo "$CREATE_REPO" | grep -o '"html_url"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"html_url"[[:space:]]*:[[:space:]]*"//')
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ 创建仓库失败"
        echo "$CREATE_REPO"
        exit 1
    fi
    
    echo "✅ 仓库创建成功"
fi

# 初始化 Git
if [ ! -d ".git" ]; then
    echo "📝 初始化 Git 仓库..."
    git init
    git branch -m main
fi

# 配置 Git 用户信息
git config user.name "WeChat Lottery"
git config user.email "lottery@example.com"

# 添加远程仓库
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/$USER/$REPO_NAME.git"

# 添加所有文件
echo "📦 添加文件..."
git add .

# 创建提交
if git diff --staged --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
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
echo "🚀 推送代码到 GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码推送成功！"
    echo ""
    
    # 创建版本标签
    echo "🏷️  创建版本标签 v1.0.0..."
    git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布" -f
    git push origin v1.0.0 -f
    
    echo ""
    echo "==============================================="
    echo "🎉 上传完成！"
    echo "==============================================="
    echo ""
    echo "🔗 仓库地址："
    echo "   https://github.com/$USER/$REPO_NAME"
    echo ""
    echo "📊 项目统计："
    echo "   - 版本: v1.0.0"
    echo "   - 文件: $(git ls-files | wc -l) 个"
    echo "   - 代码: $(git ls-files | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}') 行"
    echo ""
    echo "🎯 接下来你可以："
    echo "   1. 访问仓库查看代码"
    echo "   2. 创建 GitHub Release"
    echo "   3. 添加仓库主题标签"
    echo "   4. 分享项目给其他人"
    echo ""
else
    echo "❌ 推送失败"
    exit 1
fi
