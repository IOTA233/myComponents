<script lang="ts" setup>
import { ref } from 'vue'

import { exportHtmlToDocx } from '@zhdgps/components'

const activeName = ref('first')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
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
        <el-table :data="tableData" style="width: 100%" height="250">
          <el-table-column fixed prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="state" label="State" />
          <el-table-column prop="city" label="City" />
          <el-table-column prop="address" label="Address" />
          <el-table-column prop="zip" label="Zip" />
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
}
</style>
