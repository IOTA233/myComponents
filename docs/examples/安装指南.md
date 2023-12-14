## 快速上手

::: tip 提示

@zhdgps/vue3-components 基于 vue3 + ts + Element-plus 二次封装的基础组件

:::

## 安装

```bash:no-line-numbers
npm install @zhdgps/vue3-components -S
# pnpm add @zhdgps/vue3-components -S
# yarn add @zhdgps/vue3-components -S
```

## 使用

```js
// main.ts
import ZHDComponents from '@zhdgps/vue3-components'
import '@zhdgps/vue3-components/lib/style.css'
const app = createApp(App)
app.use(ZHDComponents)
app.mount('#app')
```

## vue3-components组件 Volar 类型提示

<!-- ```json
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions: {
  "types": [
      "@zhdgps/vue3-components/components.d.ts",
    ],
}
``` -->

## 示例
```vue
// locate.vue
<script setup>
import { ref } from 'vue'

const cityCode = ref([])
const address = ref('')
</script>

<template>
  <div>
    <Locate v-model:city-code="cityCode" v-model:address="address" type="all">
      <template #address>
        <div v-show="address" style="padding-top: 6px">
          <span>详细地址：{{ address }}</span>
        </div>
      </template>
    </Locate>
  </div>
</template>
```

## docs文档结构目录
```
├─ docs
│  ├─ .vitepress                 # vitepress配置文件
│  │  ├─ config.ts               # vitepress配置
│  │  └─ theme                   # 主题配置
│  ├─ components                 # 示例vue文件
│  ├─ examples                   # 示例md文件
│  ├─ index.md                   # 主页
```
## 组件结构目录
```
packages
│  ├─ assets                     # 资源
│  │  ├─ fonts                  # 字体包
│  │  ├─ img                  # 图片
│  │  ├─ json                  # json数据
│  ├─ components                  # 组件
│  │  ├─ countTo                  # 数字动画
│  │  ├─ locate                  # 定位组件
│  │  ├─ vite.config.ts                  # vite配置
│  │  └─ weather                  # 气候组件
│  ├─ constants                  # 常量配置
│  └─ utils                  # 通用工具
│     
```
