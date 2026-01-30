<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <div class="c-drawer__body" v-loading="loading">
      <slot />
    </div>
    <template #footer v-if="$slots.footer">
      <div class="c-drawer__footer">
        <slot name="footer" />
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-drawer (抽屉封装)
 * 功能: 侧边滑出的详情/表单容器。
 */
interface Props {
  modelValue: boolean
  title?: string
  size?: string | number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: '30%',
  loading: false
})

const emit = defineEmits(['update:modelValue', 'close'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
  emit('close')
}
</script>

<style lang="less" scoped>
.c-drawer {
  &__body {
    padding: 20px;
    height: calc(100% - 60px); // 减去 footer 高度
    overflow-y: auto;
  }
  
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }
}
</style>
