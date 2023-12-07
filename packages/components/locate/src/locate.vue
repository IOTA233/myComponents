<script lang="ts" setup>
// import { ElButton } from 'element-plus';
import { onMounted } from 'vue'
import { ref } from 'vue'
import { locateProps } from './locate'

defineOptions({
  name: 'Locate',
})
const props = defineProps(locateProps)

onMounted(() => {

})
</script>

<template>
  <el-space>
    <el-select v-if="allowLocate" v-model="country" style="min-width: 60px" @change="handleChangeCountry">
      <el-option v-for="item in countries" :key="item.key" :value="item.key">
        {{
          item.name
        }}
      </el-option>
    </el-select>
    <el-cascader
      v-show="country === 'china'"
      v-model="code"
      :options="options"
      :disabled="disabled"
      change-on-select
      :placeholder="请选择所属地区"
      @change="onChange"
    />
    <el-input
      v-show="country !== 'china'"
      v-model="areaName"
      :placeholder="请输入所属地区"
      @change="onInputChange"
    />
  </el-space>
</template>
