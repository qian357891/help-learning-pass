<template>
  <div>
    <van-icon name="arrow-left" size="30" style="margin-top: 23px" @click="back" />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const back = () => {
  router.back()
}
</script>

<style scoped lang="scss"></style>
