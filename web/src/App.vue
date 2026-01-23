<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
  /* 基础适配策略：小于 1280px 时出现滚动条，不进行缩放挤压 */
  min-width: 1280px;
}
#app {
  width: 100%;
  height: 100vh;
}
</style>
