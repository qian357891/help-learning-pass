// 处理截止时间字符串
const processingTime = (originalTime: string) =>
  originalTime.slice(5, originalTime.length - 3).replace('-', '/')

export { processingTime }
