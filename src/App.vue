<script setup lang="ts">
import { RouterView } from 'vue-router'
import CryptoJS from 'crypto-js'
const dataHex = CryptoJS.enc.Utf8.parse('123') // 需要加密的数据

const keyHex = CryptoJS.enc.Utf8.parse('xxlzqqlzxqkyzhwj') // 秘钥

const v = CryptoJS.AES.encrypt(dataHex, keyHex, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
})
console.log(v.toString())
</script>

<template>
  <div class="html-wrap">
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
