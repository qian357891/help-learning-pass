<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
    <div class="wrap" style="min-height: 100vh">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img class="hero" :src="getImgUrl(image)" />
        </van-swipe-item>
      </van-swipe>
      <div class="search">
        <van-search
          v-model="search"
          shape="round"
          @search="onSearch"
          show-action
          placeholder="请输入你需要搜索任务"
        >
          <template #action>
            <span @click="onSearch">搜索</span>
          </template>
        </van-search>
      </div>

      <div style="transform: translate(0, -30px)">
        <!-- 分类按钮 -->
        <div class="classify">
          <div class="classify-box">
            <div
              @click="toAddTask(item.id)"
              v-for="item in chooseList.slice(1, chooseList.length)"
              :key="item.id"
            >
              <!-- <img :src="item.img" :alt="item.name" /> -->
              <img :src="getSvgUrl(item.img as string)" :alt="item.name" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>

        <!-- 任务列表 -->
        <div class="list">
          <div class="choose">
            <span>任务中心</span>
            <span
              :class="{ chosed: store.categoryChose == item.id }"
              v-for="item in chooseList"
              :key="item.id"
              @click="chooseCategory(item.id)"
              >{{ item.name }}</span
            >
          </div>

          <!-- 主内容 -->
          <div v-if="chosedTaskList.length === 0">
            <van-empty image="search" description="这里没有找到任何东西" />
          </div>
          <div v-else>
            <div class="task-review-box" style="margin: 20px 0">
              <div
                v-for="item in chosedTaskList"
                :key="item.id"
                class="task-review"
                @click="toTaskInfo(item.id)"
              >
                <div v-if="item.imageUrls.length == 0">
                  <img
                    src="../assets/img/task-page/default-img.png"
                    :alt="item.taskName"
                    class="img"
                  />
                </div>
                <div v-else>
                  <img :src="item.imageUrls[0]" fit="scale-down" alt="" class="img" />
                </div>
                <div class="task-review-content">
                  <!-- 任务标题 -->
                  <header class="task-review-title">
                    <div :style="{ background: findByProp(item, 'color') }">
                      <span> {{ findByProp(item, 'name') }} </span>
                    </div>
                    <div>
                      <span>{{ item.taskName }}</span>
                    </div>
                  </header>
                  <!--  -->
                  <span class="van-multi-ellipsis--l2">内容 | {{ item.taskInfo }}</span>
                  <span v-if="item.validSeconds >= 3600"
                    >任务截止时间：{{ processingTime(item.expirationTime) }}</span
                  >
                  <van-count-down
                    v-else
                    millisecond
                    :time="item.validSeconds * 1000"
                    format="仅剩时间：mm:ss:SS"
                  />
                </div>
                <div>
                  <div>￥{{ item.taskPrice + item.originalPrice }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部导航 -->
      <footer-nav />

      <van-back-top
        bottom="10vh"
        style="
          right: 0px;
          border-radius: 15px 0 0 15px;
          height: 50px;
          width: 55px;
          background-color: rgba(64, 169, 255, 0.4);
        "
      />
    </div>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { axiosGet, axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import router from '@/router'
import { useStore } from '@/stores'
import { ref, type Ref } from 'vue'
import { type TaskList } from '../axios/types/Task'
import FooterNav from '@/components/nav/FooterNav.vue'
import { chooseList } from '@/util/category'
import { processingTime } from '@/util/operateStr'

//
function getSvgUrl(name: string) {
  return new URL(`../assets/icons/home-page/${name}.png.svg`, import.meta.url).href
}
function getImgUrl(name: string) {
  return new URL(`../assets/img/${name}.png`, import.meta.url).href
}
//
const store = useStore()
store.categoryChose = 0
const search = ref('')

interface ChooseList {
  name: string
  id: number
  color?: undefined
}

// 通过属性查找
const findByProp = (item: TaskList, key: keyof ChooseList) =>
  chooseList.find((el) => el.id == item.categoryId)?.[key]
const chosedTaskList: Ref<Array<TaskList>> = ref([])

const chooseCategory = async (key: number) => {
  store.categoryChose = key
  if (key === 0) {
    getAllTaskInfo()
    return
  }
  const data = await axiosPost(axiosConfig.taskScreen, {
    categoryId: key
  })
  chosedTaskList.value = data.data.data
}
// 获取“全部”内容
const getAllTaskInfo = async () => {
  const data = await axiosGet(axiosConfig.indexTaskTopN)
  chosedTaskList.value = data.data.taskTopn
}
getAllTaskInfo()

const toAddTask = (id: number) => {
  store.categoryChose = id
  router.push({ name: 'addTask', params: { categoryId: id } })
}
const toTaskInfo = (taskId: number) => {
  router.push({ name: 'taskInfo', params: { taskId } })
}

const loading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false
    router.go(0)
  }, 1000)
}
// 搜索
const onSearch = async () => {
  const data = await axiosGet(
    axiosConfig.rootUrl + axiosConfig.searchTask + '?taskName=' + search.value
  )
  chosedTaskList.value = data.data.data
  store.categoryChose = -1
}
// 图片
const images = ['index-img', 'index-img', 'index-img']
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}
.hero {
  width: 100vw;
  max-height: 50vh;
}
.search {
  position: fixed;
  width: 100vw;
  opacity: 0.9;
  top: 10px;
  & > * {
    background: #ffffff00;
  }
}
// 搜索按钮
:deep(.van-search__action) {
  background-color: rgb(64, 169, 255);
  width: 40px;
  border-radius: 15px;
  color: rgb(255, 255, 255);
  transform: translate(-24px);
  text-align: center;
}
// 分类
.classify {
  margin: 0 12px;
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);
  border-radius: 10px;
}

