<template>
  <div class="c-status-tag">
    <el-tag v-if="config.type" :type="config.type">{{ config.label }}</el-tag>
    <span v-else :style="{ color: config.color }">
      <span class="c-status-tag__dot" :style="{ backgroundColor: config.color }"></span>
      {{ config.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-status-tag (状态标签)
 * 功能: 统一管理列表页/详情页的状态展示。
 */
interface StatusConfig {
  label: string
  type?: 'success' | 'warning' | 'info' | 'primary' | 'danger'
  color?: string
}

interface Props {
  status: string | number
  map: Record<string | number, StatusConfig>
}

const props = defineProps<Props>()

const config = computed<StatusConfig>(() => {
  return props.map[props.status] || { label: '未知', type: 'info' }
})
</script>

<style lang="less" scoped>
.c-status-tag {
  display: inline-block;

  &__dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }
}
</style>
