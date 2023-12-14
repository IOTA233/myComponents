<script setup>
import { onMounted, ref } from 'vue'
import { CountTo } from '@zhdgps/vue3-components'

const start = ref(9888.811)
const end = ref(9888.811)
const counter = ref()
const duration = 1000

onMounted(() => {
  setInterval(() => {
    start.value = start.value + 0.001
    end.value = end.value + 0.001
    counter.value?.start()
  }, duration)
})
</script>

<template>
  <el-space direction="vertical" alignment="flex-start" class="counter-number">
    <CountTo ref="counter" :start-val="start" :end-val="end" :decimals="3" :duration="duration" :autoplay="false" suffix=" m" />
  </el-space>
</template>

<style scoped>
.counter-number {
  overflow: hidden;
  font-size: 50px;
  font-family: LcdD, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4b8088;
  line-height: 58px;
  letter-spacing: 2px;
}
</style>
