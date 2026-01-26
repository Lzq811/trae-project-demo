<template>
  <div class="home">
    <h1>Welcome to Science Transfer Platform</h1>
    <el-button type="primary">Test Button</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('Home mounted', import.meta.env)
})
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
</style>
