/**
 * Created by Wandergis on 2015/7/8.
 * @see https://github.com/wandergis/coordtransform
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */
/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon 经度
 * @param bd_lat 纬度
 * @returns {*[]} 火星坐标
 */
declare function bd09togcj02(bd_lon: number, bd_lat: number): any[];
/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng 经度
 * @param lat 纬度
 * @returns {*[]} 百度坐标
 */
declare function gcj02tobd09(lng: number, lat: number): any[];
/**
 * WGS84转GCj02
 * @param lng 经度
 * @param lat 纬度
 * @returns {*[]} GCj02坐标
 */
declare function wgs84togcj02(lng: number, lat: number): any[];
/**
 * GCJ02 转换为 WGS84
 * @param lng 经度
 * @param lat 纬度
 * @returns {*[]} WGS84坐标
 */
declare function gcj02towgs84(lng: number, lat: number): any[];
export { bd09togcj02, gcj02tobd09, wgs84togcj02, gcj02towgs84, };
