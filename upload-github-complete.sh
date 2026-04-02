#!/bin/bash

# ============================================
# GitHub 项目完整上传脚本
# 使用 GitHub REST API（不需要 gh CLI 认证）
# ============================================

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "======================================"
echo "🚀 GitHub 项目完整上传"
echo "======================================"
echo ""

# 检查环境变量
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  需要设置 GitHub Token${NC}"
    echo ""
    echo "请创建 GitHub Token:"
    echo "1. 访问: https://github.com/settings/tokens/new"
    echo "2. 设置 Note: wechat-lottery-upload"
    echo "3. 勾选 Scopes: ✅ repo"
    echo "4. 点击 Generate token 并复制"
    echo ""
    echo "然后设置环境变量:"
    echo "export GITHUB_TOKEN='ghp_xxxxxxxxxxxx'"
    echo ""
    exit 1
fi

# 项目信息
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
REPO_NAME="wechat-lottery-miniprogram"
VERSION="v1.0.0"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# 获取用户信息
echo -e "${BLUE}🔍 获取 GitHub 用户信息...${NC}"
USER_API=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER=$(echo "$USER_API" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"//')

if [ -z "$USER" ]; then
    echo -e "${RED}❌ Token 无效或无法获取用户信息${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GitHub 用户: $USER${NC}"
echo ""

# 创建仓库
echo -e "${BLUE}📦 创建/检查仓库...${NC}"
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USER/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo -e "${YELLOW}ℹ️  仓库已存在: $USER/$REPO_NAME${NC}"
else
    echo "创建新仓库..."
    curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/user/repos" \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"$DESCRIPTION\",\"private\":false}" > /dev/null
    
    echo -e "${GREEN}✅ 仓库创建成功${NC}"
fi

# 初始化 Git
cd "$PROJECT_DIR"
if [ ! -d ".git" ]; then
    echo ""
    echo -e "${BLUE}📝 初始化 Git...${NC}"
    git init
    git branch -m main
    git config user.name "WeChat Lottery"
    git config user.email "lottery@example.com"
fi

# 配置远程仓库
echo ""
echo -e "${BLUE}🔗 配置远程仓库...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/$USER/$REPO_NAME.git"

# 添加文件
echo ""
echo -e "${BLUE}📦 添加文件...${NC}"
git add .

# 创建提交
if git diff --staged --quiet; then
    echo -e "${YELLOW}ℹ️  没有新的更改${NC}"
else
    echo -e "${BLUE}💾 创建提交...${NC}"
    git commit -m "🎉 初始提交：微信小程序抽奖应用 $VERSION

功能亮点：
- 🎯 完整的抽奖功能
- 📱 支持群聊和手动添加参与者
- 🎨 精美的抽奖动画
- 📊 历史记录管理
- 🎲 公平的随机算法"
fi

# 推送代码
echo ""
echo -e "${BLUE}🚀 推送代码到 GitHub...${NC}"
git push -u origin main --force

# 创建标签
echo ""
echo -e "${BLUE}🏷️  创建版本标签 $VERSION...${NC}"
git tag -a $VERSION -m "版本 1.0.0 - 首次发布" -f 2>/dev/null || git tag -a $VERSION -m "版本 1.0.0 - 首次发布"
git push origin $VERSION -f 2>/dev/null || git push origin $VERSION

# 创建 Release
echo ""
echo -e "${BLUE}📋 创建 GitHub Release...${NC}"
curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$USER/$REPO_NAME/releases" \
    -d "{
        \"tag_name\": \"$VERSION\",
        \"name\": \"🎉 $VERSION - 首次发布\",
        \"body\": \"## ✨ 功能亮点\\n\\n- 🎯 完整的抽奖功能\\n- 📱 支持群聊和手动添加参与者\\n- 🎨 精美的抽奖动画\\n- 📊 历史记录管理\\n- 🎲 公平的随机算法\\n\\n## 📖 使用说明\\n\\n详见 README.md\",
        \"draft\": false,
        \"prerelease\": false
    }" > /dev/null

echo ""
echo "======================================"
echo -e "${GREEN}🎉 上传完成！${NC}"
echo "======================================"
echo ""
echo -e "${BLUE}🔗 仓库地址:${NC}"
echo "   https://github.com/$USER/$REPO_NAME"
echo ""
echo -e "${BLUE}📦 Release 地址:${NC}"
echo "   https://github.com/$USER/$REPO_NAME/releases/tag/$VERSION"
echo ""
echo -e "${GREEN}✅ 所有操作已完成！${NC}"
