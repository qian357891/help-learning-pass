<template>
  <div>
    <!-- 费用总和 -->
    <div style="height: 69px"></div>
    <footer>
      <div>
        <van-cell-group inset>
          <van-field placeholder="请文明发言" />
        </van-cell-group>
      </div>
      <div class="post-status">
        <van-icon name="good-job-o" size="20" style="font-weight: 700" />
      </div>
      <div>
        <van-icon name="star-o" size="20" style="font-weight: 700" />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
footer {
  position: fixed;
  width: 430px;
  height: 69px;
  bottom: 0px;
  background: rgb(255, 255, 255);
  box-shadow: 0px -2px 4px rgba(211, 211, 211, 0.2);
  display: flex;
  align-items: center;

  & > div > div:last-child {
    font-family: Noto Sans SC;
    color: rgb(128, 128, 128);
    font-size: 10px;
    font-weight: 300;
  }
}

:deep(.van-cell) {
  background: rgb(242, 242, 242);
  width: 295px;
}

.post-status {
  margin: 0 20px 0 10px;
}
</style>
