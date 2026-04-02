// pages/history/history.js
Page({
  data: {
    history: [],
    showDetailModal: false,
    currentRecord: null
  },

  onLoad() {
    this.loadHistory()
  },

  onShow() {
    this.loadHistory()
  },

  // 加载历史记录
  loadHistory() {
    const history = wx.getStorageSync('lotteryHistory') || []
    this.setData({ history })
  },

  // 查看详情
  viewDetail(e) {
    const record = e.currentTarget.dataset.record
    this.setData({
      currentRecord: record,
      showDetailModal: true
    })
  },

  // 隐藏详情弹窗
  hideDetailModal() {
    this.setData({
      showDetailModal: false,
      currentRecord: null
    })
  },

  // 删除记录
  deleteRecord(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？删除后无法恢复。',
      success: (res) => {
        if (res.confirm) {
          let history = this.data.history.filter(item => item.id !== id)
          wx.setStorageSync('lotteryHistory', history)
          this.setData({ history })
          
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    if (this.data.currentRecord) {
      const winnerNames = this.data.currentRecord.winners
        .slice(0, 3)
        .map(w => w.name)
        .join('、')
      
      return {
        title: `恭喜 ${winnerNames} 等人在抽奖活动中获奖！`,
        path: '/pages/index/index'
      }
    }
    
    return {
      title: '幸运抽奖 - 公平公正的抽奖工具',
      path: '/pages/index/index'
    }
  }
})
