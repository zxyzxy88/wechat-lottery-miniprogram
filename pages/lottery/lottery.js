// pages/lottery/lottery.js
const app = getApp()

Page({
  data: {
    // 参与者列表
    selectedParticipants: [],
    
    // 奖项列表
    prizes: [],
    
    // 中奖名单
    winners: [],
    
    // 当前抽奖状态
    isLotteryRunning: false,
    currentPrizeIndex: 0,
    currentPrize: {},
    
    // 动画相关
    showOverlay: false,
    isRolling: false,
    rollingName: '',
    showWinner: false,
    currentWinner: {},
    
    // 定时器
    rollTimer: null
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  // 加载数据
  loadData() {
    const participants = [...app.globalData.selectedParticipants]
    const prizes = app.globalData.prizes.length > 0 
      ? [...app.globalData.prizes]
      : [
          { id: 1, name: '一等奖', count: 1, rank: 'first' },
          { id: 2, name: '二等奖', count: 2, rank: 'second' },
          { id: 3, name: '三等奖', count: 5, rank: 'third' }
        ]
    
    this.setData({
      selectedParticipants: participants,
      prizes: prizes,
      winners: []
    })
  },

  // 添加奖项
  addPrize() {
    const prizes = this.data.prizes
    const newId = prizes.length > 0 ? Math.max(...prizes.map(p => p.id)) + 1 : 1
    const ranks = ['first', 'second', 'third', 'other', 'other', 'other']
    
    prizes.push({
      id: newId,
      name: `${newId}等奖`,
      count: 1,
      rank: ranks[Math.min(newId - 1, ranks.length - 1)]
    })
    
    this.setData({ prizes })
    app.setPrizes(prizes)
  },

  // 移除奖项
  removePrize(e) {
    const index = e.currentTarget.dataset.index
    const prizes = this.data.prizes
    prizes.splice(index, 1)
    this.setData({ prizes })
    app.setPrizes(prizes)
  },

  // 更新奖项名称
  updatePrizeName(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    const prizes = this.data.prizes
    prizes[index].name = value
    this.setData({ prizes })
    app.setPrizes(prizes)
  },

  // 增加奖项数量
  increasePrizeCount(e) {
    const index = e.currentTarget.dataset.index
    const prizes = this.data.prizes
    prizes[index].count++
    this.setData({ prizes })
    app.setPrizes(prizes)
  },

  // 减少奖项数量
  decreasePrizeCount(e) {
    const index = e.currentTarget.dataset.index
    const prizes = this.data.prizes
    if (prizes[index].count > 1) {
      prizes[index].count--
      this.setData({ prizes })
      app.setPrizes(prizes)
    }
  },

  // 开始抽奖
  startLottery() {
    // 验证
    if (this.data.selectedParticipants.length === 0) {
      wx.showToast({
        title: '请先选择参与者',
        icon: 'none'
      })
      return
    }
    
    if (this.data.prizes.length === 0) {
      wx.showToast({
        title: '请先设置奖项',
        icon: 'none'
      })
      return
    }
    
    const totalPrizes = this.data.prizes.reduce((sum, p) => sum + p.count, 0)
    if (totalPrizes > this.data.selectedParticipants.length) {
      wx.showToast({
        title: '奖项总数超过参与者人数',
        icon: 'none'
      })
      return
    }
    
    // 开始抽奖
    this.setData({
      isLotteryRunning: true,
      currentPrizeIndex: 0,
      winners: []
    })
    
    app.clearWinners()
    this.drawNextPrize()
  },

  // 抽取下一个奖项
  drawNextPrize() {
    if (this.data.currentPrizeIndex >= this.data.prizes.length) {
      // 所有奖项抽完
      this.finishLottery()
      return
    }
    
    const currentPrize = this.data.prizes[this.data.currentPrizeIndex]
    this.setData({
      currentPrize: currentPrize
    })
    
    // 逐个抽取该奖项的获奖者
    this.drawPrizeWinners(currentPrize, 0)
  },

  // 抽取奖项获奖者
  drawPrizeWinners(prize, winnerIndex) {
    if (winnerIndex >= prize.count) {
      // 该奖项抽完，进入下一个奖项
      this.setData({
        currentPrizeIndex: this.data.currentPrizeIndex + 1
      })
      setTimeout(() => {
        this.drawNextPrize()
      }, 1000)
      return
    }
    
    // 执行抽奖动画
    this.performLotteryAnimation(prize, () => {
      this.drawPrizeWinners(prize, winnerIndex + 1)
    })
  },

  // 执行抽奖动画
  performLotteryAnimation(prize, callback) {
    // 显示遮罩
    this.setData({
      showOverlay: true,
      isRolling: true,
      showWinner: false
    })
    
    // 滚动动画
    let counter = 0
    const duration = 2000 // 2秒
    const interval = 100
    const iterations = duration / interval
    
    const rollTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.data.selectedParticipants.length)
      const randomName = this.data.selectedParticipants[randomIndex].name
      
      this.setData({
        rollingName: randomName
      })
      
      counter++
      
      if (counter >= iterations) {
        clearInterval(rollTimer)
        
        // 抽取真正的获奖者
        const winnerIndex = Math.floor(Math.random() * this.data.selectedParticipants.length)
        const winner = this.data.selectedParticipants.splice(winnerIndex, 1)[0]
        
        // 添加到获奖名单
        const winnerData = {
          ...winner,
          prize: prize.name,
          prizeRank: prize.rank
        }
        
        const winners = this.data.winners
        winners.push(winnerData)
        
        app.addWinner(winnerData)
        
        // 显示获奖者
        this.setData({
          isRolling: false,
          showWinner: true,
          currentWinner: winnerData,
          winners: winners,
          selectedParticipants: this.data.selectedParticipants
        })
        
        // 1.5秒后关闭遮罩并继续
        setTimeout(() => {
          this.setData({
            showOverlay: false
          })
          callback()
        }, 1500)
      }
    }, interval)
  },

  // 完成抽奖
  finishLottery() {
    this.setData({
      isLotteryRunning: false,
      currentPrize: { name: '抽奖完成' }
    })
    
    wx.showModal({
      title: '🎉 抽奖完成',
      content: `恭喜所有获奖者！共产生 ${this.data.winners.length} 位获奖者。`,
      showCancel: false,
      confirmText: '查看结果'
    })
  },

  // 保存到历史
  saveToHistory() {
    if (this.data.winners.length === 0) {
      wx.showToast({
        title: '没有中奖记录',
        icon: 'none'
      })
      return
    }
    
    const record = {
      id: Date.now(),
      date: this.formatDate(new Date()),
      participantCount: this.data.selectedParticipants.length + this.data.winners.length,
      winners: [...this.data.winners],
      prizes: [...this.data.prizes]
    }
    
    // 保存到本地存储
    let history = wx.getStorageSync('lotteryHistory') || []
    history.unshift(record)
    
    // 最多保存50条记录
    if (history.length > 50) {
      history = history.slice(0, 50)
    }
    
    wx.setStorageSync('lotteryHistory', history)
    
    wx.showToast({
      title: '已保存到历史',
      icon: 'success'
    })
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 重新抽奖
  resetLottery() {
    wx.showModal({
      title: '确认重置',
      content: '重置后将清空当前抽奖结果，确定继续吗？',
      success: (res) => {
        if (res.confirm) {
          this.loadData()
          this.setData({
            isLotteryRunning: false,
            currentPrizeIndex: 0,
            currentPrize: {},
            showOverlay: false,
            isRolling: false,
            showWinner: false
          })
          
          app.clearWinners()
        }
      }
    })
  },

  onUnload() {
    // 清理定时器
    if (this.data.rollTimer) {
      clearInterval(this.data.rollTimer)
    }
  }
})
