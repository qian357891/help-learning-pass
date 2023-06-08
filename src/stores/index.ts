import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore(
  'store',
  () => {
    const token = ref('')
    const phone = ref('')
    const navActive = ref(0)
    const categoryChose = ref(0)

    return { token, phone, navActive, categoryChose }
  },
  {
    persist: [
      {
        paths: ['token'],
        storage: localStorage
      }
    ]
  }
)
