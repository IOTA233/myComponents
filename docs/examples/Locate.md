# 定位组件

## 1、选框模式

:::preview title || component description content

demo-preview=../components/Locate/Selector.vue

:::

## 2、点选模式

:::preview title || component description content

demo-preview=../components/Locate/Picker.vue

:::

## 3、选框+点选模式

:::preview title || component description content

demo-preview=../components/Locate/All.vue

:::

## 参数

| 参数 | 说明 | 类型 | 默认值 |
|:-|:-|:-|:-|
| amapKey | 自定义高德开发者apikey | string | '' |
| type | 类型 | `'selsctor'\| 'picker'\| 'default'` | `'default'` |
| coordinates | 经纬度 | Array | [] |
| cityCode | 行政编码 | Array | [] |
| cityName | 城市名称 | string | - |
| address | 详细地址 | String | - |
| abroad | 是否支持选择海外地区 | boolean | false |
| disabled | 是否禁用 | boolean | false |

## 方法
## 地址描述信息 转换成 地理坐标（经纬度）

```ts
import { amap } from '@zhdgps/vue3-components/utils'
amap.GetGeocode('北京市朝阳区阜荣街10号').then((data) => {
  console.log(data)
})
```

## 地理坐标（经纬度） 转换成 地址描述信息

```ts
import { amap } from '@zhdgps/vue3-components/utils'
amap.GetReGeocode('116.473083,39.993252').then((data) => {
  console.log(data)
})
```
