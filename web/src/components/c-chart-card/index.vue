<template>
  <div class="c-chart-card">
    <el-card>
      <template #header>
        <div class="c-chart-card__header">
          <span class="c-chart-card__title">{{ title }}</span>
          <div class="c-chart-card__filter">
            <slot name="filter" />
          </div>
        </div>
      </template>
      <div class="c-chart-card__body" v-loading="loading">
        <!-- 这里应当集成 ECharts，简化起见先放一个 slot -->
        <slot />
        <c-empty v-if="empty" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CEmpty from '../c-empty/index.vue'

/**
 * c-chart-card (图表卡片)
 * 功能: 封装 ECharts 及外层 Card 结构。
 */
interface Props {
  title?: string
  loading?: boolean
  empty?: boolean
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.c-chart-card {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__title {
    font-weight: bold;
    font-size: 16px;
  }
  
  &__body {
    min-height: 300px;
  }
}
</style>
