<template>
  <div class="c-detail-desc">
    <el-descriptions :title="title" :column="column" border>
      <el-descriptions-item 
        v-for="item in items" 
        :key="item.label" 
        :label="item.label"
        :span="item.span || 1"
      >
        {{ data[item.prop] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
/**
 * c-detail-desc (详情描述)
 * 功能: 详情页的信息展示块。
 */
interface DescItem {
  label: string
  prop: string
  span?: number
}

interface Props {
  title?: string
  column?: number
  data: Record<string, any>
  items: DescItem[]
}

withDefaults(defineProps<Props>(), {
  column: 2
})
</script>
