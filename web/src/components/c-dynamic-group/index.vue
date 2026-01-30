<template>
  <div class="c-dynamic-group">
    <div 
      v-for="(item, index) in list" 
      :key="index" 
      class="c-dynamic-group__item"
    >
      <slot :item="item" :index="index" />
      <el-button 
        type="danger" 
        circle 
        :icon="Delete" 
        @click="handleRemove(index)"
        v-if="!readonly"
      />
    </div>
    <el-button 
      type="primary" 
      plain 
      style="width: 100%" 
      @click="handleAdd"
      v-if="!readonly"
    >
      + 添加
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'

/**
 * c-dynamic-group (动态增减组)
 * 功能: 类似工作经历、家庭成员等可动态添加的表单组。
 */
interface Props {
  list: any[]
  defaultItem?: any
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultItem: () => ({}),
  readonly: false
})

const emit = defineEmits(['update:list'])

const handleAdd = () => {
  const newList = [...props.list, { ...props.defaultItem }]
  emit('update:list', newList)
}

const handleRemove = (index: number) => {
  const newList = [...props.list]
  newList.splice(index, 1)
  emit('update:list', newList)
}
</script>

<style lang="less" scoped>
.c-dynamic-group {
  &__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 10px;
    
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
}
</style>
