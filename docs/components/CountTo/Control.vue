<script setup>
import { ref } from 'vue'
import { CountTo } from '@zhdgps/vue3-components'

const counter = ref()

function handleStart() {
  counter.value.start()
}
function handlePause() {
  counter.value.pause()
}
function handleResume() {
  counter.value.resume()
}
function handlePauseResume() {
  counter.value.pauseResume()
}
function handleReset() {
  counter.value.reset()
}
</script>

<template>
  <el-space direction="vertical" alignment="flex-start" class="counter-number">
    <CountTo ref="counter" :start-val="0" :end-val="1.01" :decimals="2" suffix=" m" :duration="5000" :use-easing="false" />
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
