<template>
  <div class="outtest-box">这是首页</div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'

console.log(useStore().token)
</script>

<style scoped lang="scss"></style>
