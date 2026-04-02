# 图标资源说明

## TabBar 图标

由于微信小程序需要 PNG 格式的图标，请按以下步骤添加：

### 需要的图标文件：

1. **participants.png** (未选中) / **participants-active.png** (选中)
   - 尺寸: 81x81 像素
   - 内容: 人群图标

2. **lottery.png** (未选中) / **lottery-active.png** (选中)
   - 尺寸: 81x81 像素
   - 内容: 星星/奖杯图标

3. **history.png** (未选中) / **history-active.png** (选中)
   - 尺寸: 81x81 像素
   - 内容: 时钟/日历图标

### 图标设计规范：

- 未选中状态颜色: #999999
- 选中状态颜色: #07C160
- 图片格式: PNG
- 背景: 透明

### 快速获取图标：

1. 访问阿里巴巴矢量图标库: https://www.iconfont.cn/
2. 搜索 "人群"、"抽奖"、"历史"
3. 下载 PNG 格式（选择81x81尺寸）
4. 重命名并放入 images 文件夹

### 临时解决方案：

也可以在 `app.json` 中临时移除 TabBar 图标配置：

```json
"tabBar": {
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "选择参与者"
    },
    {
      "pagePath": "pages/lottery/lottery", 
      "text": "开始抽奖"
    },
    {
      "pagePath": "pages/history/history",
      "text": "历史记录"
    }
  ]
}
```

## 其他图标

- **empty.png**: 空状态图标（建议尺寸: 160x160像素）
