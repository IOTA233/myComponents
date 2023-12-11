import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '前端组件CBB',
  description: 'Vue3 中基于Element-plus二次封装基础组件文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '目录', link: '/examples/安装指南' },
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: '安装指南', link: '/examples/安装指南' },
          { text: 'Locate 定位', link: '/examples/Locate' },
          { text: 'Weather 天气', link: '/examples/Weather' },
          { text: 'Html2Word 转换html', link: '/examples/Html2Word' },
          { text: 'OutputExcel 导出excel', link: '/examples/Weather' },
          { text: 'DigtalAnimate 数字动画', link: '/examples/Weather' },
          { text: 'DigtalAnimate 卫星数据', link: '/examples/Weather' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
