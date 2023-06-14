<template>
  <div>
    <!-- 费用总和 -->
    <div style="height: 69px"></div>
    <footer>
      <div v-if="!noPrice">
        <div style="display: flex; justify-content: end; align-items: center; margin-right: 10px">
          <span>合计</span>
          <span style="font-size: 20px">￥{{ +getCost + +reward }}</span>
        </div>
        <div style="transform: scale(0.9); transform-origin: right top; margin-right: 10px">
          <span>
            <slot />
          </span>
        </div>
      </div>

      <div
        v-if="!noBth"
        style="display: flex; width: 100vw; justify-content: end"
        :class="{ 'margin-r': noPrice }"
      >
        <van-button round color="rgb(64, 169, 255)" @click="onClick" class="btn-text">{{
          buttonText
        }}</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineProps(['getCost', 'reward', 'onClick', 'buttonText', 'noPrice', 'noBth'])
</script>

<style scoped lang="scss">
.margin-r {
  margin-right: 10px;
}

footer {
  position: fixed;
  // width: 430px;
  width: 100vw;
  height: 69px;
  bottom: 0px;
  background: rgb(255, 255, 255);
  box-shadow: 0px -2px 4px rgba(211, 211, 211, 0.2);

  justify-content: space-around;
  display: flex;
  align-items: center;

  & > div > div:last-child {
    font-family: Noto Sans SC;
    color: rgb(128, 128, 128);
    font-size: 10px;
    font-weight: 300;
  }
}

.btn-text {
  font-size: 12px;
}
</style>
