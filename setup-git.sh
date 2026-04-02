#!/bin/bash

# 进入项目目录
cd /workspace/wechat-lottery-miniprogram

# 初始化 Git
git init

# 配置用户信息
git config user.name "WeChat Lottery"
git config user.email "lottery@example.com"

# 重命名分支为 main
git branch -m main

# 添加所有文件
git add .

# 创建提交
git commit -m "🎉 初始提交：微信小程序抽奖应用

功能包括：
- 参与者选择（群聊/手动添加）
- 奖项设置与管理
- 抽奖动画效果
- 历史记录保存
- 完整的用户界面"

# 查看提交状态
echo "✅ Git 提交完成！"
git log --oneline
