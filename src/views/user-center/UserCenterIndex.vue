<template>
  <div class="wrap">
    <header>
      <div>
        <div @click="login">
          <img src="@/assets/img/task-page/default-img.png" alt="" />
        </div>
        <div class="header-text">
          <span>测试用户1</span>
          <span>这是你使用帮帮的第1天</span>
        </div>
      </div>
    </header>
    <div class="box">
      <main>
        <div class="the-box">
          <div>
            <span>帮帮社区</span>
          </div>
          <div class="postStatus">
            <div>
              <van-icon name="good-job" size="35" color="rgb(147, 200, 251)" />
              <span>点赞</span>
            </div>
            <div>
              <van-icon name="chat" size="35" color="rgb(147, 200, 251)" />
              <span>评论</span>
            </div>
            <div>
              <van-icon name="star" size="35" color="rgb(147, 200, 251)" />
              <span>收藏</span>
            </div>
            <div>
              <van-icon name="star" size="35" color="rgb(147, 200, 251)" />
              <span>收藏</span>
            </div>
          </div>
        </div>
        <div class="the-box">
          <div>
            <span>帮帮任务</span>
            <div class="postStatus">
              <div>
                <van-icon name="add" size="35" color="rgb(147, 200, 251)" />
                <span>发布</span>
              </div>
              <div>
                <van-icon name="checked" size="35" color="rgb(147, 200, 251)" />
                <span>接收</span>
              </div>
              <div>
                <van-icon name="todo-list" size="35" color="rgb(147, 200, 251)" />
                <span>任务中心</span>
              </div>
            </div>
          </div>
        </div>
        <div class="the-box" style="padding: 0">
          <van-cell title="账号与安全" is-link />
          <van-cell title="主题" is-link />
          <van-cell title="消息通知" is-link />
          <van-cell title="隐私设置" is-link />
          <van-cell title="关于帮帮" is-link />
          <van-cell title="版本更新" is-link />
          <van-cell title="退出登录" is-link @click="logout" />
        </div>
      </main>
    </div>
    <FooterNav />
  </div>
</template>

<script setup lang="ts">
import FooterNav from '@/components/nav/FooterNav.vue'
import router from '@/router'
const login = () => {
  router.push({ name: 'login' })
}

const logout = () => {}
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}

.box {
  transform: translate(0, -37px);
  main > div:nth-child(n + 2) {
    margin-top: 10px;
  }
}

header {
  height: 196px;
  background: rgb(147, 200, 251);
  border-radius: 0px 0px 15px 15px;
  & > div {
    display: flex;
    padding: 42px 0 0 22px;
    align-items: center;
  }
  .header-text {
    margin-left: 15px;
    @include text(rgb(255, 255, 255), 20px, 400, Alibaba-PuHuiTi);
    span {
      display: block;
    }
    span:nth-of-type(2) {
      font-size: 10px;
    }
  }
}

.the-box {
  & > div > span {
    display: block;
    margin-bottom: 18px;
  }
}

.postStatus {
  display: flex;
  justify-content: space-between;
  margin: 0 25px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:nth-child(n + 2) {
      margin-left: 58px;
    }
  }
}

img {
  width: 80px;
  border-radius: 100%;
}

main {
  &:nth-child(2n + 1) {
    margin-top: 10px;
  }
}
</style>
