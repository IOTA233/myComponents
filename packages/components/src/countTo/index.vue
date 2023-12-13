<script setup lang="ts">
import { computed, defineProps, onMounted, onUnmounted, ref, watch } from 'vue'
import { cancelAnimationFrame, requestAnimationFrame } from '@zhdgps/utils'

// 定义组件 props
const props = defineProps({
  /**
   * @description 起始值
   */
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * @description 结束值
   */
  endVal: {
    type: Number,
    required: false,
    default: 2023,
  },
  /**
   * @description 动画执行时间（单位：毫秒）
   */
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  /**
   * @description 是否自动播放动画
   */
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * @description 保留的小数位
   */
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    },
  },
  /**
   * @description 小数点符号
   */
  decimal: {
    type: String,
    required: false,
    default: '.',
  },
  /**
   * @description 千位分隔符
   */
  separator: {
    type: String,
    required: false,
    default: ',',
  },
  /**
   * @description 前缀
   */
  prefix: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * @description 后缀
   */
  suffix: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * @description 是否启用缓动动画
   */
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * @description 自定义缓动动画的函数
   */
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
   * @description 开始动画
   */
  start,
  /**
   * @description 暂停/恢复动画
   */
  pauseResume,
  /**
   * @description 暂停动画
   */
  pause,
  /**
   * @description 恢复动画
   */
  resume,
  /**
   * @description 重置动画
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

const countDown = computed(() => props.startVal > props.endVal)

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

function isNumber(val: any) {
  return !Number.isNaN(Number.parseFloat(val))
}

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

onMounted(() => {
  // 组件挂载时开始动画
  if (props.autoplay) {
    start()
  }
})

// 组件销毁时取消动画
onUnmounted(() => {
  cancelAnimationFrame(rAF)
})

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