.classify-box {
  display: flex;
  padding: 10px;
  justify-content: space-around;
  div {
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-family: Noto Sans;
    width: 24px;
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
  }
}
// 任务列表
.list {
  margin: 12px 12px 12px 12px;
  background: rgb(255, 255, 255);
  border: 3px solid rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);
  border-radius: 10px;
}
// 已选中类别
.chosed {
  color: rgb(0, 0, 0) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 22px;
  letter-spacing: 0px;
}
// 选择类别
.choose {
  margin-top: 12px;
  span:first-of-type {
    /* 任务中心 */
    @include text(rgb(0, 0, 0), 18px, 400, YouSheBiaoTiHei);
    line-height: 23px;
  }
  span:nth-child(n + 3)::before {
    content: '/';
    margin-right: 5px;
    color: rgb(201, 205, 212);
  }
  span {
    margin-left: 7px;
    @include text(rgb(78, 89, 105), 10px, 400, Noto Sans);
    line-height: 22px;
  }
}

.img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

// 任务预览
.task-review-box {
  margin-top: 45px;
}
// 每个任务
.task-review {
  display: flex;
  & > div {
    margin-left: 10px;
  }
  &:nth-child(n + 2) {
    margin-top: 17px;
  }
  & > div:last-child {
    margin-left: auto;
    padding-right: 15px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    /* ￥16.5 */
    @include text(rgb(255, 110, 80), 14px, 500, Noto Sans SC);
    line-height: 22px;
    letter-spacing: -1px;
  }
}

// 任务文字内容
.task-review-content {
  display: flex;
  flex-direction: column;
  & > span {
    /* 内容 | 雷永江代言的那家，一两不加腐竹。 */
    @include text(rgb(84, 84, 84), 12px, 400, Noto Sans SC);
    line-height: 22px;
  }
}
// 秒杀时间
:deep(.van-count-down) {
  @include text(rgb(216, 0, 0), 12px, 400, Noto Sans SC);
  line-height: 22px;
}

// 任务标题
.task-review-title {
  display: flex;
  align-items: center;
  div:last-child {
    margin-left: 10px;
  }
}

.task-review-title > div:first-child {
  width: 30px;
  height: 20px;
  // background: rgb(255, 182, 149);
  background: rgb(255, 123, 187);
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  span:first-child {
    color: rgba(255, 255, 255, 0.9);
    font-family: ZhenyanGB;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
  }
}
</style>
