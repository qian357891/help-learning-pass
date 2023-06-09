<template>
  <div class="container">
    <van-cell-group inset>
      <van-field
        style="background: rgb(249, 249, 249)"
        v-model="value"
        @input="$emit('update:value', $event.target.value)"
        rows="4"
        type="textarea"
        placeholder="请填写详细内容"
      />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
}
</style>
