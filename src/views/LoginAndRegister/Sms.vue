<template>
  <div class="outtest-box flex-direction-col">
    <Back :color="'black'" />

    <div class="page-title">
      <span>输入验证码</span>
    </div>

    <div class="prompt">
      <span>验证码已发送到 {{ store.phone }}，15分钟内填写有效 </span>
    </div>

    <!-- 密码输入框 -->
    <van-password-input
      :value="sms"
      :length="4"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      :mask="false"
      :gutter="14"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="sms"
      :show="showKeyboard"
      :maxlength="4"
      @blur="showKeyboard = false"
    />

    <div class="reacquire-sms">
      <span v-if="time != 0">重新发送({{ time }}s)</span>
      <van-button v-else plain round type="primary" @click="sendCode">重新获取验证码</van-button>
    </div>

    <div class="change-login-way">
      <RouterLink :to="{ name: 'loginByPassword' }">换个登录方式</RouterLink>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useStore } from '@/stores'
import Back from '@/components/Back.vue'
import Footer from '@/components/Footer.vue'
import { watch } from 'vue'
import router from '@/router'
import { showFailToast } from 'vant'

const store = useStore()
const sms = ref('')
const login = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.loginAndRegister, {
    phone: store.phone,
    code: sms.value
  })
  if (data.data.code == 500) {
    showFailToast('验证码错误！')
    return
  }
  store.token = await data.data.token
  console.log(data)
}

watch(sms, async () => {
  if (sms.value.length === 4) {
    await login()
    if (store.token) {
      router.push({ name: 'home' })
    }
  }
})

const showKeyboard = ref(true)

// 重新发送定时器
const GAP_TIME = 10
const time = ref(GAP_TIME)
const intervalFn = () => {
  if (time.value === 0) {
    clearInterval(this)
    return
  }

  time.value--
}
;(() => {
  setInterval(intervalFn, 1000)
})()

// 发送验证码
const sendCode = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.sendCode, {
    phone: store.phone
  })

  time.value = GAP_TIME
  console.log(data)
}
</script>

<style scoped lang="scss">
// 标题
.page-title {
  margin-top: 57px;
  font-family: Noto Sans SC;
  font-size: 36px;
  font-weight: 400;
  line-height: 53px;
  letter-spacing: 0px;
}
// 提示
.prompt {
  margin-top: 8px;

  * {
    color: rgb(118, 118, 118);
    font-family: Noto Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
  }
}
// 验证码输入框
:deep(.van-password-input__item) {
  margin-top: 100px;
  border-bottom: 1px solid #000000;
}

// 重新获取验证码
.reacquire-sms {
  text-align: center;
  margin-top: 140px;

  * {
    color: rgb(156, 156, 156);
    font-family: Noto Sans SC;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
  span {
    display: inline-block;
    margin-top: 12px;
    height: 32px;
  }
}
//
.change-login-way {
  margin-top: 15px;
  font-family: Noto Sans SC;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  * {
    color: rgb(64, 169, 255);
  }
}
</style>
