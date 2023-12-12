<script lang="ts" setup>
import { ref } from 'vue'

import { exportHtmlToDocx } from '@zhdgps/components'

const activeName = ref('first')

async function handleClick() {
  await exportHtmlToDocx({
    element: '#node',
    styleString: ``,
    filename: 'locate',
  })
}
</script>

<template>
  <el-tabs
    v-model="activeName"
    editable class="demo-tabs vp-raw" type="card"
    @edit="handleClick"
  >
    <template #addIcon>
      <el-icon><Download /></el-icon>
    </template>
    <el-tab-pane label="HTML" name="first">
      <div id="node">
        <Weather size="large" />
      </div>
      <!-- <Locate id="node" v-model:city-code="cityCode" v-model:address="address" type="all">
        <template #address>
          <div v-show="address" style="padding-top: 6px">
            <span>详细地址：{{ address }}</span>
          </div>
        </template>
      </Locate> -->
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
}
</style>
