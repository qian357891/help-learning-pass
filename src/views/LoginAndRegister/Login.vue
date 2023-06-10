<template>
  <div class="outtest-box flex-direction-col">
    <Back :color="'black'" :back-page="'home'" />

    <div class="page-title">
      <span>短信验证码登录</span>
    </div>

    <div class="prompt">
      <span>未注册手机验证后自动登录 </span>
      <!-- <RouterLink :to="{ name: 'register' }">立即注册</RouterLink> -->
    </div>

    <van-form @submit="">
      <van-cell-group inset>
        <van-field
          name="手机号"
          v-model="phoneNumber"
          placeholder="请输入手机号"
          :rules="[{ required: true, pattern: reg_tel, message: '请填写正确的手机号' }]"
          class="inp"
        />
      </van-cell-group>
    </van-form>

    <div class="change-login-way">
      <RouterLink :to="{ name: 'loginByPassword' }">账号密码登录</RouterLink>
    </div>

    <van-button :disabled="!checked" color="rgb(64, 169, 255)" round @click="sendCode">
      获取验证码
    </van-button>

    <van-checkbox v-model="checked" icon-size="15px" class="agree-group">
      已阅读并同意以下协议：《帮帮我平台服务协议》《隐私权政策》
    </van-checkbox>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useStore } from '@/stores'
import Back from '../../components/Back.vue'
import Footer from '@/components/Footer.vue'
import router from '@/router'
import { reg_tel } from '@/util/reg'

const checked = ref(false)

const store = useStore()
const phoneNumber = ref('')
const sms = ref('')

const sendCode = async () => {
  if (reg_tel.test(phoneNumber.value)) {
    store.phone = phoneNumber.value
  } else {
    return
  }
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.sendCode, {
    phone: store.phone
  })

  if (reg_tel.test(phoneNumber.value)) {
    router.push({ name: 'sms' })
  }

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
    color: rgb(118, 118, 118);
    font-family: Noto Sans SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
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
// 修改登录方式
.change-login-way {
  margin-top: 23px;
  font-family: Noto Sans SC;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  * {
    color: rgb(118, 118, 118);
  }
}
</style>
