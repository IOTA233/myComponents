<script lang="ts" setup>
// import { ElButton } from 'element-plus';
import { pcaOptions } from '@zhdgps/utils'
import { onMounted, ref } from 'vue'
import { AddLocation } from '@element-plus/icons-vue'
import pickCoordinate from './pickCoordinate.vue'

defineOptions({
  name: 'Locate',
})

defineProps({
  type: {
    type: String,
    values: ['selsctor', 'picker', 'all'] as const,
    default: 'selector',
  },
  // 坐标，[经度, 纬度]
  coordinates: {
    type: Array<number>,
    default: () => [],
  },
  cityCode: {
    type: Array,
    default: () => [],
  },
  cityName: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  /**
   * 是否支持选择海外地区
   */
  abroad: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:cityCode', 'update:cityName', 'update:address', 'update:coordinate', 'change'])

const country = ref('china')
const code = ref<string[] | undefined>([])
const areaName = ref('')
const visible = ref(true)
const cascader = ref()

const countries = [
  {
    name: '中国',
    key: 'china',
  },
  {
    name: '其他',
    key: 'others',
  },
]

onMounted(() => {

})

function handleChangeCountry() {
  code.value = undefined
  areaName.value = ''
  emits('update:cityCode', [])
  emits('update:cityName', '')
}
function onChange(value: any) {
  const nodes = cascader.value.getCheckedNodes()
  let labels = []
  if (!value?.length || !nodes?.length) {
    emits('change', [], [])
  } else {
    labels = nodes[0].pathLabels || []
    emits('change', value, nodes)
  }
  emits('update:cityCode', value || [])
  emits('update:cityName', labels.join('/'))
}
function onInputChange() {
  if (!areaName.value.length) {
    emits('change', '', [])
  } else {
    emits('change', areaName.value, [{ label: areaName.value }])
  }
  emits('update:cityCode', ['others'])
  emits('update:cityName', areaName.value || '')
}

function handlePick(cords: any) {
  const {
    address,
    district,
    districtCode,
    coordinate,
  } = cords
  code.value = districtCode
  emits('update:address', address)
  emits('update:coordinate', coordinate)
  emits('update:cityCode', districtCode)
  emits('update:cityName', district)
}
</script>

<template>
  <div>
    <el-space v-if="type === 'all' || type === 'selector'">
      <template v-if="abroad">
        <el-select v-model="country" style="min-width: 60px" :filterable="true" @change="handleChangeCountry">
          <el-option v-for="({ key, name }) in countries" :key="key" :value="key" :label="name">
            {{ name }}
          </el-option>
        </el-select>
      </template>
      <div v-show="country === 'china'">
        <el-cascader
          ref="cascader"
          v-model="code"
          :options="pcaOptions"
          :disabled="disabled"
          change-on-select
          placeholder="请选择所属地区"
          @change="onChange"
        />
      </div>

      <el-input
        v-show="country !== 'china'"
        v-model="areaName"
        placeholder="请输入所属地区"
        @change="onInputChange"
      />

      <el-tooltip
        v-if="type === 'all'"
        class="box-item"
        effect="dark"
        content="定位"
        placement="top-start"
      >
        <el-button type="default" :icon="AddLocation" @click="visible = !visible" />
      </el-tooltip>
    </el-space>
    <div>
      <slot name="address" />
    </div>
    <pickCoordinate v-if="type !== 'selector'" v-show="visible" style="margin-top: 6px" :coordinates="coordinates" @pickChange="handlePick" />
  </div>
</template>
