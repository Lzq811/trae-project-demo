<template>
  <div class="c-table-tabs">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane 
        v-for="tab in tabs" 
        :key="tab.name" 
        :label="tab.label" 
        :name="tab.name"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-table-tabs (列表Tab切换)
 * 功能: 列表页顶部的状态切换 Tab。
 */
interface TabItem {
  label: string
  name: string
}

interface Props {
  modelValue: string
  tabs: TabItem[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClick = () => {
  emit('change', activeTab.value)
}
</script>

<style lang="less" scoped>
.c-table-tabs {
  background: #fff;
  padding: 6px 24px 0;
  margin-bottom: 16px;
  border-radius: 4px;
  
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
}
</style>
