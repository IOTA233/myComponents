import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

      dts: path.resolve(__dirname, 'typings', 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(__dirname, 'typings', 'components.d.ts'),
    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  build: {
    // 打包后文件目录
    outDir: 'lib',
    // 压缩
    minify: false,
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      // input: ["index.ts"],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: 'dist',
      },
    },
    lib: {
      entry: './index.ts',
      name: 'vue3-components',
      fileName: 'vue3-components',
      formats: ['es', 'umd', 'cjs'],
    },
  },
})
