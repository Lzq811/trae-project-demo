<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :before-close="handleClose"
  >
    <div class="c-dialog__body">
      <slot />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-dialog (弹窗封装)
 * 功能: 统一弹窗样式。
 */
interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  confirmLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '50%',
  confirmLoading: false
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>
