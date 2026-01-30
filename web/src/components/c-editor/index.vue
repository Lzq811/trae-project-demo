<template>
  <div class="c-editor">
    <!-- 简易占位，实际需集成 wangEditor 或 quill -->
    <el-input 
      v-model="content" 
      type="textarea" 
      :rows="10" 
      placeholder="请输入内容 (此处应为富文本编辑器)" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-editor (富文本编辑器)
 * 功能: 封装第三方富文本编辑器。
 */
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const content = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
