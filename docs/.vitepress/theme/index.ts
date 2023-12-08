import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 基于element-plus二次封装基础组件
import zhdComponents from '@zhdgps/components'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    // 全局注册基础组件
    ctx.app.use(zhdComponents)

    ctx.app.component('demo-preview', ElementPlusContainer)
  },
}
