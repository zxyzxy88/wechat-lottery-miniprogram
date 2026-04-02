# 微信小程序 - 幸运抽奖 🎰

<div align="center">
  <img src="https://img.shields.io/badge/微信小程序-07C160?style=for-the-badge&logo=wechat&logoColor=white" alt="WeChat Mini Program">
  <img src="https://img.shields.io/badge/版本-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

<div align="center">
  <h3>一个功能完整的微信小程序抽奖应用</h3>
  <p>支持从微信群、好友中选择参与者，进行公平、公正、公开的抽奖活动</p>
</div>

---

## 📱 功能特点

### 🎯 核心功能

| 功能模块 | 描述 |
|---------|------|
| 📱 **参与者选择** | 从微信群聊选择成员（支持全部或部分）<br>手动添加参与者 |
| 🎁 **奖项设置** | 自定义奖项名称和数量<br>可视化奖项等级（金银铜牌） |
| 🎰 **抽奖动画** | 滚动名字动画效果<br>中奖者揭晓动画<br>全屏沉浸式体验 |
| 📊 **历史记录** | 自动保存抽奖记录<br>支持查看详情和删除<br>一键分享抽奖结果 |

### 🎨 界面设计

- ✅ 遵循微信小程序设计规范
- ✅ 绿色主题色调，清新简洁
- ✅ 流畅的交互动画
- ✅ 完美适配各种屏幕

---

## 🚀 快速开始

### 1. 准备工作

- 注册 [微信小程序账号](https://mp.weixin.qq.com)
- 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 2. 导入项目

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram.git

# 或下载 ZIP 压缩包
```

1. 打开微信开发者工具
2. 选择「导入项目」
3. 选择项目目录
4. 填写 AppID（或使用测试号）
5. 点击「导入」

### 3. 开始使用

- 在开发者工具中预览
- 点击「预览」生成二维码，在微信中扫码体验

---

## 📂 项目结构

```
wechat-lottery-miniprogram/
├── pages/                   # 页面文件夹
│   ├── index/              # 选择参与者页面
│   ├── lottery/            # 抽奖页面
│   └── history/            # 历史记录页面
├── utils/                  # 工具函数
├── images/                 # 图片资源
├── app.js                  # 小程序入口
├── app.json                # 全局配置
└── app.wxss                # 全局样式
```

---

## 📖 使用说明

### 选择参与者

1. **从群聊选择**
   - 点击「从群聊选择」
   - 选择目标群聊
   - 可选择「全部选择」或「部分选择」

2. **手动添加**
   - 点击「手动添加」
   - 输入参与者姓名（每行一个）

### 设置奖项

1. 默认包含一等奖、二等奖、三等奖
2. 点击「+ 添加奖项」创建新奖项
3. 修改奖项名称和名额

### 开始抽奖

1. 确认参与者数量和奖项设置
2. 点击「开始抽奖」按钮
3. 观看抽奖动画
4. 查看中奖名单

---

## 🎬 功能演示

### 主界面
- 选择参与者页面：多种方式添加参与者
- 抽奖页面：设置奖项并开始抽奖
- 历史记录：查看过往抽奖记录

### 抽奖动画
- 滚动名字效果
- 中奖揭晓动画
- 全屏沉浸体验

---

## ⚙️ 技术栈

- **前端框架**: 微信小程序原生框架
- **开发语言**: JavaScript, WXML, WXSS
- **数据存储**: 微信本地存储
- **随机算法**: Fisher-Yates 洗牌算法

---

## ⚠️ 重要说明

### 关于微信群数据

由于微信平台限制，小程序无法直接获取群列表。当前版本使用模拟数据演示。

要获取真实群成员数据：
1. 配置分享功能，让用户分享小程序到群里
2. 通过群ID获取成员信息（需特殊权限）

### 关于好友列表

小程序无法获取好友列表，建议使用：
- 手动添加功能
- 群聊选择功能

---

## 📄 版本历史

### v1.0.0 (2024-01-01)
- ✨ 首次发布
- 🎉 支持基本的抽奖功能
- 📱 支持群聊和手动添加参与者
- 🎨 完整的抽奖动画效果
- 💾 历史记录保存功能

---

## 🌟 功能扩展建议

- [ ] 添加抽奖规则设置（权重、排除条件）
- [ ] 支持图片奖项展示
- [ ] 添加抽奖结果导出功能
- [ ] 实现云端数据同步
- [ ] 添加抽奖直播间功能
- [ ] 支持多种抽奖模式（转盘、刮刮乐等）

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📜 开源协议

本项目采用 [MIT License](LICENSE) 开源协议

---

## 💬 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/YOUR_USERNAME/wechat-lottery-miniprogram/issues)
- 查阅 [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

---

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，欢迎 Star 支持！</p>
</div>
