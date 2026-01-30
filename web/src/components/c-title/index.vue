<template>
  <div class="c-title">
    <div class="c-title__main">
      <span class="c-title__line"></span>
      <span class="c-title__text">
        <slot>{{ title }}</slot>
      </span>
      <span class="c-title__desc" v-if="$slots.desc || desc">
        <slot name="desc">{{ desc }}</slot>
      </span>
    </div>
    <div class="c-title__extra" v-if="$slots.extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * c-title (标题组件)
 * 功能: 对应 UI 详情页/表单页中的分块标题。
 */
interface Props {
  title?: string
  desc?: string
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.c-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  &__main {
    display: flex;
    align-items: center;
  }
  
  &__line {
    width: 4px;
    height: 16px;
    background-color: var(--el-color-primary);
    margin-right: 8px;
    border-radius: 2px;
  }
  
  &__text {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }
  
  &__desc {
    margin-left: 12px;
    font-size: 14px;
    color: #909399;
    font-weight: normal;
  }
}
</style>
