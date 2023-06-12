<template>
  <div>
    <div>
      <header>
        <TaskHeader :color="'rgb(0, 0, 0)'" :title="'社区'" :back-page="'communityIndex'" />
      </header>
      <main class="post-main-content">
        <!-- 头 -->
        <div>
          <div>
            <img src="@/assets/img/task-page/default-img.png" alt="" />
          </div>
          <div>
            <span>{{ postInfo?.userName }}</span>
          </div>
        </div>
        <!-- 详细 -->
        <div>
          <span>{{ postInfo?.title }}</span>
        </div>
        <div>
          <span>{{ postInfo?.content }}</span>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { axiosGet } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import TaskHeader from '@/components/task/TaskHeader.vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { type PostingDetail } from '@/axios/types/Post'
import { ref } from 'vue'

const route = useRoute()
const communityId = route.params.communityId

const postInfo: Ref<PostingDetail | undefined> = ref()
const getPostInfo = async () => {
  const data = await axiosGet(
    axiosConfig.rootUrl + axiosConfig.getPostingDetailById + '?communityId=' + communityId
  )
  postInfo.value = data.data.postingDetail
  // console.log(data)
}
getPostInfo()
</script>

<style scoped lang="scss"></style>
