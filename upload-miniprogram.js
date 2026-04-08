// miniprogram-ci 上传脚本
const ci = require('miniprogram-ci')
const path = require('path')

;(async () => {
  try {
    console.log('====================================')
    console.log('📦 使用 miniprogram-ci 上传代码')
    console.log('====================================')
    console.log('')

    // 项目配置
    const projectPath = path.resolve(__dirname, 'wechat-lottery-miniprogram')
    const appId = 'wx78657b06f36b7e51'

    console.log('项目信息：')
    console.log(`  AppID: ${appId}`)
    console.log(`  路径: ${projectPath}`)
    console.log('')

    // 注意：需要上传密钥（privateKey）
    // 上传密钥需要在微信公众平台获取：
    // 开发 -> 开发管理 -> 开发设置 -> 小程序代码上传密钥

    console.log('⚠️  需要上传密钥（privateKey）')
    console.log('')
    console.log('获取上传密钥的步骤：')
    console.log('1. 登录微信公众平台：https://mp.weixin.qq.com/')
    console.log('2. 进入「开发」->「开发管理」->「开发设置」')
    console.log('3. 找到「小程序代码上传密钥」')
    console.log('4. 点击「生成」并下载密钥文件（private.wx78657b06f36b7e51.key）')
    console.log('5. 将密钥文件放到项目根目录')
    console.log('')

    console.log('====================================')
    console.log('📋 上传命令示例')
    console.log('====================================')
    console.log('')
    console.log('使用命令行：')
    console.log('')
    console.log('miniprogram-ci upload \\')
    console.log('  --pp ./wechat-lottery-miniprogram \\')
    console.log('  --pkp ./private.wx78657b06f36b7e51.key \\')
    console.log('  --appid wx78657b06f36b7e51 \\')
    console.log('  -r 1 \\')
    console.log('  --uv 1.0.0 \\')
    console.log('  --desc "首次上传：微信小程序抽奖应用"')
    console.log('')

    console.log('====================================')
    console.log('🔑 或者使用预览命令')
    console.log('====================================')
    console.log('')
    console.log('miniprogram-ci preview \\')
    console.log('  --pp ./wechat-lottery-miniprogram \\')
    console.log('  --pkp ./private.wx78657b06f36b7e51.key \\')
    console.log('  --appid wx78657b06f36b7e51 \\')
    console.log('  --desc "预览版本"')
    console.log('')

  } catch (error) {
    console.error('错误：', error.message)
  }
})()
