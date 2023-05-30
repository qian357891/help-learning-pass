<template>
  <div class="wrap" style="height: 1000px">
    <img class="hero" src="../assets/img/index-img.png" alt="" />
    <div class="search">
      <van-search v-model="search" show-action placeholder="请输入你需要搜索任务">
        <template #action>
          <van-button type="primary" round>搜索</van-button>
        </template>
      </van-search>
      <div class="list"></div>
    </div>
    <footer class="footer-nav"></footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}
.hero {
  // position: absolute;
  width: 100vw;
}
.search {
  position: absolute;
  width: 100vw;
  top: 10px;
  & > * {
    background: #ffffff00;
  }
}

.list {
}

.footer-nav {
  position: absolute;
  width: 430px;
  height: 88px;

  bottom: 0;

  background: rgb(255, 255, 255);
}
</style>
