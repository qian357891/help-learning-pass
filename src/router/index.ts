import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/LoginAndRegister/Login.vue'
import LoginByPassword from '@/views/LoginAndRegister/LoginByPassword.vue'
import Sms from '@/views/LoginAndRegister/Sms.vue'
import AddTask from '@/views/Task/AddTask.vue'
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
      path: '/add-task',
      name: 'addTask',
      component: AddTask
    }
  ]
})

export default router
