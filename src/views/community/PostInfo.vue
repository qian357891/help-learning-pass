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
      <van-divider />
      <div>
        <!-- 点赞，评论,关注 -->
        <div class="postStatus">
          <div>
            <van-icon name="good-job-o" size="30" />
            <span>{{ postInfo?.likeCount }}</span>
          </div>
          <div>
            <van-icon name="star-o" size="30" />
            <span>{{ postInfo?.favoriteCount }}</span>
          </div>
        </div>
      </div>
      <!-- 评论区 -->
      <div style="margin-top: 40px">
        <div v-for="comment in postInfo?.comments" :key="comment.id" class="post-main-content">
          <div>
            <VanImage
              width="50"
              height="50"
              src="/src/assets/img/task-page/default-img.png"
              alt=""
            />
            <span>{{ comment.userId }}</span>
          </div>
          <div class="comment-content">
            <span>{{ comment.content }}</span>
          </div>
          <div class="time">
            <span>{{ processingTime(comment.createTime) }}</span>
          </div>
          <div class="comment-area">
            <div v-for="childComment in comment.children" :key="childComment.id">
              <span>{{ childComment.userId }}：{{ childComment.content }}</span>
            </div>
          </div>
          <van-divider />
        </div>
      </div>
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
import { processingTime } from '@/util/operateStr'

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

<style scoped lang="scss">
.postStatus {
  display: flex;
  justify-content: space-around;
  margin: 0 20px;
}
.comment-content span {
  @include text('', 14px, 400);
}
.time span {
  color: rgb(163, 163, 163);
}

.comment-area {
  display: flex;
  flex-direction: column;
  & > div {
    background-color: rgb(246, 246, 246);
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
  }
  span {
    @include text('', 14px, 400);
  }
}
</style>
