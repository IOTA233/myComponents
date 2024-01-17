import type { DocOption } from '@zhdgps/constants';
/**
 * HTML导出Docx
 * @param {string} params 要导出的Html配置
 */
export declare function ExportHtmlToDocx({ element, styleString, margins, orientation, filename, coverStyle, }: DocOption): Promise<void>;
