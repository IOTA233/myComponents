<script setup>
import { onMounted, ref } from 'vue'
import { CountTo } from '@zhdgps/vue3-tools'

const start = ref(9888.811)
const end = ref(9888.811)
const counter = ref()
const duration = 1000

onMounted(() => {
  setInterval(() => {
    start.value += 0.001
    end.value += 0.001
    counter.value?.start()
  }, duration)
})
</script>

<template>
  <el-space
    direction="vertical"
    alignment="flex-start"
    class="counter-number"
  >
    <CountTo
      ref="counter"
      :start-val="start"
      :end-val="end"
      :decimals="3"
      :duration="duration"
      :autoplay="false"
      suffix=" m"
    />
  </el-space>
</template>

<style scoped>
.counter-number {
  overflow: hidden;
  font-family: LcdD, sans-serif;
  font-size: 50px;
  line-height: 58px;
  color: #4b8088;
  text-overflow: ellipsis;
  letter-spacing: 2px;
  white-space: nowrap;
}
</style>
