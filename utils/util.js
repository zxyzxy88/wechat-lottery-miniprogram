/* utils/util.js */
/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 随机打乱数组
 */
const shuffleArray = array => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * 从数组中随机选择n个元素
 */
const randomSelect = (array, count) => {
  const shuffled = shuffleArray(array)
  return shuffled.slice(0, Math.min(count, array.length))
}

/**
 * 延迟函数
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 深拷贝
 */
const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 生成唯一ID
 */
const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

module.exports = {
  formatTime,
  shuffleArray,
  randomSelect,
  delay,
  deepClone,
  generateId
}
