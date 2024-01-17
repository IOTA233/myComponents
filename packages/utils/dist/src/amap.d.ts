/**
 * 根据IP获取定位信息
 * @param {string} key 开发这apikey
 */
export declare function GetIPLocation(key?: string): Promise<any>;
/**
 * 根据城市编码获取实况天气
 * @param {string} adcode 行政编码
 * @param {string} extensions 气象类型 base:返回实况天气、all:返回预报天气
 * @param {string} key 开发这apikey
 */
export declare function GetWeather(adcode: string, extensions?: string, key?: string): Promise<any>;
/**
 * 获取地理编码
 * @param {string} address 位置地址
 * @param {string} key 开发这apikey
 */
export declare function GetGeocode(address: string, key?: string): Promise<any>;
/**
 * 获取逆地理编码
 * @param {string} location 坐标
 * @param {string} key 开发这apikey
 */
export declare function GetReGeocode(location: string, key?: string): Promise<any>;
