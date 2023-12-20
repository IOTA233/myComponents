<script setup lang="ts">
import { amap } from '@zhdgps/vue3-tools/utils'
import { onMounted, ref } from 'vue'

const location = ref()

onMounted(async () => {
  amap.GetIPLocation().then((data) => {
    location.value = data
  })
})
</script>

<template>
  <el-space>
    <p>{{ location }}</p>
  </el-space>
</template>
