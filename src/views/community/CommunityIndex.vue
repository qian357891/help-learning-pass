<template>
  <div>
    <div class="wrap">
      <div class="main-box">
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

main {
  span {
    color: rgb(0, 0, 0) !important;
  }
  & > div :first-child {
    display: flex;
  }
  .avatar ~ span {
  }
}

.avatar {
  width: 50px;
  border-radius: 10px;
}
</style>
