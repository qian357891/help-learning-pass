<template>
  <div class="wrap">
    <div class="main-box">
      <header>
        <TaskHeader :title="'任务详细'" :back-page="'home'" />
      </header>
      <main class="content-box task-info" style="margin-top: 37px">
        <div class="category" :style="{ color: chose?.color }">
          <p>{{ chose?.name }}</p>
        </div>
        <div class="img">
          <img src="/src/assets/img/task-page/default-img.png" :alt="taskInfo.taskName" />
        </div>

        <div class="container">
          <div>
            <span>{{ taskInfo.taskName }}</span>
            <van-divider />
            <span>{{ taskInfo.taskInfo }}</span>
          </div>
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
          <span style="color: rgba(8, 131, 217, 0.68)">{{ taskInfo.expirationTime }}</span>
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
import { axiosGet, axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useRoute } from 'vue-router'
import { type TaskInfo } from '@/axios/types/Task'
import TaskHeader from '@/components/task/TaskHeader.vue'
import TaskFooter from '@/components/task/TaskFooter.vue'
import { chooseList } from '@/util/category'
import { useStore } from '@/stores'

const store = useStore()
const route = useRoute()
const taskId = route.params.taskId

const taskInfo: TaskInfo = (
  await axiosGet(axiosConfig.rootUrl + axiosConfig.getTaskInfo + '?taskId=' + taskId)
).data.taskInfo

const receiveTask = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.acceptCreate, {
    taskId,
    userId: store.userInfo.id
  })
  console.log(data)
}

const chose = chooseList.find((el) => el.id == taskInfo.categoryId)
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  padding: 15px;
  background: rgb(249, 249, 249);
  border-radius: 10px;
  span:first-child {
    font-size: 18px;
  }
  span {
    color: black;
  }
}

.category {
  justify-content: center;
  @include text('', $font-size: 24px, $font-weight: 600);
  p {
    margin: 0;
    letter-spacing: 22px;
    transform: translate(11px);
  }
}

.img {
  height: 140px;
  justify-content: center;
  margin: 12px 0 25px 0 !important;
}
</style>
