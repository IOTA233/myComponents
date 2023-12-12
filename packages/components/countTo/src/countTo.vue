<script setup lang="ts">
import { computed, defineProps, onMounted, onUnmounted, ref, watch } from 'vue'
import { cancelAnimationFrame, requestAnimationFrame } from '@zhdgps/utils'

// 定义组件 props
const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  endVal: {
    type: Number,
    required: false,
    default: 2017,
  },
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    },
  },
  decimal: {
    type: String,
    required: false,
    default: '.',
  },
  separator: {
    type: String,
    required: false,
    default: ',',
  },
  prefix: {
    type: String,
    required: false,
    default: '',
  },
  suffix: {
    type: String,
    required: false,
    default: '',
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  easingFn: {
    type: Function,
    /**
     * 默认的缓动函数
     * @param t 当前时间，动画执行的时间
     * @param b 起始值，动画的初始值
     * @param c 变化量，即结束值减去起始值
     * @param d 持续时间，动画的总时长
     */
    default(t: number, b: number, c: number, d: number) {
      return c * (-(2 ** (-10 * t / d)) + 1) * 1024 / 1023 + b
    },
  },
})

defineExpose({
  /**
   * 开始动画
   */
  start,
  /**
   * 暂停/恢复动画
   */
  pauseResume,
  /**
   * 暂停动画
   */
  pause,
  /**
   * 恢复动画
   */
  resume,
  /**
   * 重置动画
   */
  reset,
})

const localStartVal = ref(props.startVal)
const displayValue = ref(formatNumber(props.startVal))
const printVal = ref(0)
const paused = ref(false)
const localDuration = ref(props.duration)
const startTime = ref(null)
const remaining = ref(0)
let rAF: any = null

// 计算属性
const countDown = computed(() => props.startVal > props.endVal)

// 方法

/**
 * 开始动画
 */
function start() {
  localStartVal.value = props.startVal
  startTime.value = null
  localDuration.value = props.duration
  paused.value = false
  rAF = requestAnimationFrame(count)
}

/**
 * 暂停/恢复动画
 */
function pauseResume() {
  if (paused.value) {
    resume()
    paused.value = false
  } else {
    pause()
    paused.value = true
  }
}

/**
 * 暂停动画
 */
function pause() {
  cancelAnimationFrame(rAF)
}

/**
 * 恢复动画
 */
function resume() {
  startTime.value = null
  localDuration.value = +remaining.value
  localStartVal.value = +printVal.value
  requestAnimationFrame(count)
}

/**
 * 重置动画
 */
function reset() {
  startTime.value = null
  cancelAnimationFrame(rAF)
  displayValue.value = formatNumber(props.startVal)
}

// 数字增减动画计算
function count(timestamp: any) {
  if (!startTime.value) {
    startTime.value = timestamp
  }
  const progress = timestamp - (startTime.value || 0)
  remaining.value = localDuration.value - progress
  // 具体的数字动画逻辑
  if (props.useEasing) {
    // 使用缓动函数
    if (countDown.value) {
      printVal.value = localStartVal.value - props.easingFn(progress, 0, localStartVal.value - props.endVal, localDuration.value)
    } else {
      printVal.value = props.easingFn(progress, localStartVal.value, props.endVal - localStartVal.value, localDuration.value)
    }
  } else {
    // 线性动画
    if (countDown.value) {
      printVal.value = localStartVal.value - ((localStartVal.value - props.endVal) * (progress / localDuration.value))
    } else {
      printVal.value = localStartVal.value + (props.endVal - localStartVal.value) * (progress / localDuration.value)
    }
  }

  // 判断是否达到最终值
  if (countDown.value) {
    printVal.value = printVal.value < props.endVal ? props.endVal : printVal.value
  } else {
    printVal.value = printVal.value > props.endVal ? props.endVal : printVal.value
  }

  displayValue.value = formatNumber(printVal.value)
  // 检查是否继续执行动画或触发回调
  if (progress < localDuration.value) {
    rAF = requestAnimationFrame(count)
  }
}

// 辅助方法

// 判断是否为数字
function isNumber(val: any) {
  return !Number.isNaN(Number.parseFloat(val))
}

// 格式化数字
function formatNumber(num: any) {
  num = num.toFixed(props.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${props.separator}$2`)
    }
  }
  return props.prefix + x1 + x2 + props.suffix
}

// 生命周期钩子

// 组件挂载时开始动画
onMounted(() => {
  if (props.autoplay) {
    start()
  }
})

// 组件销毁时取消动画
onUnmounted(() => {
  cancelAnimationFrame(rAF)
})

// 监听 props 变化
watch(() => props.startVal, () => {
  if (props.autoplay) {
    start()
  }
})

watch(() => props.endVal, () => {
  if (props.autoplay) {
    start()
  }
})
</script>

<template>
  <span>
    {{ displayValue }}
  </span>
</template>
