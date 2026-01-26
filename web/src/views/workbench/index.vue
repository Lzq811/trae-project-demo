<template>
  <div class="home">
    <h1>Welcome to Science Transfer Platform</h1>
    <el-button type="primary" @click="getCaptcha">Test Button</el-button>
  </div>
</template>

<script setup lang="ts">
import { reqCaptcha } from '@/api/modules/auth'

import { onMounted } from 'vue'
onMounted(() => {
  // getCaptcha()
})
const getCaptcha = async () => {
  const res = await reqCaptcha()
  console.log('0000', res)
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
</style>
