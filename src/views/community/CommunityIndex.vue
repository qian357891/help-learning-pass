<template>
  <div>
    <div class="wrap">
      <div class="main-box">
        <!-- 头部 -->
        <header>
          <div><span>关注</span></div>
          <div><span>推荐</span></div>
          <div><span>热门</span></div>
        </header>
        <!-- 帖子 -->
        <main class="content-box task-info">
          <div>
            <div>
              <img src="@/assets/img/task-page/default-img.png" class="avatar" alt="" />
              <div>
                <span>用户名</span>
              </div>
            </div>
            <div>
              <span>帖子标题</span>
            </div>
            <div>
              <span>帖子内容</span>
            </div>
            <div>
              <img src="@/assets/img/task-page/default-img.png" class="img" alt="" />
            </div>
            <!-- 点赞，评论,关注 -->
            <div class="postStatus">
              <div>
                <van-icon name="good-job-o" size="20" />
                <span>1000</span>
              </div>
              <div>
                <van-icon name="chat-o" size="20" />
                <span>200</span>
              </div>
              <div>
                <van-icon name="star-o" size="20" />
                <span>300</span>
              </div>
            </div>
          </div>
        </main>

        <!-- 底部导航 -->
        <FooterNav />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterNav from '@/components/nav/FooterNav.vue'
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}

header {
  margin: 10px 0 20px 0;
  @include flex-center();
  & > div {
    margin-left: 23px;

    @include text(rgb(147, 147, 147), 16px, 400, Noto Sans SC);
  }
}

main {
  span {
    color: rgb(0, 0, 0) !important;
  }

  & > div > div {
    &:first-child {
      display: flex;
    }
    &:nth-child(2) {
      @include text('', 14px, 700, $font-family: Noto Sans SC);
    }
    &:nth-child(3) {
      @include text('', 13px, 400, $font-family: Noto Sans SC);
    }
    &:nth-child(n + 2) {
      margin-top: 5px;
    }
  }

  .avatar + div {
    margin-left: 7px;
  }
}

.avatar {
  width: 50px;
  border-radius: 10px;
}

.img {
  width: 100px;
  height: 124px;
  border-radius: 10px;
  object-fit: cover;
}
// 三连
.postStatus {
  display: flex;
  justify-content: space-between;
  margin: 28px 24px 0 24px !important;
}
</style>
