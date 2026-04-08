# 🔑 使用 miniprogram-ci 上传微信小程序代码

## 📋 前提条件

要使用 miniprogram-ci 上传代码，你需要：

1. ✅ **小程序 AppID**（已有）：`wx78657b06f36b7e51`
2. ⚠️ **上传密钥**（需要获取）
3. ✅ **项目代码**（已完成）
4. ✅ **miniprogram-ci 工具**（已安装）

---

## 🔑 第一步：获取上传密钥

### 1. 登录微信公众平台

```
https://mp.weixin.qq.com/
```

使用小程序管理员微信扫码登录

### 2. 进入开发设置

路径：「开发」→「开发管理」→「开发设置」

### 3. 生成上传密钥

找到「小程序代码上传密钥」区域：
1. 点击「生成」按钮
2. 需要管理员扫码验证
3. 验证通过后下载密钥文件
4. 文件名格式：`private.wx78657b06f36b7e51.key`

### 4. 配置 IP 白名单（可选）

如果要限制上传的 IP 地址：
- 在「小程序代码上传密钥」下方
- 配置「IP 白名单」
- 添加你的服务器 IP

### 5. 保存密钥文件

将下载的密钥文件保存到项目目录：
```
/workspace/private.wx78657b06f36b7e51.key
```

---

## 📦 第二步：上传代码

### 方法 1: 使用 Node.js 脚本

创建上传脚本（已创建）：
```javascript
const ci = require('miniprogram-ci')

;(async () => {
  const project = new ci.Project({
    appid: 'wx78657b06f36b7e51',
    type: 'miniProgram',
    projectPath: './wechat-lottery-miniprogram',
    privateKeyPath: './private.wx78657b06f36b7e51.key',
    ignores: ['node_modules/**/*'],
  })

  const uploadResult = await ci.upload({
    project,
    version: '1.0.0',
    desc: '首次上传：微信小程序抽奖应用',
    setting: {
      es6: true,
      minify: true,
    },
    onProgressUpdate: console.log,
  })
  
  console.log('上传成功！', uploadResult)
})()
```

### 方法 2: 使用命令行

```bash
# 上传代码
npx miniprogram-ci upload \
  --pp ./wechat-lottery-miniprogram \
  --pkp ./private.wx78657b06f36b7e51.key \
  --appid wx78657b06f36b7e51 \
  -r 1 \
  --uv 1.0.0 \
  --desc "首次上传：微信小程序抽奖应用"
```

---

## 🔍 第三步：预览代码

### 生成预览二维码

```bash
npx miniprogram-ci preview \
  --pp ./wechat-lottery-miniprogram \
  --pkp ./private.wx78657b06f36b7e51.key \
  --appid wx78657b06f36b7e51 \
  --desc "预览版本" \
  -r 1 \
  --qr-format terminal \
  --qr-output ./preview.png
```

生成的二维码可以用微信扫描预览。

---

## 📋 命令参数说明

| 参数 | 说明 |
|------|------|
| `--pp` | 项目路径 |
| `--pkp` | 私钥文件路径 |
| `--appid` | 小程序 AppID |
| `-r` |机器人编号（1表示 ci 机器人） |
| `--uv` | 版本号 |
| `--desc` | 版本描述 |
| `--qr-format` | 二维码格式（terminal/image） |
| `--qr-output` | 二维码输出路径 |

---

## 🎯 完整流程

```
获取上传密钥
     ↓
下载密钥文件
     ↓
放置到项目目录
     ↓
运行上传命令
     ↓
上传成功
     ↓
微信公众平台查看版本
     ↓
提交审核 / 设置体验版
```

---

## ✅ 成功后

上传成功后，可以在微信公众平台：

1. **查看版本**
   - 「管理」→「版本管理」
   - 查看开发版本列表

2. **设置为体验版**
   - 选择开发版本
   - 点击「选为体验版本」
   - 添加体验者微信号
   - 扫码体验

3. **提交审核**
   - 选择开发版本
   - 点击「提交审核」
   - 填写审核信息

---

## ⚠️ 注意事项

1. **密钥安全**
   - 密钥文件不要上传到 Git
   - 添加到 `.gitignore`
   - 定期更换密钥

2. **IP 白名单**
   - 如果设置了 IP 白名单
   - 需要确保服务器 IP 在白名单中

3. **权限要求**
   - 需要小程序管理员权限
   - 生成密钥需要管理员扫码

4. **版本管理**
   - 版本号不能重复
   - 建议使用语义化版本

---

## 🆘 常见问题

### Q: 提示"privateKeyPath not found"
A: 确保密钥文件路径正确，文件存在

### Q: 提示"ip not in whitelist"
A: 需要将当前服务器 IP 添加到白名单，或关闭 IP 白名单

### Q: 提示"no permission"
A: 需要管理员权限生成密钥

---

## 📦 项目文件

- ✅ 项目代码：`/workspace/wechat-lottery-miniprogram`
- ✅ 上传脚本：`/workspace/upload-miniprogram.js`
- ⚠️ 需要密钥：`/workspace/private.wx78657b06f36b7e51.key`

---

**获取密钥后，告诉我密钥文件内容或路径，我可以帮你上传代码！** 🚀
