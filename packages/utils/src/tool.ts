/**
 * setTimeout
 * @param {number} time 等待睡眠时间
 */
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
