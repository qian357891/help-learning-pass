<template>
  <div class="outtest-box flex-direction-col">
    <Back />

    <div class="page-title">
      <span>亲，欢迎登录</span>
    </div>

    <div class="prompt">
      <span>没有帮帮账号？ </span>
      <RouterLink :to="{ name: 'register' }">立即注册</RouterLink>
    </div>

    <van-form @submit="">
      <van-cell-group inset>
        <van-field
          name="手机号"
          v-model="phoneNumber"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
          class="inp"
        />
      </van-cell-group>
    </van-form>

    <div class="change-login-way">
      <span>账号密码登录</span>
    </div>

    <van-button color="rgb(64, 169, 255)" round @click="sendCode">获取验证码</van-button>

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
import router from '@/router'

const store = useStore()
const phoneNumber = ref('')
const sms = ref('')

const sendCode = async () => {
  store.phone = phoneNumber.value

  const json = {
    phone: store.phone
  }

  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.sendCode, json)

  console.log(json)

  router.push({ name: 'sms' })
  console.log(data)
}

const logout = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.logout, {
    phone: phoneNumber.value
  })
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
