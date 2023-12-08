import axios from 'axios'
import { amapKey } from '@zhdgps/constants'

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
