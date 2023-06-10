<template>
  <div>
    <div class="title">
      <Back :back-page="backPage" />
      <span>{{ props.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from '../Back.vue'

const props = defineProps(['title', 'backPage'])
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
