/**
 * 地理信息
 */
export interface GeoCode {
    /**
     * 经纬度，使用逗号分隔
     */
    location?: string;
    /**
     * 行政编码
     */
    adcode?: string;
    /**
     * 详细地址
     */
    formatted_address?: string;
}
