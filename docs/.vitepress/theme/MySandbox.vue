<!-- MySandbox.vue -->
<script setup lang="ts">
import { Sandbox, sandboxProps } from 'vitepress-plugin-sandpack';

const props = defineProps(sandboxProps)
</script>

<template>
  <!-- 'code-options' is a build-in prop, do not edit it -->
  <Sandbox
    :rtl="rtl"
    :template="template"
    :light-theme="lightTheme"
    :dark-theme="darkTheme"
    :options="{
      ...props, // do not forget it
      showLineNumbers: true,
    }"
    :custom-setup="{
      ...props, // do not forget it
      deps: { 'element-plus': 'latest',
              'vue3-toastify': 'latest' },
    }"
    :code-options="codeOptions"
  >
    <slot />
  </Sandbox>
</template>
