import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/axios/types/UserInfo'

export const useStore = defineStore(
  'store',
  () => {
    const token = ref('')
    const phone = ref('')
    const navActive = ref(0)
    const categoryChose = ref(0)

    const userInfo: Ref<UserInfo> = ref({
      balance: 0,
      createTime: '',
      encrPassword: '',
      gender: 0,
      id: 0,
      operaTime: '',
      phone: '',
      schoolId: 0,
      userName: ''
    })

    const activeNav = ref(0)
    const taskExpirationTime = ref('')

    return { token, phone, navActive, categoryChose, userInfo, activeNav, taskExpirationTime }
  },
  {
    persist: [
      {
        paths: ['token', 'userInfo'],
        storage: localStorage
      }
    ]
  }
)
