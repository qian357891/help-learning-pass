<template>
  <div>
    <van-cell-group inset style="margin: 0">
      <van-field
        style="padding: 0"
        v-model="value"
        @input="$emit('update:value', $event.target.value)"
        placeholder="请输入"
        input-align="right"
      />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped lang="scss"></style>
