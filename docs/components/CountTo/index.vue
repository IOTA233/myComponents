<script setup>
import { onMounted, ref } from 'vue'
import { CountTo } from '@zhdgps/components'

const start = ref(9888.811)
const end = ref(9888.811)
const counter1 = ref()
const counter2 = ref()
const duration = 1000

onMounted(() => {
  setInterval(() => {
    start.value = start.value + 0.001
    end.value = end.value + 0.001
    counter1.value?.start()
  }, duration)
})

function handleStart() {
  counter2.value.start()
}
function handlePause() {
  counter2.value.pause()
}
function handleResume() {
  counter2.value.resume()
}
function handlePauseResume() {
  counter2.value.pauseResume()
}
function handleReset() {
  counter2.value.reset()
}
</script>

<template>
  <el-space direction="vertical" alignment="flex-start" class="counter-number">
    <CountTo ref="counter1" :start-val="start" :end-val="end" :decimals="3" :duration="duration" :autoplay="false" suffix=" m" />
    <CountTo ref="counter2" :start-val="0" :end-val="1.01" :decimals="2" suffix=" m" :duration="10000" :use-easing="false" />
    <el-space>
      <el-button type="default" @click="handleStart">
        开始
      </el-button>
      <el-button type="default" @click="handlePause">
        暂停
      </el-button>
      <el-button type="default" @click="handleResume">
        恢复
      </el-button>
      <el-button type="default" @click="handlePauseResume">
        暂停/恢复
      </el-button>
      <el-button type="default" @click="handleReset">
        重置
      </el-button>
    </el-space>
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
