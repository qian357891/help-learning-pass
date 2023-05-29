<template>
  <div class="outtest-box flex-direction-col">
    <Back />

    <div class="page-title">
      <span>输入验证码</span>
    </div>

    <div class="prompt">
      <span>验证码已发送到 {{ store.phone }}，15分钟内填写有效 </span>
    </div>

    <div class="change-login-way">
      <span>账号密码登录</span>
    </div>

    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :length="4"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      :mask="false"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />

    <van-button color="rgb(64, 169, 255)" round>登录</van-button>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useStore } from '@/stores'
import Back from '../components/Back.vue'
import Footer from '@/components/Footer.vue'

const store = useStore()
const sms = ref('')

const value = ref('')
const showKeyboard = ref(true)

const login = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.loginAndRegister, {
    phone: store.phone,
    code: sms.value
  })
  console.log(data)
  store.token = data.data.token
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
  :nth-child(2) {
    background: linear-gradient(145deg, rgba(0, 210, 233, 0.5), rgb(62, 143, 242));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
// 表单
:deep(.van-field__control) {
  margin-top: 40px;
  border: none;
  border-bottom: 0.5px solid rgb(0, 0, 0);
}

.inp {
  height: 120px;
}

:deep(.van-button) {
  margin-top: 66px;
}
// 同意协议
.change-login-way {
  margin-top: 23px;
  color: rgb(118, 118, 118);
  font-family: Noto Sans SC;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
</style>
