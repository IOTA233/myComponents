<script lang="ts" setup>
import { ref } from 'vue'
import { excel } from '@zhdgps/vue3-tools/utils'
import type { Column, ExcelOption } from '@zhdgps/vue3-tools/types'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Jason',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const activeName = ref('first')

async function handleClick() {
  const param: ExcelOption = {
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
        header: 'Address',
        key: 'address',
      },
    ] as Column[],
    data: tableData,
    filename: `excel` + `-${Date.UTC(2023, 12)}`,
  }
  await excel.ExportJsonToExcel(param)
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
    <el-tab-pane label="JSON" name="first">
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
