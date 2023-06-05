<template>
  <div class="wrap">
    <img class="hero" src="../assets/img/index-img.png" alt="" />
    <div class="search">
      <van-search v-model="search" show-action placeholder="请输入你需要搜索任务">
        <template #action>
          <span>搜索</span>
        </template>
      </van-search>
    </div>

    <!-- 分类按钮 -->
    <div class="classify">
      <div class="classify-box">
        <div>
          <img src="../assets/icons/home-page/aixin.png.svg" alt="" />
          <span>代取</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/weizhi_1.png.svg" alt="" />
          <span>代办</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/ziyuan.png.svg" alt="" />
          <span>外卖</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/jiaoyisuo.png.svg" alt="" />
          <span>跳蚤</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/qita.png.svg" alt="" />
          <span>其他</span>
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="list">
      <div class="choose">
        <span>任务中心</span>
        <span
          :class="{ chosed: store.categoryChose === key }"
          v-for="(item, key) in chooseList"
          @click="chooseCategory(key)"
          >{{ item }}</span
        >
      </div>

      <!-- 主内容 -->
      <div class="task-review-box">
        <div v-for="(item, id) in chosedTaskList" class="task-review">
          <div>
            <img src="../assets/img/task-page/default-img.png" alt="" />
          </div>
          <div class="task-review-content">
            <!-- 任务标题 -->
            <header class="task-review-title">
              <div>
                <span> 外卖 </span>
              </div>
              <div>
                <span>{{ item.taskName }}</span>
              </div>
            </header>
            <!--  -->
            <span>内容 | 雷永江代言的那家，一两不加腐竹。</span>
            <span>任务接取时间：{{ item.expirationTime }}</span>
          </div>
          <div>￥{{ item.taskPrice }}</div>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="footer-nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot>社区</van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5" @click="toMe">个人</van-tabbar-item>
      </van-tabbar>
    </div>

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
</template>

<script setup lang="ts">
import { axiosGet, axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import router from '@/router'
import { useStore } from '@/stores'
import { ref, watch, type Ref, onMounted } from 'vue'
import { type TaskList } from '../axios/types/Task'

const store = useStore()

const active = ref(0)
const search = ref('')

const toMe = () => {
  router.push({ name: 'login' })
}

const chooseList = ['全部', '代取', '代办', '跳蚤', '其他']

const chooseCategory = async (key: number) => {
  const data = await axiosPost(axiosConfig.taskScreen, {
    categoryId: key,
    pageNo: 1
  })

  chosedTaskList.value = data.data
  console.log(data.data)
  console.log(chosedTaskList)
  return data.data
}

let chosedTaskList: Ref<Array<TaskList>> = ref([])

// 获取“全部”内容
;(async () => {
  const data = await axiosGet(axiosConfig.indexTaskTopN)
  chosedTaskList.value = data.data.taskTopn
})()
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}
.hero {
  // position: absolute;
  max-width: fit-content;
  width: 100vw;
}
.search {
  position: fixed;
  width: 100vw;
  top: 10px;
  & > * {
    background: #ffffff00;
  }
}

// 搜索按钮
:deep(.van-search__action) {
  background-color: rgb(64, 169, 255);
  border-radius: 15px;
  color: rgb(255, 255, 255);
}

// 分类
.classify {
  position: absolute;
  width: 407px;
  height: 69px;
  top: 180px;
  left: 50%;
  transform: translate(-50%);
  box-sizing: border-box;

  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);

  border-radius: 10px;
}

.classify-box {
  display: flex;
  margin-top: 12px;
  div {
    width: 30px;
    margin-left: 53px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  :first-child {
    margin-left: 12px;
  }
  span {
    font-family: Noto Sans;
    width: 24px;
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
    margin-left: 12px;
  }
}
// 任务列表
.list {
  width: 407px;
  // box-sizing: border-box;
  margin: 30px 15px 12px 0px;

  background: rgb(255, 255, 255);
  border: 3px solid rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);

  border-radius: 10px;
}
// 已选中类别
.chosed {
  color: rgb(0, 0, 0);
  font-size: 11px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
}
// 选择类别
.choose {
  margin-top: 12px;

  span:first-of-type {
    /* 任务中心 */
    color: rgb(0, 0, 0);
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
  }

  span:nth-child(n + 3)::before {
    content: '/';
    margin-right: 10px;
    color: rgb(201, 205, 212);
  }

  span {
    margin-left: 7px;
    color: rgb(78, 89, 105);
    font-family: Noto Sans;
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
  }
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

    display: flex;
    flex-direction: column-reverse;
    /* ￥16.5 */
    color: rgb(255, 110, 80);
    font-family: Noto Sans SC;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -1px;
    text-align: left;
  }
}

// 任务文字内容
.task-review-content {
  display: flex;
  flex-direction: column;

  & > span {
    /* 内容 | 雷永江代言的那家，一两不加腐竹。 */
    color: rgb(84, 84, 84);
    font-family: Noto Sans SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
  }
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
  background: rgb(255, 182, 149);
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

// 底部导航
.footer-nav {
  background: rgb(255, 255, 255);
}
</style>
