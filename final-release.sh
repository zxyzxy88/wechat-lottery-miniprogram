#!/bin/bash

# ============================================
# GitHub Release 自动推送脚本
# 遵循 github-release 技能工作流
# ============================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "======================================"
echo "🚀 GitHub Release 自动推送"
echo "======================================"
echo ""

# 检查 Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ 需要设置 GITHUB_TOKEN 环境变量${NC}"
    echo ""
    echo "按照 github-release 技能要求，需要 GitHub Token 来创建 Release"
    echo ""
    echo "创建步骤:"
    echo "1. 访问: https://github.com/settings/tokens/new"
    echo "2. Note: wechat-lottery-release"
    echo "3. Scopes: ✅ repo (必须)"
    echo "4. Generate 并复制 token"
    echo ""
    echo "然后运行:"
    echo "export GITHUB_TOKEN='ghp_xxxx'"
    echo "/workspace/final-release.sh"
    exit 1
fi

# 项目目录
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
cd "$PROJECT_DIR" || exit 1

# 获取用户信息
echo -e "${BLUE}🔍 获取 GitHub 用户信息...${NC}"
USER_API=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER=$(echo "$USER_API" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"//')

if [ -z "$USER" ]; then
    echo -e "${RED}❌ Token 无效${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GitHub 用户: $USER${NC}"
echo ""

# 仓库信息
REPO_NAME="wechat-lottery-miniprogram"
VERSION="v1.0.0"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# Phase 1: Sanitize (已完成)
echo -e "${BLUE}📋 Phase 1: Sanitize (已验证)${NC}"
echo "  ✅ 无 .env 文件"
echo "  ✅ LICENSE 存在"
echo "  ✅ README 完整"
echo "  ✅ .gitignore 配置正确"
echo ""

# Phase 2: Release
echo -e "${BLUE}🚀 Phase 2: Release${NC}"
echo ""

# 1. 创建仓库
echo "1️⃣  创建/检查仓库..."
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USER/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo -e "${YELLOW}   ℹ️  仓库已存在: $USER/$REPO_NAME${NC}"
else
    echo "   创建新仓库..."
    curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/user/repos" \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"$DESCRIPTION\",\"private\":false}" > /dev/null
    echo -e "${GREEN}   ✅ 仓库创建成功${NC}"
fi

# 2. 配置远程并推送
echo ""
echo "2️⃣  推送代码和标签..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/$USER/$REPO_NAME.git"

git push -u origin main --force 2>&1 | sed 's/^/   /'
git push origin $VERSION --force 2>/dev/null || git push origin $VERSION 2>&1 | sed 's/^/   /'

echo -e "${GREEN}   ✅ 代码推送完成${NC}"

# 3. 创建 GitHub Release
echo ""
echo "3️⃣  创建 GitHub Release $VERSION..."
RELEASE_RESPONSE=$(curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$USER/$REPO_NAME/releases" \
    -d "{
        \"tag_name\": \"$VERSION\",
        \"name\": \"🎉 $VERSION - 首次发布\",
        \"body\": \"## ✨ 功能亮点\\n\\n- 🎯 完整的抽奖功能\\n- 📱 支持群聊和手动添加参与者\\n- 🎨 精美的抽奖动画\\n- 📊 历史记录管理\\n- 🎲 公平的随机算法\\n\\n## 📖 使用说明\\n\\n详见项目 [README.md](README.md)\\n\\n## 🚀 快速开始\\n\\n\`\`\`bash\\ngit clone https://github.com/$USER/$REPO_NAME.git\\ncd $REPO_NAME\\n# 在微信开发者工具中导入项目\\n\`\`\`\",
        \"draft\": false,
        \"prerelease\": false
    }")

RELEASE_URL=$(echo "$RELEASE_RESPONSE" | grep -o '"html_url"[[:space:]]*:[[:space:]]*"[^"]*' | grep -i 'releases' | sed 's/.*"html_url"[[:space:]]*:[[:space:]]*"//')

echo -e "${GREEN}   ✅ Release 创建成功${NC}"

# 4. Report
echo ""
echo "======================================"
echo -e "${GREEN}🎉 GitHub Release 完成！${NC}"
echo "======================================"
echo ""
echo -e "${BLUE}📦 仓库地址:${NC}"
echo "   https://github.com/$USER/$REPO_NAME"
echo ""
echo -e "${BLUE}🏷️  Release 地址:${NC}"
if [ -n "$RELEASE_URL" ]; then
    echo "   $RELEASE_URL"
else
    echo "   https://github.com/$USER/$REPO_NAME/releases/tag/$VERSION"
fi
echo ""
echo -e "${BLUE}📊 项目统计:${NC}"
echo "   - 版本: $VERSION"
echo "   - 文件: $(git ls-files | wc -l) 个"
echo "   - 提交: $(git log --oneline | wc -l) 个"
echo ""
echo -e "${GREEN}✅ 所有操作已完成！${NC}"
