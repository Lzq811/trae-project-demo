<template>
  <c-dialog
    v-model="visible"
    title="审核"
    width="500px"
    :confirm-loading="loading"
    @confirm="handleConfirm"
    @cancel="resetForm"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="审核结果" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item 
        label="驳回原因" 
        prop="reason" 
        v-if="form.status === 0"
      >
        <el-input 
          v-model="form.reason" 
          type="textarea" 
          :rows="3" 
          placeholder="请输入驳回原因" 
        />
      </el-form-item>
    </el-form>
  </c-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import CDialog from '../c-dialog/index.vue'

/**
 * c-audit-dialog (审核/驳回弹窗)
 * 功能: 专门用于审核流程的弹窗。
 */
interface Props {
  modelValue: boolean
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref<FormInstance>()
const form = reactive({
  status: 1,
  reason: ''
})

const rules = reactive<FormRules>({
  status: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
  reason: [{ required: true, message: '请输入驳回原因', trigger: 'blur' }]
})

const handleConfirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('confirm', { ...form })
    }
  })
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  form.status = 1
  form.reason = ''
}

// 监听弹窗关闭时重置
watch(visible, (val) => {
  if (!val) resetForm()
})
</script>
