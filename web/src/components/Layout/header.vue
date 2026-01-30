<template>
  <el-header>
    <div class="header-content">
      <div class="logo">{{ $t('header.title') }}</div>
      <div class="lang-switch">
        <el-select v-model="currentLocale" size="small" @change="handleChange">
          <el-option label="简体中文" value="zh-CN" />
          <el-option label="繁體中文" value="zh-TW" />
          <el-option label="English" value="en-US" />
        </el-select>
      </div>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()
const currentLocale = ref<string>(locale.value as string)

const handleChange = (val: string) => {
  setLocale(val as 'zh-CN' | 'zh-TW' | 'en-US')
}

watch(
  locale,
  (val) => {
    currentLocale.value = val as string
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
}
.logo {
  font-size: 20px;
  font-weight: bold;
}
.lang-switch {
  display: flex;
  align-items: center;
}
</style>
