/* ============================================
   微信抽奖小程序 - JavaScript
   ============================================ */

// ============================================
// 应用状态管理
// ============================================
const AppState = {
    // 当前激活的标签页
    currentTab: 'select',
    
    // 模拟数据：微信好友
    friends: [],
    
    // 模拟数据：微信群
    groups: [],
    
    // 已选择的参与者
    selectedParticipants: [],
    
    // 临时选择（好友/成员选择面板）
    tempSelectedFriends: new Set(),
    tempSelectedMembers: new Set(),
    
    // 当前选择的群
    currentGroup: null,
    
    // 奖项列表
    prizes: [],
    
    // 中奖名单
    winners: [],
    
    // 历史记录
    history: [],
    
    // 当前抽奖状态
    isLotteryRunning: false,
    currentPrizeIndex: 0,
};

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    initEventListeners();
    initPrizes();
    renderHistory();
});

// 初始化模拟数据
function initMockData() {
    // 模拟好友数据
    const friendNames = [
        '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
        '郑十一', '王十二', '刘十三', '陈十四', '杨十五', '黄十六', '赵十七',
        '孙十八', '周十九', '吴二十', '郑二一', '王二二', '刘二三', '陈二四',
        '杨二五', '黄二六', '赵二七', '孙二八', '周二九', '吴三十', '郑三一',
        '王三二', '刘三三', '陈三四', '杨三五', '黄三六', '赵三七', '孙三八'
    ];
    
    AppState.friends = friendNames.map((name, index) => ({
        id: `friend_${index}`,
        name: name,
        avatar: name.charAt(0),
        initial: name.charAt(0)
    }));
    
    // 模拟群组数据
    AppState.groups = [
        {
            id: 'group_1',
            name: '产品运营群',
            memberCount: 156,
            members: generateGroupMembers(156, '产品')
        },
        {
            id: 'group_2',
            name: '技术开发群',
            memberCount: 89,
            members: generateGroupMembers(89, '技术')
        },
        {
            id: 'group_3',
            name: '市场营销群',
            memberCount: 67,
            members: generateGroupMembers(67, '营销')
        },
        {
            id: 'group_4',
            name: '客户服务群',
            memberCount: 42,
            members: generateGroupMembers(42, '客服')
        },
        {
            id: 'group_5',
            name: '公司全员群',
            memberCount: 320,
            members: generateGroupMembers(320, '全员')
        }
    ];
}

// 生成群成员
function generateGroupMembers(count, prefix) {
    const members = [];
    const surnames = ['张', '李', '王', '赵', '刘', '陈', '杨', '黄', '周', '吴', '郑', '孙'];
    const names = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞'];
    
    for (let i = 0; i < count; i++) {
        const surname = surnames[Math.floor(Math.random() * surnames.length)];
        const firstName = names[Math.floor(Math.random() * names.length)];
        const name = surname + firstName;
        members.push({
            id: `member_${prefix}_${i}`,
            name: name,
            avatar: name.charAt(0),
            initial: name.charAt(0),
            group: prefix
        });
    }
    return members;
}

// 初始化事件监听
function initEventListeners() {
    // 标签页切换
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // 数据来源选择
    document.querySelectorAll('.source-option').forEach(option => {
        option.addEventListener('click', () => selectSource(option.dataset.source));
    });
}

// 初始化奖项
function initPrizes() {
    AppState.prizes = [
        { id: 1, name: '一等奖', count: 1, rank: 'first' },
        { id: 2, name: '二等奖', count: 2, rank: 'second' },
        { id: 3, name: '三等奖', count: 5, rank: 'third' }
    ];
    renderPrizes();
}

// ============================================
// 标签页切换
// ============================================
function switchTab(tabName) {
    AppState.currentTab = tabName;
    
    // 更新标签页按钮状态
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // 更新页面显示
    document.querySelectorAll('.page').forEach(page => {
        page.classList.toggle('active', page.id === `${tabName}-page`);
    });
}

