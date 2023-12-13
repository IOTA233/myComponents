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
export interface ExportParams {
  /**
   * 表头列表
   */
  columns: (Column | string)[]
  /**
   * 数据源
   */
  data: any[]
  /**
   * 文件名称
   */
  filename: string
  /**
   * 样式配置
   */
  style?: {
    /**
     * 自动列宽
     */
    autoWidth?: boolean
    /**
     * 是否填充表头
     */
    fillHeader?: boolean
    /**
     * 表头行数
     */
    headerRowCount?: number
    /**
     * 自定义样式
     */
    customStyle?: (worksheet: any) => void
  }
  merges?: MergeRange[]
}
