<script setup lang="ts">
import { amap } from '@zhdgps/components/utils'
import { onMounted, ref } from 'vue'

const location = ref()

onMounted(async () => {
  amap.GetReGeocode('116.473083,39.993252').then((data) => {
    location.value = data
  })
})
</script>

<template>
  <el-space>
    <p>{{ location }}</p>
  </el-space>
</template>
