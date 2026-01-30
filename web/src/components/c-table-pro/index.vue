<template>
  <div class="c-table-pro">
    <div class="c-table-pro__toolbar" v-if="$slots.toolbar">
      <slot name="toolbar" />
    </div>
    <el-table 
      v-loading="loading" 
      :data="data" 
      style="width: 100%"
      border
    >
      <slot />
    </el-table>
    <div class="c-table-pro__pagination" v-if="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * c-table-pro (高级表格)
 * 功能: 封装表格+分页+工具栏。
 */
interface Props {
  data: any[]
  loading?: boolean
  pagination?: boolean
  total?: number
  page?: number
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: true,
  total: 0,
  page: 1,
  limit: 10
})

const emit = defineEmits(['update:page', 'update:limit', 'change'])

const currentPage = computed({
  get: () => props.page,
  set: (val) => emit('update:page', val)
})

const pageSize = computed({
  get: () => props.limit,
  set: (val) => emit('update:limit', val)
})

const handleSizeChange = (val: number) => {
  emit('change')
}

const handleCurrentChange = (val: number) => {
  emit('change')
}
</script>

<style lang="less" scoped>
.c-table-pro {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  
  &__toolbar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
