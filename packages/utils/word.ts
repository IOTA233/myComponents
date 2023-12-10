import { saveAs } from 'file-saver'

// @see https://github.com/evidenceprime/html-docx-js
import htmlDocx from 'html-docx-js/dist/html-docx'

import { sleep } from '@/utils'

// 导出图片的格式
const IMAGE_TYPE = 'image/jpeg'
// 导出图片的质量
const IMAGE_QUALITY = 0.8

/**
 * HTML导出Docx
 * @param {string} params.element 要导出的元素选择器
 * @param {string} params.styleString 样式字符串
 * @param {object} params.margins 页边距 {top: 1440}，1440 i.e. 2.54 cm
 * @param {string} params.orientation 页面方向 portrait：竖向、landscape：横向
 * @param {string} params.filename 导出文件名称
 */
async function exportHtmlToDocx({ element, styleString, margins, orientation = 'portrait', filename = 'htmlDocx' }) {
  const html = generateContent(element)

  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${styleString ? styleString.replace(/(\s{2,}|\n)/g, '') : ''}</style>
      </head>
      <body>${html}</body>
    </html>
  `

  // htmlDocx asBlob占用CPU
  await sleep(300)

  const converted = htmlDocx.asBlob(content, { orientation, margins })

  saveAs(converted, filename)

  return Promise.resolve()
}

/**
 * 生成导出的html字符串
 * @param {string} element 要导出的元素选择器
 * @returns {string}
 */
function generateContent(element) {
  const sourceElement = document.querySelector(element)
  let cloneElement = sourceElement.cloneNode(true)

  cloneElement = convertImagesToDataUrl(cloneElement, sourceElement)
  cloneElement = convertCanvasToDataUrl(cloneElement, sourceElement)

  return cloneElement.innerHTML
}

/**
 * 转换图片地址为Data URL
 * @param {Element} cloneElement 拷贝要导出的元素
 * @param {Element} sourceElement 要导出的元素
 * @returns {Element}
 */
function convertImagesToDataUrl(cloneElement, sourceElement) {
  const sourceImages = sourceElement.querySelectorAll('img')
  const cloneImages = cloneElement.querySelectorAll('img')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  sourceImages.forEach((imgElement, index) => {
    const width = imgElement.width
    const height = imgElement.height

    // preparing canvas for drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = width
    canvas.height = height

    try {
      ctx.drawImage(imgElement, 0, 0, width, height)
      // by default toDataURL() produces png image, but you can also export to jpeg
      // checkout function's documentation for more details
      const dataURL = canvas.toDataURL(IMAGE_TYPE, IMAGE_QUALITY)
      // 替换拷贝的元素而不是源图片
      const replaceElement = cloneImages[index]
      replaceElement.setAttribute('src', dataURL)
    } catch (e) {
      console.log(e)
    }
  })
  canvas.remove()

  return cloneElement
}

/**
 * 转换canvas画布为img + Data URL
 * @param {Element} cloneElement 拷贝要导出的元素
 * @param {Element} sourceElement 要导出的元素
 * @returns {Element}
 */
function convertCanvasToDataUrl(cloneElement, sourceElement) {
  const sourceCanvas = sourceElement.querySelectorAll('canvas')
  const cloneCanvas = cloneElement.querySelectorAll('canvas')

  sourceCanvas.forEach((canvasElement, index) => {
    const dataURL = canvasElement.toDataURL(IMAGE_TYPE, IMAGE_QUALITY)
    const imgElement = document.createElement('img')
    imgElement.src = dataURL

    const replaceElement = cloneCanvas[index]
    // 把canvas元素替换成img，只适用于Echarts，parentNode.parentNode可以移除tooltip等组件
    replaceElement.parentNode.parentNode.replaceChildren(imgElement)
  })

  return cloneElement
}

export default exportHtmlToDocx
