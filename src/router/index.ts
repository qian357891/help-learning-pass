import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/LoginAndRegister/Register.vue'
import Login from '@/views/LoginAndRegister/Login.vue'
import LoginByPassword from '@/views/LoginAndRegister/LoginByPassword.vue'
import Sms from '@/views/LoginAndRegister/Sms.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
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
    }
  ]
})

export default router
