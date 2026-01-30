<template>
  <el-empty :description="description" :image="image" />
</template>

<script setup lang="ts">
/**
 * c-empty (无数据)
 * 功能: 数据为空时的占位展示。
 */
interface Props {
  description?: string
  image?: string
}

withDefaults(defineProps<Props>(), {
  description: '暂无数据'
})
</script>
