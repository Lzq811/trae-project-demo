<template>
  <div class="c-container" :class="`c-container--${type}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * c-container (页面容器)
 * 功能: 统一页面内边距和背景色。
 */
interface Props {
  type?: 'full' | 'card' | 'ghost'
}

withDefaults(defineProps<Props>(), {
  type: 'card'
})
</script>

<style lang="less" scoped>
.c-container {
  min-height: 100%;

  &--card {
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
  }

  &--full {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &--ghost {
    background-color: transparent;
  }
}
</style>
