/**
 * @description 表头配置
 */
export interface Column {
  /**
   * @description 表头文本
   */
  header: string
  /**
   * @description 表头健
   */
  key: string
  $note?: string
  $dataValidation?: any
}
/**
 * @description 合并行，行列下标从0开始 [{ start: { r: 开始行, c: 开始列 }, end: { r: 结束行, c: 结束列 }}]
 */
export interface MergeRange {
  start: { r: number, c: number }
  end: { r: number, c: number }
}

/**
 * @description 导出excel配置
 */
export interface ExcelOption {
  /**
   * @description 表格元素
   */
  table?: HTMLElement
  /**
   * @description 表头列表
   */
  columns: (Column | string)[]
  /**
   * @description 数据源
   */
  data: any[]
  /**
   * @description 文件名称
   */
  filename: string
  /**
   * @description 样式配置
   */
  style?: ExcelStyle
  merges?: MergeRange[]
}
/**
 * @description excel的样式配置
 */
export interface ExcelStyle {
  /**
   * @description 自动列宽
   */
  autoWidth: boolean
  /**
   * @description 填充表头
   */
  fillHeader: boolean
  /**
   * @description 表头行数（多级表头时，以此确定表头的分级行数）
   */
  headerRowCount: number
  /**
   * @description 自定义样式
   */
  customStyle?: (worksheet: any) => void
}
