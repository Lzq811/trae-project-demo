<template>
  <el-config-provider :locale="epLocale">
    <Layout />
  </el-config-provider>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout/index.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'

const { locale } = useI18n()
const epLocale = computed(() => {
  if (locale.value === 'zh-CN') return zhCn
  if (locale.value === 'zh-TW') return zhTw
  return en
})
</script>
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
