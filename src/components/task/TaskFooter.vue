<template>
  <div>
    <!-- 费用总和 -->
    <div style="height: 69px"></div>
    <footer>
      <div>
        <div>
          <span>合计</span>
          <span>￥{{ +getCost + +reward }}</span>
        </div>
        <div>
          <span>
            <slot />
          </span>
        </div>
      </div>

      <div>
        <van-button round color="rgb(64, 169, 255)" @click="onClick">{{ buttonText }}</van-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineProps(['getCost', 'reward', 'onClick', 'buttonText'])
</script>

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
</style>