// ============================================
// 数据来源选择
// ============================================
function selectSource(source) {
    // 更新选中状态
    document.querySelectorAll('.source-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.source === source);
    });
    
    // 根据来源打开对应面板
    switch (source) {
        case 'friends':
            openFriendsPanel();
            break;
        case 'group-all':
            openGroupSelector('all');
            break;
        case 'group-partial':
            openGroupSelector('partial');
            break;
        case 'manual':
            openManualPanel();
            break;
    }
}

// ============================================
// 好友选择
// ============================================
function openFriendsPanel() {
    const panel = document.getElementById('friends-list-panel');
    panel.classList.remove('hidden');
    renderFriendsList();
}

function closeFriendsPanel() {
    document.getElementById('friends-list-panel').classList.add('hidden');
    AppState.tempSelectedFriends.clear();
}

function renderFriendsList(filter = '') {
    const list = document.getElementById('friends-list');
    const filteredFriends = AppState.friends.filter(f => 
        f.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    list.innerHTML = filteredFriends.map(friend => `
        <div class="list-item ${AppState.tempSelectedFriends.has(friend.id) ? 'selected' : ''}" 
             onclick="toggleFriend('${friend.id}')">
            <div class="item-avatar">${friend.avatar}</div>
            <div class="item-info">
                <div class="item-name">${friend.name}</div>
                <div class="item-meta">微信好友</div>
            </div>
            <div class="item-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
        </div>
    `).join('');
    
    updateSelectedFriendsCount();
}

function toggleFriend(friendId) {
    if (AppState.tempSelectedFriends.has(friendId)) {
        AppState.tempSelectedFriends.delete(friendId);
    } else {
        AppState.tempSelectedFriends.add(friendId);
    }
    renderFriendsList(document.getElementById('search-friends').value);
}

function selectAllFriends() {
    AppState.friends.forEach(f => AppState.tempSelectedFriends.add(f.id));
    renderFriendsList(document.getElementById('search-friends').value);
}

function deselectAllFriends() {
    AppState.tempSelectedFriends.clear();
    renderFriendsList(document.getElementById('search-friends').value);
}

function filterFriends(value) {
    renderFriendsList(value);
}

function updateSelectedFriendsCount() {
    document.getElementById('selected-friends-count').textContent = AppState.tempSelectedFriends.size;
}

function confirmFriendsSelection() {
    // 将临时选择添加到参与者列表
    AppState.tempSelectedFriends.forEach(friendId => {
        const friend = AppState.friends.find(f => f.id === friendId);
        if (friend && !AppState.selectedParticipants.find(p => p.id === friend.id)) {
            AppState.selectedParticipants.push({
                ...friend,
                source: 'friends'
            });
        }
    });
    
    closeFriendsPanel();
    updateParticipantsDisplay();
}

// ============================================
// 群组选择
// ============================================
function openGroupSelector(mode) {
    const selector = document.getElementById('group-selector');
    selector.classList.remove('hidden');
    selector.dataset.mode = mode;
    renderGroupList();
}

function closeGroupSelector() {
    document.getElementById('group-selector').classList.add('hidden');
}

function renderGroupList() {
    const list = document.getElementById('group-list');
    list.innerHTML = AppState.groups.map(group => `
        <div class="list-item" onclick="selectGroup('${group.id}')">
            <div class="item-avatar">${group.name.charAt(0)}</div>
            <div class="item-info">
                <div class="item-name">${group.name}</div>
                <div class="item-meta">${group.memberCount} 人</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </div>
    `).join('');
}

function selectGroup(groupId) {
    const group = AppState.groups.find(g => g.id === groupId);
    const mode = document.getElementById('group-selector').dataset.mode;
    
    closeGroupSelector();
    AppState.currentGroup = group;
    
    if (mode === 'all') {
        // 添加所有群成员
        group.members.forEach(member => {
            if (!AppState.selectedParticipants.find(p => p.id === member.id)) {
                AppState.selectedParticipants.push({
                    ...member,
                    source: 'group-all',
                    groupName: group.name
                });
            }
        });
        updateParticipantsDisplay();
    } else {
        // 打开成员筛选面板
        openMembersPanel();
    }
}

// ============================================
// 群成员筛选
// ============================================
function openMembersPanel() {
    const panel = document.getElementById('members-filter-panel');
    panel.classList.remove('hidden');
    AppState.tempSelectedMembers.clear();
    renderMembersList();
}

function closeMembersPanel() {
    document.getElementById('members-filter-panel').classList.add('hidden');
    AppState.tempSelectedMembers.clear();
    AppState.currentGroup = null;
}

function renderMembersList(filter = '') {
    const list = document.getElementById('members-list');
    if (!AppState.currentGroup) return;
    
    const filteredMembers = AppState.currentGroup.members.filter(m =>
        m.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    list.innerHTML = filteredMembers.map(member => `
        <div class="list-item ${AppState.tempSelectedMembers.has(member.id) ? 'selected' : ''}"
             onclick="toggleMember('${member.id}')">
            <div class="item-avatar">${member.avatar}</div>
            <div class="item-info">
                <div class="item-name">${member.name}</div>
                <div class="item-meta">${AppState.currentGroup.name}</div>
            </div>
            <div class="item-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
        </div>
    `).join('');
    
    updateSelectedMembersCount();
}

function toggleMember(memberId) {
    if (AppState.tempSelectedMembers.has(memberId)) {
        AppState.tempSelectedMembers.delete(memberId);
    } else {
        AppState.tempSelectedMembers.add(memberId);
    }
    renderMembersList(document.getElementById('search-members').value);
}

function selectAllMembers() {
    if (AppState.currentGroup) {
        AppState.currentGroup.members.forEach(m => AppState.tempSelectedMembers.add(m.id));
        renderMembersList(document.getElementById('search-members').value);
    }
}

function deselectAllMembers() {
    AppState.tempSelectedMembers.clear();
    renderMembersList(document.getElementById('search-members').value);
}

function filterMembers(value) {
    renderMembersList(value);
}

function updateSelectedMembersCount() {
    document.getElementById('selected-members-count').textContent = AppState.tempSelectedMembers.size;
}

function confirmMembersSelection() {
    // 将临时选择添加到参与者列表
    AppState.tempSelectedMembers.forEach(memberId => {
        const member = AppState.currentGroup.members.find(m => m.id === memberId);
        if (member && !AppState.selectedParticipants.find(p => p.id === member.id)) {
            AppState.selectedParticipants.push({
                ...member,
                source: 'group-partial',
                groupName: AppState.currentGroup.name
            });
        }
    });
    
    closeMembersPanel();
    updateParticipantsDisplay();
}

// ============================================
// 手动添加
// ============================================
function openManualPanel() {
    document.getElementById('manual-panel').classList.remove('hidden');
    document.getElementById('manual-input').value = '';
}

function closeManualPanel() {
    document.getElementById('manual-panel').classList.add('hidden');
}

function confirmManualInput() {
    const input = document.getElementById('manual-input').value;
    const names = input.split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
    
    names.forEach((name, index) => {
        if (!AppState.selectedParticipants.find(p => p.name === name && p.source === 'manual')) {
            AppState.selectedParticipants.push({
                id: `manual_${Date.now()}_${index}`,
                name: name,
                avatar: name.charAt(0),
                initial: name.charAt(0),
                source: 'manual'
            });
        }
    });
    
    closeManualPanel();
    updateParticipantsDisplay();
}

// ============================================
// 参与者管理
// ============================================
function updateParticipantsDisplay() {
    const section = document.getElementById('selected-participants-section');
    const tags = document.getElementById('participants-tags');
    const totalEl = document.getElementById('total-participants');
    const btnNext = document.getElementById('btn-next');
    
    if (AppState.selectedParticipants.length === 0) {
        section.classList.add('hidden');
        btnNext.disabled = true;
        return;
    }
    
    section.classList.remove('hidden');
    totalEl.textContent = AppState.selectedParticipants.length;
    btnNext.disabled = false;
    
    tags.innerHTML = AppState.selectedParticipants.map((participant, index) => `
        <span class="participant-tag">
            ${participant.name}
            <button class="tag-remove" onclick="removeParticipant(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </span>
    `).join('');
    
    // 更新来源计数
    updateSourceCounts();
}

function removeParticipant(index) {
    AppState.selectedParticipants.splice(index, 1);
    updateParticipantsDisplay();
}

function clearAllParticipants() {
    if (confirm('确定要清空所有参与者吗？')) {
        AppState.selectedParticipants = [];
        updateParticipantsDisplay();
    }
}

function updateSourceCounts() {
    const counts = {
        friends: 0,
        'group-all': 0,
        'group-partial': 0,
        manual: 0
    };
    
    AppState.selectedParticipants.forEach(p => {
        if (counts[p.source] !== undefined) {
            counts[p.source]++;
        }
    });
    
    document.getElementById('friends-count').textContent = `${counts.friends}人`;
    document.getElementById('group-all-count').textContent = `${counts['group-all']}人`;
    document.getElementById('group-partial-count').textContent = `${counts['group-partial']}人`;
    document.getElementById('manual-count').textContent = `${counts.manual}人`;
}

// ============================================
// 页面导航
// ============================================
function goToLottery() {
    if (AppState.selectedParticipants.length === 0) {
        alert('请先选择参与者！');
        return;
    }
    
    switchTab('lottery');
    updateLotteryPage();
}

function goToSelect() {
    switchTab('select');
}

function updateLotteryPage() {
    document.getElementById('lottery-participants-count').textContent = 
        AppState.selectedParticipants.length;
}

// ============================================
// 奖项管理
// ============================================
function renderPrizes() {
    const list = document.getElementById('prizes-list');
    
    if (AppState.prizes.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 32px; color: var(--text-secondary);">
                <p>暂无奖项，请点击上方按钮添加</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = AppState.prizes.map((prize, index) => `
        <div class="prize-item">
            <div class="prize-rank ${prize.rank}">${index + 1}</div>
            <div class="prize-inputs">
                <input type="text" value="${prize.name}" 
                       placeholder="奖项名称" 
                       onchange="updatePrize(${index}, 'name', this.value)">
                <input type="number" value="${prize.count}" 
                       min="1" placeholder="名额"
                       onchange="updatePrize(${index}, 'count', parseInt(this.value))">
            </div>
            <button class="btn-remove-prize" onclick="removePrize(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `).join('');
}

function addPrize() {
    const ranks = ['first', 'second', 'third', 'other', 'other', 'other'];
    const newId = AppState.prizes.length > 0 
        ? Math.max(...AppState.prizes.map(p => p.id)) + 1 
        : 1;
    
    AppState.prizes.push({
        id: newId,
        name: `${newId}等奖`,
        count: 1,
        rank: ranks[Math.min(newId - 1, ranks.length - 1)]
    });
    
    renderPrizes();
}

function removePrize(index) {
    AppState.prizes.splice(index, 1);
    renderPrizes();
}

function updatePrize(index, field, value) {
    AppState.prizes[index][field] = value;
}

// ============================================
// 抽奖逻辑
// ============================================
function startLottery() {
    // 验证
    if (AppState.selectedParticipants.length === 0) {
        alert('请先选择参与者！');
        return;
    }
    
    if (AppState.prizes.length === 0) {
        alert('请先设置奖项！');
        return;
    }
    
    // 检查是否有足够的参与者
    const totalPrizes = AppState.prizes.reduce((sum, p) => sum + p.count, 0);
    if (totalPrizes > AppState.selectedParticipants.length) {
        alert(`奖项总数(${totalPrizes}个)超过了参与者人数(${AppState.selectedParticipants.length}人)！`);
        return;
    }
    
    // 开始抽奖
    AppState.isLotteryRunning = true;
    AppState.winners = [];
    AppState.currentPrizeIndex = 0;
    
    document.getElementById('btn-lottery').disabled = true;
    document.getElementById('btn-save').disabled = true;
    
    // 开始第一个奖项的抽奖
    drawNextPrize();
}

function drawNextPrize() {
    if (AppState.currentPrizeIndex >= AppState.prizes.length) {
        // 所有奖项抽完
        finishLottery();
        return;
    }
    
    const currentPrize = AppState.prizes[AppState.currentPrizeIndex];
    document.getElementById('current-prize-name').textContent = currentPrize.name;
    
    // 逐个抽取该奖项的获奖者
    drawPrizeWinners(currentPrize, 0);
}

function drawPrizeWinners(prize, winnerIndex) {
    if (winnerIndex >= prize.count) {
        // 该奖项抽完，进入下一个奖项
        AppState.currentPrizeIndex++;
        setTimeout(drawNextPrize, 1000);
        return;
    }
    
    // 执行抽奖动画
    performLotteryAnimation(prize, () => {
        drawPrizeWinners(prize, winnerIndex + 1);
    });
}

function performLotteryAnimation(prize, callback) {
    const overlay = document.getElementById('lottery-overlay');
    const spinningNames = document.getElementById('spinning-names');
    const winnerReveal = document.getElementById('winner-reveal');
    
    overlay.classList.remove('hidden');
    winnerReveal.classList.add('hidden');
    spinningNames.classList.remove('hidden');
    
    // 滚动动画
    let counter = 0;
    const duration = 2000; // 2秒
    const interval = 100;
    const iterations = duration / interval;
    
    const rollInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * AppState.selectedParticipants.length);
        spinningNames.textContent = AppState.selectedParticipants[randomIndex].name;
        counter++;
        
        if (counter >= iterations) {
            clearInterval(rollInterval);
            
            // 抽取真正的获奖者
            const winnerIndex = Math.floor(Math.random() * AppState.selectedParticipants.length);
            const winner = AppState.selectedParticipants.splice(winnerIndex, 1)[0];
            
            // 添加到获奖名单
            AppState.winners.push({
                ...winner,
                prize: prize.name,
                prizeRank: prize.rank
            });
            
            // 显示获奖者
            spinningNames.classList.add('hidden');
            winnerReveal.classList.remove('hidden');
            document.getElementById('winner-name').textContent = winner.name;
            document.getElementById('winner-prize').textContent = `获得 ${prize.name}`;
            
            // 更新显示
            updateLotteryDisplay();
            
            // 1.5秒后关闭遮罩并继续
            setTimeout(() => {
                overlay.classList.add('hidden');
                callback();
            }, 1500);
        }
    }, interval);
}

