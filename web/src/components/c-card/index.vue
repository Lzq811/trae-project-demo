<template>
  <div class="c-card">
    <div class="c-card__header" v-if="title || $slots.extra">
      <div class="c-card__title">{{ title }}</div>
      <div class="c-card__extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="c-card__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * c-card (卡片组件)
 * 功能: 用于通过白色卡片包裹内容块。
 */
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.c-card {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  transition: .3s;
  
  &__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }
  
  &__body {
    padding: 20px;
  }
}
</style>
