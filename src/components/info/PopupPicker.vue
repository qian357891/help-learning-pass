<template>
  <div>
    <!-- 底部弹出 -->
    <van-cell
      style="padding: 0"
      :style="{ color: props.color }"
      :title="selectDate"
      is-link
      @click="showPopup"
    />
    <van-popup v-model:show="showBottom" position="bottom">
      <!-- 时间选择 -->
      <van-picker-group
        title="任务截止日期"
        :tabs="['选择日期', '选择时间']"
        next-step-text="下一步"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
        <van-time-picker v-model="currentTime" />
      </van-picker-group>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { watchEffect } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

const props = defineProps(['color'])
const store = useStore()

const showBottom = ref(false)
const showPopup = () => {
  showBottom.value = true
}

const date = new Date() as any
// 转换
const computedDate = (key: keyof Date, value: number = 0) => {
  return computed(() => {
    if (date[key]() + value >= 10) {
      return '' + (date[key]() + value)
    }
    return '0' + (date[key]() + value)
  })
}

const thisMonth = computedDate('getMonth', 1)
const thisDay = computedDate('getDate')
const currentDate = ref(['' + date.getFullYear(), thisMonth.value, thisDay.value])

const thisHours = computedDate('getHours', 1)
const thisMinutes = computedDate('getMinutes', 1)
const currentTime = ref([thisHours.value, thisMinutes.value])

const onConfirm = () => {
  showBottom.value = false
}

const onCancel = () => {
  showBottom.value = false
}

const minDate = ref(new Date(Date.now()))
// 一个月的最后几天，3天可能会变成下一个月

const maxDate = new Date(date.getFullYear(), +thisMonth.value, 30)

const selectDate = computed(
  () => `${currentDate.value.join('-')} ${currentTime.value.join(':')}:00`
)
watchEffect(() => {
  store.taskExpirationTime = selectDate.value
})
</script>

<style scoped lang="scss"></style>
