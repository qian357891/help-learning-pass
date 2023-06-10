export const axiosConfig = {
  // rootUrl: 'http://localhost:8081',
  rootUrl: 'http://xxl.vip.aeert.com',
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
  // 接单
  acceptCreate: '/accept/create',
  // 搜索
  searchTask: '/task/search'
}
