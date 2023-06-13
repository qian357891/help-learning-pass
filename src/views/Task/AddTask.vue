<template>
  <div>
    <div class="wrap">
      <div class="main-box">
        <!-- 头部 -->
        <div>
          <TaskHeader :title="'帮帮·发布'" :back-page="'home'" />
          <div class="prompt">
            <div>
              <van-icon name="volume-o" />
              <span> 温馨提示：请发布合理任务，平台将会对违规任务和账号进行封禁</span>
            </div>
          </div>
        </div>
        <!-- tab切换 -->
        <header>
          <div
            v-for="item in chooseList.slice(1, chooseList.length)"
            :class="{ chose: store.categoryChose == item.id }"
            :key="item.id"
            @click="chooseCategory(item.id)"
          >
            <span :style="{ color: item.id == store.categoryChose ? item.color : '' }">{{
              item.name
            }}</span>
          </div>
        </header>

        <!-- 任务详细 -->
        <main class="task-info content-box">
          <div>
            <span>任务名</span>
            <TheInput v-model:value="info.taskName" />
          </div>

          <div>
            <span>取货地点/目的地</span>
            <TheInput v-model:value="info.fromPlace" />
          </div>

          <div v-if="[1, 2].includes(store.categoryChose)">
            <span>收货地点</span>
            <TheInput v-model:value="info.toPlace" />
          </div>

          <div>
            <span>联系人</span>
            <span>{{ store.userInfo.userName }} {{ store.userInfo.phone }}</span>
          </div>

          <div>
            <span>任务截止时间</span>
            <PopupPicker :color="'rgb(8, 131, 217, 0.68)'" />
          </div>

          <div>
            <span>上传图片</span>
            <div class="img-submit" style="display: flex; flex-direction: column; align-items: end">
              <div>
                <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" />
              </div>
              <div class="img-submit-prompt">
                <div>仅支持jpg、jpeg、png格式</div>
                <div>请不要上传包含个人隐私的图片，如：取件码，身份证等</div>
              </div>
            </div>
          </div>

          <div>
            <span>任务详细</span>
            <div>
              <TheTextarea v-model:value="info.taskInfo" />
            </div>
            <span>任务详情只有本人和接取人可以看见，请不要填写银行卡密码等重要信息</span>
          </div>
        </main>

        <!-- 费用详细 -->
        <div class="cost-info task-info content-box">
          <div>
            <span>代取费用</span>
            <TheInput v-model:value="cost.getCost" class="addMoney" />
          </div>

          <div>
            <span>任务赏金</span>
            <TheInput v-model:value="cost.reward" class="addMoney" />
          </div>

          <!-- <div>
            <span>计费说明</span>
          </div> -->
          <van-divider />

          <div>
            <span>小计￥{{ +cost.getCost + +cost.reward }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 费用总和 -->
    <footer>
      <TaskFooter
        :get-cost="cost.getCost"
        :reward="cost.reward"
        :on-click="createTask"
        :buttonText="'立即发布'"
      >
        发布后将有5分钟的冻结时间，冻结时间结束后可以取消发布
      </TaskFooter>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { axiosPost, axiosPostFormData } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import PopupPicker from '@/components/info/PopupPicker.vue'
import TheInput from '@/components/info/TheInput.vue'
import TheTextarea from '@/components/info/TheTextarea.vue'
import TaskFooter from '@/components/task/TaskFooter.vue'
import TaskHeader from '@/components/task/TaskHeader.vue'
import router from '@/router'
import { useStore } from '@/stores'
import { chooseList } from '@/util/category'
import { watch } from 'vue'
import { computed } from 'vue'
import { ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const categoryId = route.params.categoryId as unknown as number
store.categoryChose = categoryId

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(toRaw(file))
}

// 文件流
const fileList = ref([])
const _fileList_: any = ref([])
watch(fileList, () => {
  _fileList_.value = toRaw(fileList.value).map((item) => (toRaw(item) as any).file)
  console.log(toRaw(_fileList_.value))
})

const chooseCategory = async (key: number) => {
  store.categoryChose = key
  router.push({ name: 'addTask', params: { categoryId: key } })
}

const cost = ref({
  getCost: '0',
  reward: '0'
})
// 详细数据
const info = ref({
  categoryId: store.categoryChose,
  taskName: '',
  fromPlace: '',
  toPlace: '',
  contactType: 'phone',
  contactWay: store.userInfo.phone,
  userId: store.userInfo.id,
  taskInfo: '',
  taskPrice: 0,
  originalPrice: 0,
  expirationTime: store.taskExpirationTime
})

watch(cost.value, () => {
  info.value.taskPrice = computed(() => +cost.value.reward).value
  info.value.originalPrice = computed(() => +cost.value.getCost).value
})

watch(store, () => {
  info.value.expirationTime = store.taskExpirationTime
  info.value.categoryId = store.categoryChose
})

const createTask = async () => {
  let formdata = new FormData()
  _fileList_.value.forEach((element: File) => {
    formdata.append('img', element)
  })
  const imgData: any = await axiosPostFormData(
    axiosConfig.rootUrl + axiosConfig.uploadImg,
    formdata
  )

  const data: any = await axiosPost(axiosConfig.rootUrl + axiosConfig.createTask, {
    ...info.value,
    imageIds: imgData.urlIds
  })
  console.log(data)
  if (data.data.code == 200) {
    router.push({ name: 'home' })
  }
}
</script>

<style scoped lang="scss">
.prompt {
  /* 矩形 8 */
  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;
  background: rgb(255, 239, 203);
  border-radius: 10px;
  margin: 23px 0 17px;

  @include text(rgb(255, 97, 0), 10px);
  span {
    opacity: 0.6;
  }

  i {
    color: #000;
  }
}

header {
  display: flex;
  align-items: end;
  & > div {
    @include flex-center();
    position: relative;

    &:nth-child(n) {
      top: 7px;
      width: 114px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
    }

    border-radius: 10px 10px 0px 0px;

    span {
      @include text(rgb(255, 255, 255), 14px, 600);
      // letter-spacing: 22px;
    }
  }
}

@mixin tabText($color) {
  color: $color;
  font-family: Alibaba-PuHuiTi;
  font-size: 24px;
  font-weight: 600;
  // letter-spacing: 22px;
}

.chose {
  top: 15px !important;
  width: 180px !important;
  height: 80px !important;
  background: rgb(255, 255, 255) !important;
  span {
    @include tabText($color: rgb(64, 169, 255));
  }
}

.img-submit-prompt {
  display: flex;
  flex-direction: column;
  align-items: end;
  opacity: 0.63;
  @include text(rgb(133, 135, 136), 9px);
}

.addMoney {
  &:deep(.van-field__body)::after {
    content: '￥';
  }
}

// 费用详细
.cost-info {
  padding-top: 19px;
  margin-top: 11px;
}
</style>
