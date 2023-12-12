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

export interface ExportParams {
  columns: (Column | string)[]
  data: any[]
  filename: string
  style?: {
    autoWidth?: boolean // 自动列宽
    fillHeader?: boolean // 是否填充表头
    headerRowCount?: number // 表头行数
    customStyle?: (worksheet: any) => void
  }
  merges?: MergeRange[]
}
