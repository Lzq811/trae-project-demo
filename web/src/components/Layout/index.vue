<script setup lang="ts">
import Header from './header.vue'
import Menus from './menus.vue'
</script>
<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menus />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less" scoped></style>
