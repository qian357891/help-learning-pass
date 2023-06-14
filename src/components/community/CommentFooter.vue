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
        <div>
          <van-icon name="good-job-o" size="20" style="font-weight: 700" />
        </div>
        <div>
          <van-icon name="star-o" size="20" style="font-weight: 700" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
footer {
  position: fixed;
  display: flex;
  width: 100vw;
  justify-content: space-between;
  // width: 430px;
  height: 69px;
  bottom: 0px;
  background: rgb(255, 255, 255);
  box-shadow: 0px -2px 4px rgba(211, 211, 211, 0.2);
  display: flex;
  align-items: center;
}

:deep(.van-cell) {
  background: rgb(242, 242, 242);
  width: 295px;
}

.post-status {
  display: flex;
  div {
    margin-right: 20px;
  }
}
</style>
