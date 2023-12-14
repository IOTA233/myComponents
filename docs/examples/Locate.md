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
## 4、接口：地址描述信息 转换成 地理坐标（经纬度）

:::preview title || component description content

demo-preview=../components/Locate/GetCoordinate.vue

:::
## 5、接口：地理坐标（经纬度） 转换成 地址描述信息

:::preview title || component description content

demo-preview=../components/Locate/GetAddress.vue

:::

## 配置参数（Attributes）

| 参数 | 说明 | 类型 | 默认值 |
|:-|:-|:-|:-|
| type | 类型 | `'selsctor'\| 'picker'\| 'default'` | `'default'` |
| coordinates | 经纬度 | Array | [] |
| cityCode | 行政编码 | Array | [] |
| cityName | 城市名称 | string | - |
| address | 详细地址 | String | - |
| abroad | 是否支持选择海外地区 | boolean | false |
| disabled | 是否禁用 | boolean | false |
