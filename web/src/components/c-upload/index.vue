<template>
  <div class="c-upload">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="limit"
      :auto-upload="false"
      :on-exceed="handleExceed"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

/**
 * c-upload (上传组件)
 * 功能: 封装文件/图片上传。
 */
interface Props {
  limit?: number
  accept?: string
  size?: number // MB
}

const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  size: 2
})

const handleExceed = () => {
  ElMessage.warning(`最多只能上传 ${props.limit} 个文件`)
}
</script>
