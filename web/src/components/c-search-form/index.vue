<template>
  <div class="c-search-form">
    <el-form :inline="true" :model="modelValue" class="search-form-inline">
      <el-form-item 
        v-for="item in items" 
        :key="item.prop" 
        :label="item.label"
      >
        <el-input 
          v-if="item.type === 'input'" 
          v-model="modelValue[item.prop]" 
          :placeholder="item.placeholder"
        />
        <el-select 
          v-else-if="item.type === 'select'" 
          v-model="modelValue[item.prop]" 
          :placeholder="item.placeholder"
        >
          <el-option 
            v-for="opt in item.options" 
            :key="opt.value" 
            :label="opt.label" 
            :value="opt.value" 
          />
        </el-select>
        <el-date-picker
          v-else-if="item.type === 'date'"
          v-model="modelValue[item.prop]"
          type="date"
          :placeholder="item.placeholder"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('search')">查询</el-button>
        <el-button @click="$emit('reset')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
/**
 * c-search-form (搜索表单)
 * 功能: 列表页顶部的筛选区域。
 */
interface SearchItem {
  type: 'input' | 'select' | 'date'
  label: string
  prop: string
  placeholder?: string
  options?: { label: string; value: any }[]
}

interface Props {
  modelValue: Record<string, any>
  items: SearchItem[]
}

defineProps<Props>()
defineEmits(['update:modelValue', 'search', 'reset'])
</script>

<style lang="less" scoped>
.c-search-form {
  background: #fff;
  padding: 24px 24px 0;
  margin-bottom: 16px;
  border-radius: 4px;
}
</style>
