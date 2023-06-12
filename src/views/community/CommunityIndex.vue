<template>
  <div>
    <div class="wrap">
      <div class="main-box">
        <!-- 头部 -->
        <header>
          <div><span>关注</span></div>
          <div class="chose"><span>推荐</span></div>
          <div><span>热门</span></div>
        </header>
        <!-- 帖子 -->
        <main
          class="content-box task-info"
          v-for="postPreInfo in postPreInfoList"
          :key="postPreInfo.id"
        >
          <div>
            <div @click="toPostInfo(postPreInfo.id)">
              <div>
                <img src="@/assets/img/task-page/default-img.png" class="avatar" alt="" />
                <div>
                  <span>{{ postPreInfo.userName }}</span>
                </div>
              </div>
              <div>
                <span>{{ postPreInfo.title }}</span>
              </div>
              <div>
                <span>{{ postPreInfo.content }}</span>
              </div>
              <div>
                <img src="@/assets/img/task-page/default-img.png" class="img" alt="" />
              </div>
            </div>
            <!-- 点赞，评论,关注 -->
            <div class="postStatus">
              <div>
                <van-icon name="good-job-o" size="20" />
                <span>{{ postPreInfo.likeCount }}</span>
              </div>
              <div>
                <van-icon name="chat-o" size="20" />
                <span>{{ postPreInfo.commentCount }}</span>
              </div>
              <div>
                <van-icon name="star-o" size="20" />
                <span>{{ postPreInfo.favoriteCount }}</span>
              </div>
            </div>
          </div>
        </main>

        <!-- 底部导航 -->
        <FooterNav />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { axiosGet } from '@/axios/api'
import { axiosConfig } from '@/axios/axios.config'
import FooterNav from '@/components/nav/FooterNav.vue'
import { type PostPreInfo } from '@/axios/types/Post'
import router from '@/router'
import { ref, type Ref } from 'vue'

const postPreInfoList: Ref<Array<PostPreInfo>> = ref([])

const getPostList = async () => {
  const data = await axiosGet(axiosConfig.rootUrl + axiosConfig.getPostList)
  postPreInfoList.value = data.data.postingInfoPos
  console.log(data)
}
getPostList()

const toPostInfo = (id: number) => {
  router.push({ name: 'postInfo', params: { communityId: id } })
}
</script>

<style scoped lang="scss">
.wrap {
  background: rgb(244, 245, 247);
}

header {
  padding: 10px 0 20px 0;
  @include flex-center();
  & > div {
    margin-left: 23px;
    @include text(rgb(147, 147, 147), 16px, 400, Noto Sans SC);
  }
  .chose {
    color: rgb(0, 0, 0);
    font-size: 20px;
    transform: translate(0, 2px);
    span::after {
      content: '';
      display: block;
      height: 2px;
      width: 20px;
      background: #000; /**控制图标颜色**/
      transform: translate(50%);
    }
  }
}

main {
  margin-top: 20px;
  span {
    color: rgb(0, 0, 0) !important;
  }

  & > div > div > div {
    &:first-child {
      display: flex;
    }
    &:nth-child(2) {
      @include text('', 14px, 700, $font-family: Noto Sans SC);
    }
    &:nth-child(3) {
      @include text('', 13px, 400, $font-family: Noto Sans SC);
    }
    &:nth-child(n + 2) {
      margin-top: 5px;
    }
  }

  .avatar + div {
    margin-left: 7px;
  }
}

.avatar {
  width: 50px;
  border-radius: 10px;
}

.img {
  width: 100px;
  height: 124px;
  border-radius: 10px;
  object-fit: cover;
}
// 三连
.postStatus {
  display: flex;
  justify-content: space-between;
  margin: 28px 24px 0 24px !important;
}
</style>
