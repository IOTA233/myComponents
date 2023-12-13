<script lang="ts" setup>
import { ref } from 'vue'
import { excel } from '@zhdgps/components/utils'
import type { Column, ExcelOption } from '@zhdgps/components'

const table = ref(null)

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
]
const activeName = ref('first')

async function handleClick() {
  const param: ExcelOption = {
    table: (table.value as any).$el,
    filename: `excel` + `-${Date.UTC(2023, 12)}`,
    style: { headerRowCount: 3 },
  }
  await excel.TransTableToExcel(param)
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
    <el-tab-pane label="Table" name="first">
      <el-table ref="table" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column label="Delivery Info">
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column label="Address Info">
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip" width="120" />
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
