<template>
  <div class="c-import-excel">
    <el-upload
      class="upload-demo"
      drag
      action="#"
      :auto-upload="false"
      :on-change="handleChange"
      :limit="1"
      accept=".xlsx, .xls"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 xlsx/xls 文件，且不超过 5MB
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'

/**
 * c-import-excel (Excel导入)
 * 功能: 封装 Excel 文件解析逻辑。
 */
const emit = defineEmits(['success'])

const handleChange = (file: UploadFile) => {
  if (!file.raw) return
  // 这里可以添加 xlsx 解析逻辑
  // 简化演示直接返回 file 对象
  emit('success', file.raw)
  ElMessage.success('文件已选择')
}
</script>
