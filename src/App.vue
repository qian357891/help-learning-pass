<script setup lang="ts">
import { RouterView } from 'vue-router'
import { axiosConfig } from './axios/axios.config'

const socket = new WebSocket(axiosConfig.socketRoot + axiosConfig.socketUserId + '/1')
// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
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
