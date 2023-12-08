import axios from 'axios'
import { amapKey } from '@zhdgps/constants'

/**
 * 根据IP获取定位信息
 */
export async function GetIPLocation() {
  const res = await axios({
    url: 'https://restapi.amap.com/v3/ip',
    method: 'get',
    params: {
      key: amapKey,
    },
  })
  return res.data || {}
}

/**
 * 根据城市编码获取实况天气
 * @param {string} adcode 行政编码
 * @param {string} extensions 气象类型 base:返回实况天气、all:返回预报天气
 */
export async function GetWeather(adcode: string, extensions: string = 'base') {
  const res = await axios({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    method: 'get',
    params: {
      extensions,
      city: adcode.padEnd(6, '0'),
      key: amapKey,
    },
  })
  return res.data || {}
}

/**
 * 获取地理编码
 * @param {string} address 位置地址
 */
export async function GetGeocode(address: string) {
  const res = await axios({
    url: 'https://restapi.amap.com/v3/geocode/geo',
    method: 'get',
    params: {
      address,
      key: amapKey,
    },
  })
  return res.data || {}
}

/**
 * 获取逆地理编码
 * @param {string} location 坐标
 */
export async function GetReGeocode(location: string) {
  const res = await axios({
    url: 'https://restapi.amap.com/v3/geocode/regeo',
    method: 'get',
    params: {
      location,
      key: amapKey,
    },
  })
  return res.data || {}
}
