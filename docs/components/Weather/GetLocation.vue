<script setup lang="ts">
import { amap } from '@zhdgps/components/utils'
import { onMounted, ref } from 'vue'

const location = ref(null)

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
