#!/bin/bash

# ============================================
# GitHub 项目自动推送脚本
# 项目：微信小程序抽奖应用 v1.0.0
# ============================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "======================================"
echo "🚀 GitHub 项目自动推送"
echo "======================================"
echo ""
echo "项目信息:"
echo "  名称: wechat-lottery-miniprogram"
echo "  版本: v1.0.0"
echo "  描述: 微信小程序抽奖应用"
echo ""

# 检查 Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ 错误: 未安装 Git${NC}"
    exit 1
fi

# 检查 curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ 错误: 未安装 curl${NC}"
    exit 1
fi

# 检查 GitHub Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  需要设置 GitHub Personal Access Token${NC}"
    echo ""
    echo "请按照以下步骤操作:"
    echo ""
    echo "1️⃣  创建 GitHub Token:"
    echo "   访问: https://github.com/settings/tokens/new"
    echo "   设置:"
    echo "     - Note: wechat-lottery-upload"
    echo "     - Expiration: 7 days (或更长)"
    echo "     - Scopes: ✅ repo (必须勾选)"
    echo "   点击 'Generate token' 并复制 token"
    echo ""
    echo "2️⃣  设置环境变量:"
    echo "   export GITHUB_TOKEN='ghp_xxxxxxxxxxxx'"
    echo ""
    echo "3️⃣  重新运行此脚本:"
    echo "   /workspace/push-to-github-final.sh"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ 检测到 GitHub Token${NC}"
echo ""

# 进入项目目录
PROJECT_DIR="/workspace/wechat-lottery-miniprogram"
cd "$PROJECT_DIR" || {
    echo -e "${RED}❌ 错误: 项目目录不存在${NC}"
    exit 1
}

# 获取 GitHub 用户信息
echo -e "${BLUE}🔍 获取 GitHub 用户信息...${NC}"
USER_API=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
USER=$(echo "$USER_API" | grep -o '"login"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"login"[[:space:]]*:[[:space:]]*"//')

if [ -z "$USER" ]; then
    echo -e "${RED}❌ 错误: 无法获取用户信息${NC}"
    echo -e "${YELLOW}请检查 GitHub Token 是否有效${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GitHub 用户: $USER${NC}"
echo ""

# 仓库信息
REPO_NAME="wechat-lottery-miniprogram"
DESCRIPTION="微信小程序抽奖应用 - 支持群聊选择、奖项设置、抽奖动画和历史记录"

# 检查仓库是否存在
echo -e "${BLUE}🔍 检查仓库是否存在...${NC}"
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$USER/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo -e "${YELLOW}ℹ️  仓库已存在: $USER/$REPO_NAME${NC}"
    echo ""
    read -p "是否继续推送代码？(y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "已取消"
        exit 0
    fi
else
    # 创建新仓库
    echo -e "${BLUE}📦 创建新仓库...${NC}"
    CREATE_RESPONSE=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.github.com/user/repos" \
        -d "{
            \"name\": \"$REPO_NAME\",
            \"description\": \"$DESCRIPTION\",
            \"private\": false,
            \"auto_init\": false
        }")
    
    # 检查是否创建成功
    REPO_URL=$(echo "$CREATE_RESPONSE" | grep -o '"html_url"[[:space:]]*:[[:space:]]*"[^"]*' | sed 's/.*"html_url"[[:space:]]*:[[:space:]]*"//')
    
    if [ -z "$REPO_URL" ]; then
        echo -e "${RED}❌ 创建仓库失败${NC}"
        echo "$CREATE_RESPONSE"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 仓库创建成功${NC}"
fi

# 初始化 Git（如果需要）
if [ ! -d ".git" ]; then
    echo ""
    echo -e "${BLUE}📝 初始化 Git 仓库...${NC}"
    git init
    git branch -m main
fi

# 配置 Git
git config user.name "WeChat Lottery" 2>/dev/null || true
git config user.email "lottery@example.com" 2>/dev/null || true

# 配置远程仓库
echo ""
echo -e "${BLUE}🔗 配置远程仓库...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/$USER/$REPO_NAME.git"

# 添加所有文件
echo ""
echo -e "${BLUE}📦 添加文件到暂存区...${NC}"
git add .

# 检查是否有更改
if git diff --staged --quiet; then
    echo -e "${YELLOW}ℹ️  没有新的更改需要提交${NC}"
else
    echo -e "${BLUE}💾 创建提交...${NC}"
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
echo -e "${BLUE}🚀 推送代码到 GitHub...${NC}"
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ 代码推送成功！${NC}"
    echo ""
    
    # 创建版本标签
    echo -e "${BLUE}🏷️  创建版本标签 v1.0.0...${NC}"
    git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布" -f 2>/dev/null || git tag -a v1.0.0 -m "版本 1.0.0 - 首次发布"
    git push origin v1.0.0 -f 2>/dev/null || git push origin v1.0.0
    
    echo ""
    echo "======================================"
    echo -e "${GREEN}🎉 上传完成！${NC}"
    echo "======================================"
    echo ""
    echo -e "${BLUE}🔗 仓库地址:${NC}"
    echo "   https://github.com/$USER/$REPO_NAME"
    echo ""
    echo -e "${BLUE}📊 项目统计:${NC}"
    echo "   - 版本: v1.0.0"
    FILE_COUNT=$(git ls-files | wc -l)
    echo "   - 文件: $FILE_COUNT 个"
    echo ""
    echo -e "${BLUE}🎯 接下来你可以:${NC}"
    echo "   1. 访问仓库查看代码"
    echo "   2. 编辑仓库描述和主题"
    echo "   3. 创建 GitHub Release"
    echo "   4. 分享项目给其他人"
    echo ""
else
    echo -e "${RED}❌ 推送失败${NC}"
    exit 1
fi
