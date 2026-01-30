<template>
  <div class="c-icon-picker">
    <el-select v-model="currentVal" filterable placeholder="请选择图标">
      <template #prefix>
        <el-icon v-if="currentVal">
          <component :is="currentVal" />
        </el-icon>
      </template>
      <el-option
        v-for="icon in iconList"
        :key="icon"
        :label="icon"
        :value="icon"
      >
        <span style="float: left">
          <el-icon style="vertical-align: middle; margin-right: 5px">
            <component :is="icon" />
          </el-icon>
          {{ icon }}
        </span>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/**
 * c-icon-picker (图标选择器)
 * 功能: 用于菜单配置或系统设置中的图标选择。
 */
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const currentVal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const iconList = Object.keys(ElementPlusIconsVue)
</script>
