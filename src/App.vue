<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped lang="scss"></style>
