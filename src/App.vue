<script setup lang="ts">
import { RouterView } from 'vue-router'
import { axiosConfig } from './axios/axios.config'
import { showDialog } from 'vant'

const socket = new WebSocket(axiosConfig.socketRoot + axiosConfig.socketUserId + '/1')
// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  // console.log('Message from server ', event.data)
  const data = event.data
  let title
  switch (data) {
    case 'finish':
      title = data
      break
    case 'cancel':
      title = data
      break
    case 'accept':
      title = data

      break
    case '您的订单已完成':
      title = data
      break
    default:
      break
  }
  showDialog({
    title,
    message: '代码是写出来给人看的，附带能在机器上运行。',
    theme: 'round-button'
  }).then(() => {
    // on close
  })
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
