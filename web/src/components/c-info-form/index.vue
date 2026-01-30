<template>
  <div class="c-info-form">
    <el-form 
      ref="formRef" 
      :model="modelValue" 
      :rules="rules" 
      :label-width="labelWidth"
      :disabled="readonly"
    >
      <slot />
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

/**
 * c-info-form (信息录入表单)
 * 功能: 详情页/编辑页的基础表单容器。
 */
interface Props {
  modelValue: Record<string, any>
  rules?: FormRules
  labelWidth?: string
  readonly?: boolean
}

withDefaults(defineProps<Props>(), {
  labelWidth: '120px',
  readonly: false
})

const formRef = ref<FormInstance>()

const validate = () => {
  return formRef.value?.validate()
}

defineExpose({
  validate,
  formRef
})
</script>
