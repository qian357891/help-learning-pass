<template>
  <div class="wrap" style="height: 100vh">
    <div class="main-box">
      <header>
        <TaskHeader :title="'任务详细'" />
      </header>
      <main class="content-box task-info">
        <div>
          <span>{{ taskInfo.taskName }}</span>
        </div>

        <div>
          <span>{{ taskInfo.taskInfo }}</span>
        </div>

        <div>
          <span>取货地点</span>
          <span>{{ taskInfo.fromPlace }}</span>
        </div>

        <div>
          <span>收货地点</span>
          <span>{{ taskInfo.toPlace }}</span>
        </div>
        <div>
          <span>任务截止时间</span>
          <span>{{ taskInfo.expirationTime }}</span>
        </div>
        <van-divider />
        <div>
          <span>代取费用</span>
          <span>{{ taskInfo.originalPrice }}</span>
        </div>
        <div>
          <span>任务赏金</span>
          <span>{{ taskInfo.taskPrice }}</span>
        </div>
      </main>
    </div>
    <footer>
      <TaskFooter
        :get-cost="taskInfo.originalPrice"
        :reward="taskInfo.taskPrice"
        :on-click="receiveTask"
        :button-text="'立即接收'"
      >
        接取任务超过3分钟后取消，会影响个人信誉，请谨慎接取任务
      </TaskFooter>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { axiosGet } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useRoute } from 'vue-router'
import { type TaskInfo } from '@/axios/types/Task'
import TaskHeader from '@/components/task/TaskHeader.vue'
import TaskFooter from '@/components/task/TaskFooter.vue'

const route = useRoute()
const taskId = route.params.taskId

const taskInfo: TaskInfo = (
  await axiosGet(axiosConfig.rootUrl + axiosConfig.getTaskInfo + '?taskId=' + taskId)
).data.taskInfo

const receiveTask = () => {}
</script>

<style scoped lang="scss"></style>
