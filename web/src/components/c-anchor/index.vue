<template>
  <div class="c-anchor">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="c-anchor__item"
      :class="{ 'is-active': activeTarget === item.target }"
      @click="scrollTo(item.target)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * c-anchor (侧边锚点导航)
 * 功能: 对应 UI 详情/表单页左侧的悬浮导航。
 */
interface AnchorItem {
  label: string
  target: string
}

interface Props {
  items: AnchorItem[]
}

const props = defineProps<Props>()

const activeTarget = ref('')

const scrollTo = (target: string) => {
  const el = document.querySelector(target)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeTarget.value = target
  }
}

// 简单的滚动监听实现，实际可能需要节流和更复杂的逻辑
const handleScroll = () => {
  // 逻辑省略，需结合具体页面滚动容器
}

onMounted(() => {
  if (props.items.length > 0 && props.items[0]) {
    activeTarget.value = props.items[0].target
  }
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<style lang="less" scoped>
.c-anchor {
  position: fixed;
  right: 20px;
  top: 100px; // 根据 header 高度调整
  width: 150px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 99;

  &__item {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    border-left: 2px solid transparent;
    transition: all 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }

    &.is-active {
      color: var(--el-color-primary);
      border-left-color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
