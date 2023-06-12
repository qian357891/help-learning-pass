<template>
  <div>
    <!-- 底部导航 -->
    <div style="height: 50px"></div>
    <div class="footer-nav">
      <van-tabbar v-model="store.activeNav">
        <van-tabbar-item icon="home-o" @click="pushPage('home')">首页</van-tabbar-item>
        <van-tabbar-item icon="search" @click="pushPage('communityIndex')">社区</van-tabbar-item>
        <van-tabbar-item icon="friends-o" @click="pushPage('userCenter')">个人</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/stores'

const store = useStore()
const routerName = router.currentRoute.value.name
switch (routerName) {
  case 'home':
    store.activeNav = 0
    break
  case 'communityIndex':
    store.activeNav = 1
    break
  case 'userCenter':
    store.activeNav = 2
    break
}

const pushPage = (routerName: string) => {
  router.push({ name: routerName })
}
</script>

<style scoped lang="scss">
// 底部导航
.footer-nav {
  background: rgb(255, 255, 255);
}
</style>
