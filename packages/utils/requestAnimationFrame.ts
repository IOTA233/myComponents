let lastTime: number = 0 // 记录上一次执行动画的时间戳

// 浏览器前缀数组
const prefixes: string[] = 'webkit moz ms o'.split(' ')

let requestFrame: ((callback: FrameRequestCallback) => number) | undefined
let cancelFrame: ((handle: number) => void) | undefined

const isServer: boolean = typeof window === 'undefined' // 检查是否在服务器端执行代码

if (isServer) {
  // 如果在服务器端，将 requestFrame 和 cancelFrame 设置为空函数
  requestFrame = function () {
    return 0
  }
  cancelFrame = function () { }
} else {
  requestFrame = window.requestAnimationFrame
  cancelFrame = window.cancelAnimationFrame

  let prefix: string | undefined

  // 通过循环检查各浏览器前缀，获取 requestFrame 和 cancelFrame 的实现方式
  for (let i = 0; i < prefixes.length; i++) {
    if (requestFrame && cancelFrame) {
      break
    }
    prefix = prefixes[i]
    requestFrame = window[`${prefix}RequestAnimationFrame` as keyof typeof window]
    cancelFrame = window[`${prefix}CancelAnimationFrame` as keyof typeof window] || window[`${prefix}CancelRequestAnimationFrame` as keyof typeof window]
  }

  // 如果当前浏览器不支持 requestFrame 和 cancelAnimationFrame，则回退到使用 setTimeout
  if (!requestFrame || !cancelFrame) {
    requestFrame = function (callback: FrameRequestCallback): number {
      const currTime: number = new Date().getTime()
      // 为了使 setTimeout 尽可能接近每秒 60 帧的效果
      const timeToCall: number = Math.max(0, 16 - (currTime - lastTime))
      const id: number = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

    cancelFrame = function (id: number): void {
      window.clearTimeout(id)
    }
  }
}
const requestAnimationFrame = requestFrame
const cancelAnimationFrame = cancelFrame
// 导出 requestFrame 和 cancelFrame
export { requestAnimationFrame, cancelAnimationFrame }
