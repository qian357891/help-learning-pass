import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const token = ref('')
  const phone = ref('')

  return { token, phone }
})
