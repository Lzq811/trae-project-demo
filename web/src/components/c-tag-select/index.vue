<template>
  <div class="c-tag-select">
    <span 
      class="c-tag-select__item" 
      :class="{ 'is-active': modelValue === '' }"
      @click="handleChange('')"
    >
      全部
    </span>
    <span 
      v-for="opt in options"
      :key="opt.value"
      class="c-tag-select__item"
      :class="{ 'is-active': modelValue === opt.value }"
      @click="handleChange(opt.value)"
    >
      {{ opt.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * c-tag-select (标签式单选)
 * 功能: 列表页顶部的快速筛选 (如: 全部/待审核/已通过)。
 */
interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: Option[]
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (val: string | number) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="less" scoped>
.c-tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  &__item {
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 2px;
    font-size: 14px;
    color: #606266;
    transition: all 0.3s;
    
    &:hover {
      color: var(--el-color-primary);
    }
    
    &.is-active {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
