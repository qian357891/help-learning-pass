import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/LoginAndRegister/Login.vue'
import LoginByPassword from '@/views/LoginAndRegister/LoginByPassword.vue'
import Sms from '@/views/LoginAndRegister/Sms.vue'
import AddTask from '@/views/Task/AddTask.vue'
import TaskInfo from '@/views/Task/TaskInfo.vue'
import CommunityIndex from '@/views/community/CommunityIndex.vue'
import PostInfo from '@/views/community/PostInfo.vue'
import UserCenterIndex from '@/views/user-center/UserCenterIndex.vue'
// import RegisterVue from '@/views/abandoned/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: RegisterVue
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login-by-password',
      name: 'loginByPassword',
      component: LoginByPassword
    },
    {
      path: '/sms',
      name: 'sms',
      component: Sms
    },
    {
      path: '/add-task/:categoryId',
      name: 'addTask',
      component: AddTask
    },
    {
      path: '/task-info/:taskId',
      name: 'taskInfo',
      component: TaskInfo
    },
    // 社区
    {
      path: '/community/index',
      name: 'communityIndex',
      component: CommunityIndex
    },
    {
      path: '/community/post-info/:communityId',
      name: 'postInfo',
      component: PostInfo
    },
    // 个人中心
    {
      path: '/user-center',
      name: 'userCenter',
      component: UserCenterIndex
    }
  ]
})

export default router
