<template>
  <div>
    <div class="title">
      <Back :back-page="backPage" :color="color" />
      <span :style="{ color: color }">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from '../Back.vue'

defineProps(['title', 'backPage', 'color'])
</script>

<style scoped lang="scss">
.title {
  /* 标题文字 */
  display: flex;
  align-items: center;

  @include text(rgb(255, 255, 255), 20px);
  div {
    width: 0px;
  }

  span {
    text-align: center;
    margin-top: 18px;
    flex: auto;
  }
}
</style>
