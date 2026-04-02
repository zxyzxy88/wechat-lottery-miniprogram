#!/bin/bash

# ============================================
# GitHub 自动上传脚本
# 使用环境变量 GITHUB_TOKEN
# ============================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "======================================"
echo "🚀 GitHub 自动上传"
echo "======================================"
echo ""

# 检查 Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ 需要设置 GITHUB_TOKEN 环境变量${NC}"
    echo ""
    echo "创建 GitHub Token 步骤:"
    echo "1. 访问: https://github.com/settings/tokens/new"
    echo "2. Note: wechat-lottery-upload"
    echo "3. Scopes: ✅ repo"
    echo "4. Generate token 并复制"
    echo ""
    echo "然后运行:"
    echo "export GITHUB_TOKEN='ghp_你的token'"
    echo "/workspace/auto-upload.sh"
    exit 1
fi

# 项目目录
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
cd "$PROJECT_DIR"

# 获取用户信息
echo -e "${BLUE}🔍 获取 GitHub 用户信息...${NC}"
USER_API=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER=$(echo "$USER_API" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"//')

if [ -z "$USER" ]; then
    echo -e "${RED}❌ Token 无效${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 用户: $USER${NC}"
echo ""

# 仓库信息
REPO_NAME="wechat-lottery-miniprogram"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# 创建仓库
echo -e "${BLUE}📦 创建/检查仓库...${NC}"
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USER/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo -e "${YELLOW}ℹ️  仓库已存在${NC}"
else
    echo "创建新仓库..."
    curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/user/repos" \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"$DESCRIPTION\",\"private\":false}" > /dev/null
    echo -e "${GREEN}✅ 仓库创建成功${NC}"
fi

# 配置远程并推送
echo ""
echo -e "${BLUE}🔗 配置远程仓库...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/$USER/$REPO_NAME.git"

echo ""
echo -e "${BLUE}🚀 推送代码和标签...${NC}"
git push -u origin main --force
git push origin v1.0.0 --force 2>/dev/null || git push origin v1.0.0

# 创建 Release
echo ""
echo -e "${BLUE}📋 创建 GitHub Release...${NC}"
curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$USER/$REPO_NAME/releases" \
    -d "{
        \"tag_name\": \"v1.0.0\",
        \"name\": \"🎉 v1.0.0 - 首次发布\",
        \"body\": \"## ✨ 功能亮点\\n\\n- 🎯 完整的抽奖功能\\n- 📱 支持群聊和手动添加参与者\\n- 🎨 精美的抽奖动画\\n- 📊 历史记录管理\\n- 🎲 公平的随机算法\\n\\n## 📖 使用说明\\n\\n详见项目 README.md\",
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
echo -e "${BLUE}📦 Release:${NC}"
echo "   https://github.com/$USER/$REPO_NAME/releases/tag/v1.0.0"
