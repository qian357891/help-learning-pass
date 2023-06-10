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
import { computed } from 'vue'
import { ref } from 'vue'

const props = defineProps(['color'])

const showBottom = ref(false)
const showPopup = () => {
  showBottom.value = true
}
const currentDate = ref(['2023', '06', '15'])
const currentTime = ref(['12', '00'])

const onConfirm = () => {
  showBottom.value = false
}

const onCancel = () => {
  showBottom.value = false
}

const minDate = ref(new Date(Date.now()))
const maxDate = new Date(2025, 11, 30)

const selectDate = computed(
  () => `${currentDate.value.join('-')} ${currentTime.value.join(':')}:00`
)
</script>

<style scoped lang="scss"></style>
