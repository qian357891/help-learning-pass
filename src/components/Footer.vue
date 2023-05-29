<template>
  <footer class="footer-text">
    <span>你是完全安全的。</span>
    <span>阅读我们的条款和条件。</span>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-text {
  /* 你是完全安全的。阅读我们的条款和条件。 */

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  bottom: 63px;
  height: 4.8%;
  opacity: 1;

  font-size: 15px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0px;

  /* 你是完全安全的。 */

  :first-child {
    color: #2c2929;
  }
  span {
    display: block;
  }

  /* 阅读我们的条款和条件。 */
  color: #42ade2;
}
</style>
