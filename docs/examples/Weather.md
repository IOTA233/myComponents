# 天气组件

## 详细模式

:::preview title || component description content

demo-preview=../components/Weather/Large.vue

:::

## 简约模式

:::preview title || component description content

demo-preview=../components/Weather/Small.vue

:::

## 参数

| 参数 | 说明 | 类型 | 默认值 |
|:-|:-|:-|:-|
| amapKey | 自定义高德开发者apikey | string | '' |
| size | 尺寸 | `'large'\| 'small'` | `'large'` |

## 方法
## 根据IP获取地理信息数据

```ts
import { amap } from '@zhdgps/vue3-components/utils'
amap.GetIPLocation().then((data) => {
  console.log(data)
})
```

## 根据地址编码获取天气

```ts
import { amap } from '@zhdgps/vue3-components/utils'
amap.GetWeather('440100').then((data) => {
  console.log(data)
})
```
