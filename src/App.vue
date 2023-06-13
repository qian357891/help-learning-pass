<script setup lang="ts">
import { RouterView } from 'vue-router'
import { axiosConfig } from './axios/axios.config'
import { showDialog } from 'vant'

const socket = new WebSocket(axiosConfig.socketRoot + axiosConfig.socketUserId + '/2')
// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages

socket.addEventListener('message', function (event) {
  // console.log('Message from server ', event.data)
  // console.log(event.data)
  const msgData = JSON.parse(event.data)
  let message
  switch (msgData.operate) {
    case 'finish':
      message = '任务接收者已完成任务，请查收！'
      break
    case 'cancel':
      message = '您的任务已被接收者取消！'
      break
    case 'accept':
      message = '您的任务已被接收！'
      break
    case 'system':
      message = '任务接收者完成任务已经超过两天，系统已经默认您已经确认您的任务已经完成！'
      break
    default:
      break
  }
  showDialog({
    title: '您有新的消息！',
    message,
    theme: 'round-button'
  })
  // .then(() => {
  //   // on close
  // })
})
</script>

<template>
  <div class="">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped lang="scss"></style>
