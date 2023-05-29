<template>
  <div class="outtest-box flex-direction-col">
    <Back />

    <div class="page-title">
      <span>手机号注册</span>
    </div>

    <div class="prompt">
      <span>新人注册即送5元红包</span>
    </div>

    <van-form @submit="">
      <van-cell-group inset>
        <van-field name="手机号" placeholder="手机号" :rules="[{ required: true }]" class="inp" />
      </van-cell-group>
    </van-form>

    <van-button :disabled="!checked" color="rgb(64, 169, 255)" round>确认</van-button>

    <van-checkbox v-model="checked" icon-size="15px" class="agree-group">
      已阅读并同意以下协议：《帮帮我平台服务协议》《隐私权政策》
    </van-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { axiosGet, axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useStore } from '@/stores'
import Back from '@/components/Back.vue'

const phoneNumber = ref('')
const sms = ref('')
const checked = ref(false)

const sendCode = async () => {
  const data = await axiosGet(
    axiosConfig.rootUrl + axiosConfig.sendCode + '?phone=' + phoneNumber.value
  )
  console.log(data)
}

const store = useStore()
const login = async () => {
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.loginAndRegister, {
    phone: phoneNumber.value,
    code: sms.value
  })
  console.log(data)
  store.token = data.data.token
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
  width: 132px;
  height: 20px;
  left: 18px;
  right: 280px;
  top: 191px;
  bottom: 721px;

  background: rgb(252, 207, 207);
  border-radius: 5px;

  span {
    margin-left: 7px;
    color: rgb(238, 52, 52);
    font-family: Noto Sans SC;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0px;
  }
}
// 表单
:deep(.van-field__control) {
  margin-top: 40px;
  border: none;
  border-bottom: 0.5px solid rgb(0, 0, 0);
}

:deep(.van-button) {
  margin-top: 66px;
}
// 同意协议
.agree-group {
  margin-top: 20px;
}
:deep(.van-checkbox__label) {
  color: rgb(118, 118, 118);
  font-family: Noto Sans SC;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
}
</style>
