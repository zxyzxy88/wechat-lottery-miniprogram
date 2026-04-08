# 📱 微信开发者工具下载与项目导入完整指南

## 第一步：下载微信开发者工具

### Windows 系统

1. **访问下载页面**
   - 打开浏览器，访问：
   ```
   https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
   ```

2. **选择版本**
   - 点击「Windows 64位」下载
   - 文件名类似：`wechat_devtools_1.06.2307260_x64.exe`

3. **安装步骤**
   - 双击下载的 `.exe` 文件
   - 选择安装路径（建议默认）
   - 勾选「同意用户协议」
   - 点击「安装」
   - 等待安装完成

### macOS 系统

1. **访问下载页面**
   ```
   https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
   ```

2. **选择版本**
   - 点击「macOS」下载
   - 文件名类似：`wechat_devtools_1.06.2307260.dmg`

3. **安装步骤**
   - 双击 `.dmg` 文件
   - 将微信开发者工具拖到「应用程序」文件夹
   - 打开「应用程序」找到微信开发者工具
   - 右键点击 → 打开（首次需要确认）

---

## 第二步：注册微信小程序账号

### 1. 访问微信公众平台
```
https://mp.weixin.qq.com/
```

### 2. 注册流程
1. 点击「立即注册」
2. 选择「小程序」
3. 填写邮箱和密码
4. 邮箱激活
5. 选择主体类型：
   - **个人**：免费，适合学习测试
   - **企业**：需要认证（300元/年），功能完整
6. 填写主体信息
7. 管理员微信扫码验证

### 3. 获取 AppID
注册成功后：
1. 登录微信公众平台
2. 进入「开发」→「开发管理」
3. 找到「开发者ID」
4. 复制 **AppID**（类似：`wx1234567890abcdef`）

---

## 第三步：导入项目

### 方法一：从 GitHub 克隆（推荐）

#### 1. 安装 Git（如未安装）

**Windows**:
```
https://git-scm.com/download/win
```

**macOS**:
```bash
# 安装 Homebrew（如未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Git
brew install git
```

#### 2. 克隆项目

打开终端（Terminal 或 CMD），执行：

```bash
# 进入你想存放项目的目录
cd Desktop

# 克隆项目
git clone https://github.com/zxyzxy88/wechat-lottery-miniprogram.git
```

### 方法二：下载 ZIP 压缩包

1. 访问项目地址：
   ```
   https://github.com/zxyzxy88/wechat-lottery-miniprogram
   ```

2. 点击绿色按钮「Code」→「Download ZIP」

3. 解压到指定目录

---

## 第四步：在微信开发者工具中导入项目

### 1. 打开微信开发者工具

- Windows: 双击桌面图标
- macOS: 在「应用程序」中打开

### 2. 扫码登录

使用微信扫描二维码登录

### 3. 导入项目

#### 首次导入：

1. 点击左侧「小程序」
2. 点击「导入项目」或「+」号
3. 填写信息：

| 字段 | 填写内容 |
|------|---------|
| **项目名称** | 幸运抽奖 |
| **目录** | 选择刚才克隆/解压的项目文件夹 |
| **AppID** | 填写你的 AppID（或选择「测试号」） |
| **开发模式** | 小程序 |
| **后端服务** | 不使用云服务（或选择「微信云开发」） |

4. 点击「新建」

#### 如果没有 AppID：

选择「测试号」，微信会自动分配一个测试 AppID：
- 测试号功能完整
- 无需审核
- 适合开发调试
- 但无法发布上线

---

## 第五步：项目配置（重要）

### 1. 检查项目结构

导入后，项目目录应该包含：

```
wechat-lottery-miniprogram/
├── pages/
│   ├── index/         # 选择参与者页面
│   ├── lottery/       # 抽奖页面
│   └── history/       # 历史记录页面
├── utils/
│   └── util.js        # 工具函数
├── images/            # 图片资源
├── app.js             # 小程序入口
├── app.json           # 全局配置
├── app.wxss           # 全局样式
└── sitemap.json       # 站点地图
```

### 2. 配置 AppID（如果使用正式号）

打开 `project.config.json`，添加：

```json
{
  "appid": "你的AppID",
  "projectname": "wechat-lottery-miniprogram"
}
```

### 3. 添加 TabBar 图标（可选）

项目已预留图标位置，你可以添加自己的图标：

1. 准备图标（81x81 像素，PNG 格式）
2. 放入 `images/` 目录
3. 在 `app.json` 中配置：

```json
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "选择参与者",
        "iconPath": "images/participants.png",
        "selectedIconPath": "images/participants-active.png"
      },
      {
        "pagePath": "pages/lottery/lottery",
        "text": "开始抽奖",
        "iconPath": "images/lottery.png",
        "selectedIconPath": "images/lottery-active.png"
      },
      {
        "pagePath": "pages/history/history",
        "text": "历史记录",
        "iconPath": "images/history.png",
        "selectedIconPath": "images/history-active.png"
      }
    ]
  }
}
```

---

## 第六步：运行和测试

### 1. 编译项目

- 点击工具栏「编译」按钮
- 或按快捷键 `Ctrl + B` (Windows) / `Cmd + B` (macOS)
- 查看模拟器中的效果

### 2. 真机预览

1. 点击工具栏「预览」按钮
2. 用微信扫描生成的二维码
3. 在手机上查看真实效果

### 3. 调试

- 打开「调试器」面板
- 查看 Console 输出
- 检查 Network 请求
- 使用 Sources 断点调试

---

## 第七步：常见问题解决

### 问题 1：导入失败，提示「项目配置错误」

**解决方案**：
```bash
# 检查 app.json 格式是否正确
# 确保没有语法错误
```

### 问题 2：AppID 无效

**解决方案**：
1. 检查 AppID 是否正确复制
2. 确认该 AppID 已注册小程序
3. 或选择「测试号」继续开发

### 问题 3：预览二维码无法加载

**解决方案**：
1. 检查网络连接
2. 确认已扫码登录
3. 重启开发者工具

### 问题 4：找不到 pages 目录

**解决方案**：
确保选择的是正确的项目根目录（包含 app.js 的目录）

---

## 第八步：快速开始流程图

```
下载开发者工具
      ↓
安装开发者工具
      ↓
注册小程序账号
      ↓
获取 AppID
      ↓
克隆/下载项目代码
      ↓
打开开发者工具
      ↓
扫码登录
      ↓
导入项目
      ↓
填写 AppID
      ↓
编译运行
      ↓
真机预览
      ↓
开始开发
```

---

## 📚 参考资源

### 官方文档
- [小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)

### 项目地址
```
https://github.com/zxyzxy88/wechat-lottery-miniprogram
```

---

## ✅ 完成检查清单

导入成功后，确认以下内容：

- [ ] 项目在模拟器中正常显示
- [ ] 三个标签页可以切换
- [ ] 点击「从群聊选择」能弹出模拟数据
- [ ] 手动添加功能正常
- [ ] 抽奖动画正常播放
- [ ] 历史记录可以保存
- [ ] 真机预览正常

---

## 💡 下一步建议

1. **先熟悉代码**：阅读项目中的注释和文档
2. **修改界面**：调整颜色、文字、样式
3. **添加功能**：增加新的抽奖模式
4. **真机测试**：在不同设备上测试
5. **准备发布**：完善功能后提交审核

---

## 🆘 需要帮助？

如果遇到问题，可以：

1. 查看控制台错误信息
2. 检查网络请求
3. 阅读官方文档
4. 在项目中提 Issue

---

**祝你开发顺利！** 🎉
