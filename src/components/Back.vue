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
  router.push({ name: props.backPage })
}

interface Props {
  color?: string
  backPage: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'rgb(255, 255, 255)',
  backPage: ''
})
</script>

<style scoped lang="scss"></style>
