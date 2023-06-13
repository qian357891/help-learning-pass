<template>
  <div class="wrap">
    <div class="main-box">
      <header>
        <TaskHeader :title="'任务详细'" :back-page="'home'" />
      </header>
      <div class="content-box task-info" style="margin-top: 20px">
        <div class="category" :style="{ color: chose?.color }">
          <p>{{ chose?.name }}</p>
        </div>

        <main class="post-main-content">
          <!-- 头 -->
          <div>
            <div v-if="taskInfo?.headUrl != ''">
              <VanImage fit="cover" width="50" height="50" :src="taskInfo?.headUrl" alt="" />
            </div>
            <div v-else>
              <img src="@/assets/img/task-page/default-img.png" alt="" />
            </div>
            <div>
              <span>{{ taskInfo?.userName }}</span>
            </div>
          </div>
          <!-- 任务详细 -->
          <div>
            <span>{{ taskInfo?.taskName }}</span>
          </div>
          <div>
            <span>{{ taskInfo?.taskInfo }}</span>
          </div>
        </main>

        <div class="" v-if="taskInfo?.imageUrls.length != 0">
          <VanImage
            height="225"
            fit="cover"
            @click="openImgs(taskInfo?.imageUrls)"
            :src="taskInfo?.imageUrls[0]"
            :alt="taskInfo?.taskName"
          />
        </div>
      </div>
      <!-- 任务的属性 -->
      <div class="content-box task-info" style="margin-top: 10px">
        <div>
          <span>取货地点</span>
          <span>{{ taskInfo?.fromPlace }}</span>
        </div>
        <div>
          <span>收货地点</span>
          <span>{{ taskInfo?.toPlace }}</span>
        </div>
        <div>
          <span>任务截止时间</span>
          <span style="color: rgba(8, 131, 217, 0.68)">{{
            processingTime(taskInfo?.expirationTime as string)
          }}</span>
        </div>
        <van-divider />
        <div>
          <span>代取费用</span>
          <span>{{ taskInfo?.originalPrice }}￥</span>
        </div>
        <div>
          <span>任务赏金</span>
          <span>{{ taskInfo?.taskPrice }}￥</span>
        </div>
        <van-divider />
        <div style="text-align: center">
          <span>接取任务后可查看任务发布者联系方式</span>
        </div>
      </div>
    </div>
    <footer>
      <TaskFooter
        :get-cost="taskInfo?.originalPrice"
        :reward="taskInfo?.taskPrice"
        :on-click="receiveTask"
        :button-text="'立即接收'"
      >
        <div style="">
          <span> 接取任务3分钟内取消，会影响个人信誉，请谨慎接取任务 </span>
        </div>
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
import { ref, type Ref } from 'vue'
import { showImagePreview } from 'vant'
import router from '@/router'
import { processingTime } from '@/util/operateStr'

const store = useStore()
const route = useRoute()
const taskId = route.params.taskId

const taskInfo: Ref<TaskInfo | undefined> = ref()
const getTaskInfo = async () => {
  const data = await axiosGet(axiosConfig.rootUrl + axiosConfig.getTaskInfo + '?taskId=' + taskId)
  taskInfo.value = data.data.taskDetail
}

getTaskInfo()
console.log(taskInfo)

const receiveTask = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.acceptCreate, {
    taskId,
    userId: store.userInfo.id
  })
  console.log(data)
  router.push({ name: 'OderInfo', params: { oderId: taskId } })
}

const chose = chooseList.find((el) => el.id == taskInfo.value?.categoryId)

// 处理截止时间字符串
// const processingTime = (originalTime: string) =>
//   originalTime.slice(5, originalTime.length - 3).replace('-', '/')

//图片预览
const openImgs = (imageUrls: any) => {
  showImagePreview(imageUrls)
}

// 存储该任务的用户id
store.taskUserId = taskInfo.value?.userId as number
</script>

<style scoped lang="scss">
.post-main-content {
  margin: 15px 0 0 0;
}

.content-box {
  padding-top: 15px;
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

.task-info {
  span:last-child {
    color: rgb(0, 0, 0);
  }
}

:deep(.van-image) {
  margin: 12px 0 25px 0 !important;
  img {
    border-radius: 10px;
  }
}
</style>
