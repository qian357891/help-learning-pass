<template>
  <div>
    <!-- 底部导航 -->
    <div style="height: 50px"></div>
    <div class="footer-nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot>社区</van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5" @click="toMe">个人</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const active = ref(0)
const toMe = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
// 底部导航
.footer-nav {
  background: rgb(255, 255, 255);
}
</style>
