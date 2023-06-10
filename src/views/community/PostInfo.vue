<template>
  <div>
    <div>
      <header>
        <TaskHeader :color="'rgb(0, 0, 0)'" :title="'社区'" :back-page="'communityIndex'" />
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { axiosGet } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import TaskHeader from '@/components/task/TaskHeader.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const communityId = route.params.communityId

const data = (
  await axiosGet(axiosConfig.rootUrl + axiosConfig.getCommunityInfo + '?communityId=' + communityId)
).data.data
console.log(data)
</script>

<style scoped lang="scss"></style>
