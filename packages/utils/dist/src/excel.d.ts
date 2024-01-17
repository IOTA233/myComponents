import type { ExcelOption } from '@zhdgps/constants';
/**
 * 导出JSON到excel文件
 * @param {object} params 导出excel配置
 */
export declare function ExportJsonToExcel(params: ExcelOption): Promise<void>;
/**
 * 导出table到excel
 * @param {ExcelOption} params 导出excel配置
 */
export declare function ExportTableToExcel({ table, filename, style }: ExcelOption): Promise<void>;
/**
 * 读取excel文件
 * @param {ArrayBuffer} buffer
 */
export declare function readExcelToJson(buffer: ArrayBuffer): Promise<{
    columns: any[];
    data: any[];
}>;
