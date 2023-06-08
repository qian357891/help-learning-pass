<template>
  <div>
    <van-icon
      name="arrow-left"
      :color="props.color"
      size="30"
      style="margin-top: 23px"
      @click="back"
    />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const back = () => {
  router.back()
}

interface Props {
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'rgb(255, 255, 255)'
})
</script>

<style scoped lang="scss"></style>
