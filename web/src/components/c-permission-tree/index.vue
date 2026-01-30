<template>
  <div class="c-permission-tree">
    <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :default-checked-keys="checkedKeys"
      @check="handleCheck"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ElTree } from 'element-plus'

/**
 * c-permission-tree (权限树选择)
 * 功能: 角色管理中的权限分配树。
 */
interface Props {
  data: any[]
  modelValue: any[] // checked keys
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const treeRef = ref<InstanceType<typeof ElTree>>()
const checkedKeys = ref<any[]>([])

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(() => props.modelValue, (val) => {
  checkedKeys.value = val
}, { immediate: true })

const handleCheck = () => {
  if (treeRef.value) {
    const keys = [
      ...treeRef.value.getCheckedKeys(),
      ...treeRef.value.getHalfCheckedKeys()
    ]
    emit('update:modelValue', keys)
  }
}
</script>
