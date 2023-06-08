<template>
  <div>
    <div class="wrap">
      <div class="main-box">
        <!-- 帮帮·发布  -->
        <div>
          <div class="title">
            <Back />
            <span>帮帮·发布</span>
          </div>

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
            v-for="item in chooseList"
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
            <span>取货时间</span>
            <span>重庆邮电大学移通学院C区 </span>
          </div>

          <div>
            <span>收货地点</span>
            <span>重庆邮电大学移通学院C区 </span>
          </div>

          <div>
            <span>联系人</span>
            <span>十二 19122222222</span>
          </div>

          <div>
            <span>任务截止时间</span>
            <span class="task-deadline">5月30日 18:00</span>
          </div>

          <div>
            <span>上传图片</span>
            <div class="img-submit" style="display: flex; flex-direction: column; align-items: end">
              <div>
                <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
              </div>
              <div class="img-submit-prompt">
                <div>仅支持jpg、jpeg、png格式</div>
                <div>请不要上传包含个人隐私的图片，如：取件码，身份证等</div>
              </div>
            </div>
          </div>

          <div>
            <span>任务详细</span>
            <div class="task-info-input"></div>
            <span>任务详情只有本人和接取人可以看见，请不要填写银行卡密码等重要信息</span>
          </div>
        </main>

        <!-- 费用详细 -->
        <div class="content-box cost-info">
          <div>
            <span>代取费用</span>
            <span></span>
          </div>

          <div>
            <span>任务赏金</span>
            <span></span>
          </div>

          <div>
            <span>任务说明</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 费用总和 -->
    <div style="height: 69px"></div>
    <footer>
      <div>
        <div>
          <span>合计</span>
          <span>￥10.50</span>
        </div>
        <div>
          <span>发布后将有5分钟的冻结时间，冻结时间结束后可以取消发布</span>
        </div>
      </div>

      <div>
        <van-button round color="rgb(64, 169, 255)">立即发布</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Back from '@/components/Back.vue'
import { useStore } from '@/stores'
import { ref } from 'vue'

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file)
}

const fileList = ref([])
const store = useStore()

const chooseList = [
  { name: '代取', id: 2, color: 'rgb(69, 133, 245)' },
  { name: '代办', id: 4, color: 'rgb(3, 189, 97)' },
  { name: '外卖', id: 1, color: 'rgb(255, 182, 149)' }
]

const chooseCategory = async (key: number) => {
  store.categoryChose = key
}
</script>

<style scoped lang="scss">
.wrap {
  padding-bottom: 60px;
  background: linear-gradient(
    180deg,
    rgba(64, 157, 245, 0.54) 24.931%,
    hsla(0, 0%, 77%, 0.2) 54.697%
  );
}

.main-box {
  margin: 0 12px;
}

@mixin text($color, $font-size, $font-weight: 500) {
  color: $color;
  font-family: Alibaba-PuHuiTi;
  font-size: $font-size;
  font-weight: $font-weight;
}

.title {
  /* 帮帮·发布 */
  display: flex;
  align-items: center;

  @include text(rgb(255, 255, 255), 20px);
  div {
    width: 0px;
  }

  span {
    text-align: center;
    margin-top: 18px;
    flex: auto;
  }
}

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
      letter-spacing: 22px;
    }
  }
}

@mixin tabText($color) {
  color: $color;
  font-family: Alibaba-PuHuiTi;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 22px;
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

.content-box {
  padding: 26px 13px 12px 13px;
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);
  border-radius: 10px;
}

// 任务详细
.task-info {
  color: rgb(0, 0, 0);
  span:last-child {
    color: rgb(133, 135, 136);
  }

  font-family: Alibaba-PuHuiTi;
  font-size: 14px;
  font-weight: 400;

  & > div {
    display: flex;
    justify-content: space-between;
    &:nth-child(n + 2) {
      margin-top: 11px;
    }
  }
  & > div:last-child {
    @include flex-col();
    & > span:first-child::after {
      content: '*';
      color: rgba(224, 0, 0, 0.6);
    }
    & > span:last-child {
      @include text(rgb(133, 135, 136), 10px, 400);
      opacity: 0.6;
    }
  }
}

.task-deadline {
  opacity: 0.68;
  color: rgb(8, 131, 217) !important;
}

.img-submit-prompt {
  display: flex;
  flex-direction: column;
  align-items: end;
  opacity: 0.63;
  @include text(rgb(133, 135, 136), 9px);
}

.task-info-input {
  height: 128px;
  background: rgb(249, 249, 249);
  border-radius: 10px;
}
// 费用详细
.cost-info {
  padding-top: 19px;
  margin-top: 11px;
}

footer {
  position: fixed;
  width: 430px;
  height: 69px;
  bottom: 0px;

  background: rgb(255, 255, 255);
  box-shadow: 0px -2px 4px rgba(211, 211, 211, 0.2);

  display: flex;
  align-items: center;

  & > div > div:last-child {
    font-family: Noto Sans SC;
    color: rgb(128, 128, 128);
    font-size: 10px;
    font-weight: 300;
  }
}
</style>
