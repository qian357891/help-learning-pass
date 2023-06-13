<template>
  <div class="outtest-box flex-direction-col">
    <Back :color="'black'" :back-page="'login'" />

    <div class="page-title">
      <span>亲，欢迎登录！</span>
    </div>

    <van-form>
      <van-cell-group inset>
        <van-field
          name="手机号"
          v-model="phoneNumber"
          placeholder="请输入手机号"
          :rules="[{ required: true, pattern: reg_tel, message: '请填写正确的手机号' }]"
        />
        <van-field
          name="密码"
          v-model="password"
          placeholder="请输入密码"
          type="password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
    </van-form>

    <div class="change-txt-box">
      <div class="change-login-way">
        <RouterLink :to="{ name: 'login' }">短信验证码登录</RouterLink>
      </div>
      <div class="change-login-way">
        <span>忘记密码</span>
      </div>
    </div>

    <van-button color="rgb(64, 169, 255)" round @click="login">登录</van-button>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { axiosGet, axiosPost } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import { useStore } from '@/stores'
import Back from '../../components/Back.vue'
import Footer from '@/components/Footer.vue'
import router from '@/router'
import { getHexPass, getHexData } from '@/crypto'
import type { WordArray } from '@/crypto'
import { reg_tel } from '@/util/reg'
import CryptoJS from 'crypto-js'
import { showFailToast } from 'vant'

const store = useStore()
const phoneNumber = ref('')
const password = ref('')

// 获取加密秘钥
let keyHex: WordArray
const getkeyHex = async () => {
  const data = await axiosGet(axiosConfig.rootUrl + axiosConfig.getKey)
  keyHex = CryptoJS.enc.Utf8.parse(data.data.key)
  console.log(keyHex)
}

const login = async () => {
  // if (reg_tel.test(phoneNumber.value)) {
  store.phone = phoneNumber.value
  //   // 存储用户数据
  //   const userData = await axiosPost(axiosConfig.rootUrl + axiosConfig.getUserInfo, {})
  //   store.userInfo = userData.data.userInfo
  // } else {
  //   return
  // }

  //使用加密后的密码进行登录
  await getkeyHex()
  const hexpass = getHexPass(getHexData(password.value), keyHex)
  const data = await axiosPost(axiosConfig.rootUrl + axiosConfig.loginByPassword, {
    phone: store.phone,
    password: hexpass.toString()
  })

  store.token = await data.data.token
  // 存储用户数据
  const userData = await axiosPost(axiosConfig.rootUrl + axiosConfig.getUserInfo, {})
  store.userInfo = userData.data.userInfo

  if (data.data.code == 500) {
    showFailToast('手机号或密码错误！')
  }
  if (store.token) {
    router.push({ name: 'userCenter' })
  }
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

// 表单
:deep(.van-field__control) {
  margin-top: 40px;
  border: none;
  border-bottom: 0.5px solid rgb(0, 0, 0);
}

:deep(.van-form) {
  .van-field:nth-child(2) {
    input {
      margin-top: 10px;
    }
  }
}
.change-txt-box {
  display: flex;
  justify-content: space-between;
}

:deep(.van-button) {
  margin-top: 66px;
}
// 同意协议
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
