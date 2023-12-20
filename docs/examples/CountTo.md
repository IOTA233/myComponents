# 数字滚动动画
基于`requestAnimationFrame`实现的数字滚动动画
## 1、实时更新

:::preview title || component description content

demo-preview=../components/CountTo/Keep.vue

:::

## 2、控制动画

:::preview title || component description content

demo-preview=../components/CountTo/Control.vue

:::

## 参数

| 参数 | 描述 | 类型 | 默认值 |
|:-|:-|:-|:-|
| startVal | 起始值 | number | 0 |
| endVal | 结束值 | number | 2023 |
| duration | 动画执行时间 | number | 3000毫秒 |
| autoplay | 是否自动播放动画 | boolean | false |
| decimals | 保留的小数位 | number | 0 |
| decimal | 小数点符号 | string | . |
| separator | 千位分隔符 | string | , |
| prefix | 前缀 | string | - |
| suffix | 后缀 | string | - |
| useEasing | 是否启用缓动动画 | boolean | true |
| easingFn | 自定义缓动动画的函数 | Function | c * (-(2 ** (-10 * t / d)) + 1) * 1024 / 1023 + b |

## 外部方法

| 名称 | 描述 | 类型 | 说明 |
|:-|:-|:-|:-|
| start | 开始动画 | Function | `() => void` |
| pause | 暂停动画 | Function | `() => void` |
| pauseResume | 暂停/恢复动画 | Function | `() => void` |
| resume | 恢复动画 | Function | `() => void` |
| reset | 重置动画 | Function | `() => void` |