function updateLotteryDisplay() {
    document.getElementById('lottery-participants-count').textContent = 
        AppState.selectedParticipants.length;
    
    // 更新中奖名单
    const winnersSection = document.getElementById('winners-section');
    const winnersList = document.getElementById('winners-list');
    
    if (AppState.winners.length > 0) {
        winnersSection.classList.remove('hidden');
        winnersList.innerHTML = AppState.winners.map(winner => `
            <div class="winner-card">
                <div class="winner-avatar">${winner.avatar}</div>
                <div class="winner-info">
                    <div class="winner-name">${winner.name}</div>
                    <div class="winner-prize">${winner.prize}</div>
                </div>
            </div>
        `).join('');
    }
}

function finishLottery() {
    AppState.isLotteryRunning = false;
    document.getElementById('btn-lottery').disabled = false;
    document.getElementById('btn-save').disabled = false;
    document.getElementById('current-prize-name').textContent = '抽奖完成';
    
    alert('🎉 抽奖完成！恭喜所有获奖者！');
}

// ============================================
// 历史记录
// ============================================
function saveToHistory() {
    if (AppState.winners.length === 0) {
        alert('没有中奖记录可保存！');
        return;
    }
    
    const record = {
        id: Date.now(),
        date: new Date().toLocaleString('zh-CN'),
        participantCount: AppState.selectedParticipants.length + AppState.winners.length,
        winners: [...AppState.winners],
        prizes: [...AppState.prizes]
    };
    
    AppState.history.unshift(record);
    renderHistory();
    
    alert('已保存到历史记录！');
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const empty = document.getElementById('history-empty');
    
    if (AppState.history.length === 0) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }
    
    empty.classList.add('hidden');
    list.innerHTML = AppState.history.map(record => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-date">${record.date}</span>
                <span class="history-participants">共 ${record.participantCount} 人参与</span>
            </div>
            <div class="history-winners">
                ${record.winners.map(w => `
                    <span class="history-winner">
                        <span class="prize-badge">${w.prize}</span>
                        ${w.name}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}
