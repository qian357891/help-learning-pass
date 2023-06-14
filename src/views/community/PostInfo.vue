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
            <!-- <img src="@/assets/img/task-page/default-img.png" alt="" /> -->
            <VanImage :src="postInfo?.headerUrl" :alt="postInfo?.userName" />
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
      <van-divider :hairline="false" />
      <div>
        <!-- 点赞，评论,关注 -->
        <div class="postStatus">
          <div>
            <van-icon name="good-job-o" size="20" style="font-weight: 700" />
            <span>{{ postInfo?.likeCount }}</span>
          </div>
          <div>
            <van-icon name="star-o" size="20" style="font-weight: 700" />
            <span>{{ postInfo?.favoriteCount }}</span>
          </div>
        </div>
      </div>
      <!-- 评论区 -->
      <div style="margin-top: 40px">
        <div class="post-main-content">
          <template v-for="comment in postInfo?.comments" :key="comment.id">
            <div class="comment-box" v-if="comment.parentId == 0">
              <div>
                <VanImage
                  width="50"
                  height="50"
                  round
                  :src="comment.headUrl"
                  :alt="postInfo?.userName"
                />
              </div>
              <div class="comment-main">
                <div>
                  <span>{{ comment.userName }}</span>
                </div>
                <div class="comment-content">
                  <span>{{ comment.content }}</span>
                </div>
                <div class="time">
                  <span>{{ processingTime(comment.createTime) }}</span>
                </div>
                <div class="comment-area">
                  <div v-for="childComment in comment.children" :key="childComment.id">
                    <span>{{ childComment.userName }}：{{ childComment.content }}</span>
                  </div>
                </div>
                <van-divider :hairline="false" />
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- 添加评论 -->
      <div style="height: 10px">
        <footer>
          <CommentFooter />
        </footer>
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
import CommentFooter from '@/components/community/CommentFooter.vue'

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
  & > div > *:last-child {
    margin-left: 5px;
  }
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

.comment-box {
  display: flex;
}
.comment-main {
  flex: 1;
  & > div:first-of-type {
    margin-top: 20px;
  }
  & > div:nth-of-type(n + 2) {
    margin-top: 5px;
  }
}
</style>
