// app.js
App({
  onLaunch() {
    // 初始化云开发（如果使用云函数）
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id', // 替换为你的云开发环境ID
        traceUser: true,
      })
    }
    
    // 初始化全局数据
    this.globalData = {
      // 选中的参与者列表
      selectedParticipants: [],
      
      // 奖项列表
      prizes: [
        { id: 1, name: '一等奖', count: 1, rank: 'first' },
        { id: 2, name: '二等奖', count: 2, rank: 'second' },
        { id: 3, name: '三等奖', count: 5, rank: 'third' }
      ],
      
      // 中奖名单
      winners: [],
      
      // 用户信息
      userInfo: null,
      
      // 群组信息
      groups: [],
      
      // 好友列表
      friends: []
    }
    
    // 检查登录状态
    this.checkLoginStatus()
  },
  
  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },
  
  // 获取用户信息
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.globalData.userInfo) {
        resolve(this.globalData.userInfo)
      } else {
        wx.getUserProfile({
          desc: '用于完善用户资料',
          success: (res) => {
            this.globalData.userInfo = res.userInfo
            wx.setStorageSync('userInfo', res.userInfo)
            resolve(res.userInfo)
          },
          fail: reject
        })
      }
    })
  },
  
  // 添加参与者
  addParticipant(participant) {
    const exists = this.globalData.selectedParticipants.find(
      p => p.id === participant.id
    )
    if (!exists) {
      this.globalData.selectedParticipants.push(participant)
    }
  },
  
  // 移除参与者
  removeParticipant(participantId) {
    const index = this.globalData.selectedParticipants.findIndex(
      p => p.id === participantId
    )
    if (index > -1) {
      this.globalData.selectedParticipants.splice(index, 1)
    }
  },
  
  // 清空所有参与者
  clearParticipants() {
    this.globalData.selectedParticipants = []
  },
  
  // 设置奖项
  setPrizes(prizes) {
    this.globalData.prizes = prizes
  },
  
  // 添加中奖者
  addWinner(winner) {
    this.globalData.winners.push(winner)
  },
  
  // 清空中奖名单
  clearWinners() {
    this.globalData.winners = []
  }
})
