<script lang="ts" setup>
import { ref } from 'vue'

import { doc } from '@zhdgps/vue3-tools/utils'
import type { DocOption } from '@zhdgps/vue3-tools/types'

const activeName = ref('first')

async function handleClick() {
  await doc.ExportHtmlToDocx({
    element: '#node',
    styleString: ``,
    filename: 'locate',
  } as DocOption)
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
        <div class="preview-content">
          <p class="main__title">
            XX简报
          </p>
          <div class="main__subtitle-container">
            <table class="main__subtitle-table">
              <tr>
                <td class="main__subtitle--left">
                  2023年12月13日
                </td>
                <td class="main__subtitle--right">
                  XXXX
                </td>
              </tr>
            </table>
          </div>

          <h1>一、水库水情</h1>
          <p class="para--indent">
            <span>
              今日xx工程水库水位-小时报-接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
              今日xx工程水库水位-小时报-非接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
            </span>
          </p>
          <h1>二、库区雨量</h1>

          <p class="para--indent">
            <span>
              今日xx工程水库水位-小时报-接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
              今日xx工程水库水位-小时报-非接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
            </span>
          </p>
          <h1>三、大坝安全</h1>
          <h2>3.1 渗压</h2>

          <p class="para--indent">
            <span>
              今日xx工程水库水位-小时报-接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
              今日xx工程水库水位-小时报-非接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
            </span>
          </p>
          <h2>3.2 渗流</h2>
          <p class="para--indent">
            <span>
              今日xx工程水库水位-小时报-接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
              今日xx工程水库水位-小时报-非接触式站08时水位--m，08时库容--万m³；昨日20时水位--m，20时库容--万m³；昨日08时至今日08时日均库水位--m，日均库容--万m³。
            </span>
          </p>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.preview-content {
  h1 { font-size:16pt; }
  h2 { font-size:15pt; }
  p{ font-size:10pt; }

  table {
    width:100%;
    text-align:center;
    border-collapse:cllapse;
    border-spacing:0;
  }

  table td,table th {
    padding:2pt 6pt;font-size:10pt;
  }
  table th{white-space:nowrap;}

  overflow: hidden;
  margin: 0 auto;
  padding: 25.4mm 31.7mm;
  width: 228mm;
  font-family: SimSun, sans-serif;
  color: #000000;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  page-break-after: always;

  &-wrapper {
    height: calc(100% - 48px);

    .ant-spin-container {
      overflow: auto;
      padding: 5mm 0;
    }
  }
}

.main__title {
  font-size: 24pt;
  font-weight: 700;
  text-align: center;
  line-height: 1.3;
}

.main__subtitle {
  &-container {
    margin-bottom: 24px;
  }

  &-table {
    border: 0;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;
    border-spacing: 0;
  }

  &--left {
    border:1px solid #ffffff;
    border-bottom: 3px solid red;
    font-size:16pt;text-align: left
  }

  &--right {
    border:1px solid #ffffff;
    border-bottom: 3px solid red;
    font-size:16pt;text-align: right
  }
}

.para--indent {
  font-size: 12pt;
  text-indent: 2em;
}
</style>
