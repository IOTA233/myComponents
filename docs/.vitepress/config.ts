import container from 'markdown-it-container'
import { defineConfig } from 'vitepress'
import { renderSandbox } from 'vitepress-plugin-sandpack'

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
          { text: 'Locate', link: '/examples/Locate' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, 'sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox')
          },
        })
        .use(container, 'my-sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'my-sandbox')
          },
        })
    },
  },
})
