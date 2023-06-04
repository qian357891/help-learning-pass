import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const token = localStorage.getItem('token')
  const phone = ref('')
  const navActive = ref(0)

  return { token, phone, navActive }
})
