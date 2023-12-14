<script setup lang="ts">
import { amap } from '@zhdgps/vue3-components/utils'
import { onMounted, ref } from 'vue'

const weather = ref()

onMounted(async () => {
  amap.GetWeather('440100').then((data) => {
    weather.value = data
  })
})
</script>

<template>
  <el-space>
    <p>{{ weather }}</p>
  </el-space>
</template>
