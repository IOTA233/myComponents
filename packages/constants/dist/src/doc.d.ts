/**
 * 文档配置
 */
export interface DocOption {
    /**
     * 转换为doc的dom节点
     */
    element: string;
    /**
     * 样式字符串
     */
    styleString?: string;
    /**
     * 是否使用styleString覆盖样式
     */
    coverStyle?: boolean;
    /**
     * 页边距 {top: 1440}，1440 i.e. 2.54 cm
     */
    margins?: object;
    orientation?: 'landscape' | 'portrait';
    /**
     * 导出文件名称
     */
    filename: string;
}
