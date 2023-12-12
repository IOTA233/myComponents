<script lang="ts" setup>
import { ref } from 'vue'
import { exportJsonToExcel } from '@zhdgps/components'
import type { Column, ExportParams } from '@zhdgps/components'

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
const activeName = ref('first')

async function handleClick() {
  const param: ExportParams = {
    columns: [
      {
        header: 'Date',
        key: 'date',
      },
      {
        header: 'Name',
        key: 'name',
      },
      {
        header: 'State',
        key: 'state',
      },
      {
        header: 'City',
        key: 'city',
      },
      {
        header: 'Address',
        key: 'address',
      },
      {
        header: 'Zip',
        key: 'zip',
      },
    ] as Column[],
    data: tableData,
    filename: `excel` + `-${Date.UTC(2023, 12)}`,
  }
  await exportJsonToExcel(param)
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
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
