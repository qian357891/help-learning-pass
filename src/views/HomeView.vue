<template>
  <div class="wrap">
    <img class="hero" src="../assets/img/index-img.png" alt="" />
    <div class="search">
      <van-search v-model="search" show-action placeholder="请输入你需要搜索任务">
        <template #action>
          <span>搜索</span>
        </template>
      </van-search>
    </div>

    <!-- 分类按钮 -->
    <div class="classify">
      <div class="classify-box">
        <div>
          <img src="../assets/icons/home-page/aixin.png.svg" alt="" />
          <span>代取</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/weizhi_1.png.svg" alt="" />
          <span>代办</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/ziyuan.png.svg" alt="" />
          <span>外卖</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/jiaoyisuo.png.svg" alt="" />
          <span>跳蚤</span>
        </div>
        <div>
          <img src="../assets/icons/home-page/qita.png.svg" alt="" />
          <span>其他</span>
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="list" style="height: 100vh"></div>
    <!-- 底部导航 -->
    <div class="footer-nav">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot>社区</van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5">个人</van-tabbar-item>
      </van-tabbar>
    </div>

    <van-back-top
      bottom="10vh"
      style="
        right: 0px;
        border-radius: 15px 0 0 15px;
        height: 50px;
        width: 55px;
        background-color: rgba(64, 169, 255, 0.4);
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
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
  position: fixed;
  width: 100vw;
  top: 10px;
  & > * {
    background: #ffffff00;
  }
}

// 搜索按钮
:deep(.van-search__action) {
  background-color: rgb(64, 169, 255);
  border-radius: 15px;
  color: rgb(255, 255, 255);
}

// 分类
.classify {
  position: absolute;
  width: 407px;
  height: 69px;
  top: 180px;
  left: 50%;
  transform: translate(-50%);
  box-sizing: border-box;

  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);

  border-radius: 10px;
}

.classify-box {
  display: flex;
  margin-top: 12px;
  div {
    width: 30px;
    margin-left: 53px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  :first-child {
    margin-left: 12px;
  }
  span {
    font-family: Noto Sans;
    width: 24px;
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
    margin-left: 12px;
  }
}
// 任务列表
.list {
  width: 407px;
  height: 665px;
  // box-sizing: border-box;
  margin: 12px 15px 12px 0px;

  background: rgb(255, 255, 255);
  border: 3px solid rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(217, 217, 217, 0.25);

  border-radius: 10px;
}
// 底部导航
.footer-nav {
  // position: fixed;
  // bottom: 0;
  background: rgb(255, 255, 255);
}
</style>
