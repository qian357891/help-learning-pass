export const axiosConfig = {
  // rootUrl: 'http://localhost:8081',
  // rootUrl: 'http://xxl.vip.aeert.com',
  rootUrl: 'http://47.109.83.157:8081',
  // 用户
  sendCode: '/user/sendMessage',
  loginAndRegister: '/user/loginAndRegister',
  loginByPassword: '/user/login',
  getKey: '/user/getKey',
  logout: '/user/logout',
  alterUser: '/user/alterUser',
  getUserInfo: '/user/getUserInfo',
  // 任务
  uploadImg: '/img/task/upload',
  indexTaskTopN: '/index/data/topN',
  taskScreen: '/task/screen',
  createTask: '/task/create',
  getTaskInfo: '/task/taskInfo',
  // 订单
  acceptCreate: '/accept/create',
  orderInfo: '/accept/orderInfo',
  // 搜索
  searchTask: '/task/search',

  //社区
  getPostList: '/community/list',
  getPostingDetailById: '/community/getPostingDetailById',

  // socekt
  socketUserId: '/websocket',
  socketRoot: 'ws://47.109.83.157:8081'
  // socketRoot: 'ws://xxl.vip.aeert.com'
}
