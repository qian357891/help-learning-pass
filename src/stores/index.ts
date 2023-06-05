import { ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const token = localStorage.getItem('token')
  const phone = ref('')
  const navActive = ref(0)
  const categoryChose = ref(0)

  watch(categoryChose, () => {})

  return { token, phone, navActive, categoryChose }
})
