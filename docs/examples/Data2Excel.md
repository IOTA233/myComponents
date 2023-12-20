# Excel文档操作

## 1、列表数据转换为excel

:::preview title || component description content

demo-preview=../components/Data2Excel/TransJson.vue
:::

## 2、复杂表格转换为excel

:::preview title || component description content

demo-preview=../components/Data2Excel/TransTable.vue

:::

## ExportJsonToExcel
```ts
import { excel } from '@zhdgps/vue3-tools/utils'
import type { Column, ExcelOption } from '@zhdgps/vue3-tools/types'

excel.ExportJsonToExcel(param)
```

## ExportTableToExcel
```ts
import { excel } from '@zhdgps/vue3-tools/utils'
import type { Column, ExcelOption } from '@zhdgps/vue3-tools/types'

excel.ExportJsonToExcel(param)
```

## 类型声明

```ts
/**
 * 表头配置
 */
export interface Column {
  /**
   * 表头文本
   */
  header: string
  /**
   * 表头健
   */
  key: string
  $note?: string
  $dataValidation?: any
}
/**
 * 合并行，行列下标从0开始 [{ start: { r: 开始行, c: 开始列 }, end: { r: 结束行, c: 结束列 }}]
 */
export interface MergeRange {
  start: { r: number, c: number }
  end: { r: number, c: number }
}

/**
 * 导出excel配置
 */
export interface ExcelOption {
  /**
   * 表格元素
   */
  table?: HTMLElement
  /**
   * 表头列表
   */
  columns?: (Column | string)[]
  /**
   * 数据源
   */
  data?: any[]
  /**
   * 文件名称
   */
  filename: string
  /**
   * 样式配置
   */
  style?: ExcelStyle
  merges?: MergeRange[]
}
/**
 * excel的样式配置
 */
export interface ExcelStyle {
  /**
   * 自动列宽
   */
  autoWidth?: boolean
  /**
   * 填充表头
   */
  fillHeader?: boolean
  /**
   * 表头行数（多级表头时，以此确定表头的分级行数）
   */
  headerRowCount?: number
  /**
   * 自定义样式
   */
  customStyle?: (worksheet: any) => void
}
```
