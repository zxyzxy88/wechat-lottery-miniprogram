// pages/index/index.js
const app = getApp()

Page({
  data: {
    // 已选择的参与者
    selectedParticipants: [],
    
    // 群聊相关
    showGroupModal: false,
    groups: [],
    
    // 成员选择相关
    showMemberModal: false,
    currentGroup: {},
    groupMembers: [],
    filteredMembers: [],
    memberSearchKey: '',
    tempSelectedCount: 0,
    
    // 手动输入相关
    showManualModal: false,
    manualInputText: ''
  },

  onLoad() {
    this.loadSelectedParticipants()
  },

  onShow() {
    this.loadSelectedParticipants()
  },

  // 加载已选择的参与者
  loadSelectedParticipants() {
    this.setData({
      selectedParticipants: app.globalData.selectedParticipants
    })
  },

  // 选择群聊
  chooseGroupChat() {
    // 先获取群聊列表
    this.getGroupList()
  },

  // 获取群聊列表
  getGroupList() {
    wx.showLoading({ title: '加载中...' })
    
    // 模拟群聊数据（实际开发中应调用微信API）
    // 注意：微信小程序无法直接获取群列表，需要通过分享进入群聊才能获取群ID
    setTimeout(() => {
      const mockGroups = [
        { chatId: 'group1', name: '产品运营群', memberCount: 156 },
        { chatId: 'group2', name: '技术开发群', memberCount: 89 },
        { chatId: 'group3', name: '市场营销群', memberCount: 67 },
        { chatId: 'group4', name: '客户服务群', memberCount: 42 }
      ]
      
      this.setData({
        groups: mockGroups,
        showGroupModal: true
      })
      wx.hideLoading()
    }, 500)
    
    // 实际开发中的代码示例：
    // wx.getGroupChatInfo({
    //   groupId: groupId,
    //   success: (res) => {
    //     // 处理群信息
    //   }
    // })
  },

  // 隐藏群聊弹窗
  hideGroupModal() {
    this.setData({ showGroupModal: false })
  },

  // 选择某个群
  selectGroup(e) {
    // 这里不做操作，由子按钮触发
  },

  // 全部选择群成员
  selectAllMembers(e) {
    const group = e.currentTarget.dataset.group
    wx.showLoading({ title: '加载成员...' })
    
    // 模拟获取群成员
    setTimeout(() => {
      const members = this.generateMockMembers(group.memberCount, group.name)
      
      members.forEach(member => {
        app.addParticipant({
          id: member.id,
          name: member.name,
          source: 'group',
          groupName: group.name
        })
      })
      
      this.loadSelectedParticipants()
      wx.hideLoading()
      this.hideGroupModal()
      
      wx.showToast({
        title: `已添加${members.length}人`,
        icon: 'success'
      })
    }, 500)
  },

  // 部分选择群成员
  selectPartialMembers(e) {
    const group = e.currentTarget.dataset.group
    wx.showLoading({ title: '加载成员...' })
    
    // 模拟获取群成员
    setTimeout(() => {
      const members = this.generateMockMembers(group.memberCount, group.name)
      
      this.setData({
        currentGroup: group,
        groupMembers: members,
        filteredMembers: members,
        showMemberModal: true,
        showGroupModal: false,
        tempSelectedCount: 0
      })
      
      wx.hideLoading()
    }, 500)
  },

  // 生成模拟成员数据
  generateMockMembers(count, groupName) {
    const surnames = ['张', '李', '王', '赵', '刘', '陈', '杨', '黄', '周', '吴', '郑', '孙']
    const names = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '勇']
    
    const members = []
    for (let i = 0; i < count; i++) {
      const surname = surnames[Math.floor(Math.random() * surnames.length)]
      const firstName = names[Math.floor(Math.random() * names.length)]
      members.push({
        id: `member_${groupName}_${i}`,
        name: surname + firstName,
        selected: false
      })
    }
    return members
  },

  // 隐藏成员选择弹窗
  hideMemberModal() {
    this.setData({ 
      showMemberModal: false,
      groupMembers: [],
      filteredMembers: [],
      memberSearchKey: ''
    })
  },

  // 搜索成员
  searchMember(e) {
    const key = e.detail.value.toLowerCase()
    const filtered = this.data.groupMembers.filter(m => 
      m.name.toLowerCase().includes(key)
    )
    
    this.setData({
      memberSearchKey: key,
      filteredMembers: filtered
    })
  },

  // 全选成员
  selectAllMembersInModal() {
    const members = this.data.groupMembers.map(m => ({ ...m, selected: true }))
    this.setData({
      groupMembers: members,
      filteredMembers: this.filterMembersByKey(members, this.data.memberSearchKey),
      tempSelectedCount: members.filter(m => m.selected).length
    })
  },

  // 取消全选
  deselectAllMembersInModal() {
    const members = this.data.groupMembers.map(m => ({ ...m, selected: false }))
    this.setData({
      groupMembers: members,
      filteredMembers: this.filterMembersByKey(members, this.data.memberSearchKey),
      tempSelectedCount: 0
    })
  },

  filterMembersByKey(members, key) {
    if (!key) return members
    return members.filter(m => m.name.toLowerCase().includes(key.toLowerCase()))
  },

  // 切换成员选择
  toggleMember(e) {
    const index = e.currentTarget.dataset.index
    const filteredMembers = this.data.filteredMembers
    const member = filteredMembers[index]
    
    // 找到在原数组中的索引
    const originalIndex = this.data.groupMembers.findIndex(m => m.id === member.id)
    const groupMembers = this.data.groupMembers
    
    groupMembers[originalIndex].selected = !groupMembers[originalIndex].selected
    filteredMembers[index].selected = !filteredMembers[index].selected
    
    this.setData({
      groupMembers,
      filteredMembers,
      tempSelectedCount: groupMembers.filter(m => m.selected).length
    })
  },

  // 确认成员选择
  confirmMemberSelection() {
    const selectedMembers = this.data.groupMembers.filter(m => m.selected)
    
    if (selectedMembers.length === 0) {
      wx.showToast({
        title: '请至少选择一人',
        icon: 'none'
      })
      return
    }
    
    selectedMembers.forEach(member => {
      app.addParticipant({
        id: member.id,
        name: member.name,
        source: 'group',
        groupName: this.data.currentGroup.name
      })
    })
    
    this.loadSelectedParticipants()
    this.hideMemberModal()
    
    wx.showToast({
      title: `已添加${selectedMembers.length}人`,
      icon: 'success'
    })
  },

  // 选择好友
  chooseFriends() {
    wx.showModal({
      title: '提示',
      content: '由于微信平台限制，小程序无法直接获取好友列表。建议使用"从群聊选择"或"手动添加"功能。',
      showCancel: false,
      confirmText: '知道了'
    })
    
    // 实际开发中，可以通过以下方式获取：
    // 1. 通过 wx.chooseAddress 获取收货地址信息
    // 2. 让用户手动输入或通过分享功能邀请好友
  },

  // 显示手动输入弹窗
  showManualInput() {
    this.setData({
      showManualModal: true,
      manualInputText: ''
    })
  },

  // 隐藏手动输入弹窗
  hideManualModal() {
    this.setData({ showManualModal: false })
  },

  // 手动输入
  onManualInput(e) {
    this.setData({
      manualInputText: e.detail.value
    })
  },

  // 确认手动输入
  confirmManualInput() {
    const text = this.data.manualInputText
    const names = text.split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)
    
    if (names.length === 0) {
      wx.showToast({
        title: '请输入参与者姓名',
        icon: 'none'
      })
      return
    }
    
    names.forEach((name, index) => {
      app.addParticipant({
        id: `manual_${Date.now()}_${index}`,
        name: name,
        source: 'manual'
      })
    })
    
    this.loadSelectedParticipants()
    this.hideManualModal()
    
    wx.showToast({
      title: `已添加${names.length}人`,
      icon: 'success'
    })
  },

  // 移除参与者
  removeParticipant(e) {
    const id = e.currentTarget.dataset.id
    app.removeParticipant(id)
    this.loadSelectedParticipants()
  },

  // 清空所有参与者
  clearAllParticipants() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有参与者吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearParticipants()
          this.loadSelectedParticipants()
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 前往抽奖页
  goToLottery() {
    if (this.data.selectedParticipants.length === 0) {
      wx.showToast({
        title: '请先选择参与者',
        icon: 'none'
      })
      return
    }
    
    wx.switchTab({
      url: '/pages/lottery/lottery'
    })
  }
})
