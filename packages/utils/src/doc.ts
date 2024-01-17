import { saveAs } from 'file-saver'

// @see https://github.com/caiyexiang/html-docx-js-typescript
import { asBlob } from 'html-docx-js-typescript'

import type { DocOption } from '@zhdgps/constants'
import { sleep } from './tool'

// 导出图片的格式
const IMAGE_TYPE = 'image/jpeg'
// 导出图片的质量
const IMAGE_QUALITY = 0.8

/**
 * HTML导出Docx
 * @param {string} params 要导出的Html配置
 */
export async function ExportHtmlToDocx({
  element, styleString = '', margins, orientation = 'portrait', filename = 'htmlDocx', coverStyle = false,
}: DocOption) {
  const html = generateContent(element)

  // 获取指定节点的ID
  const targetNode: HTMLElement | null = document.querySelector(element)
  if (targetNode == null) {
    return Promise.resolve()
  }
  // 如果使用自定义样式
  // 1. coverStyle == false, 将自定义样式与原有样式合并
  // 2. coverStyle == true, 使用自定义样式覆盖原有样式
  let style = `${getClassAndStylesFromNode(targetNode)} ${styleString}`
  style = coverStyle ? styleString : style
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${style ? style.replace(/(\s{2,}|\n)/g, '') : ''}</style>
      </head>
      <body>${html}</body>
    </html>
  `

  // htmlDocx asBlob占用CPU
  await sleep(300)
  asBlob(content, { orientation, margins }).then((data) => {
    saveAs(data as Blob, filename)
  })

  return Promise.resolve()
}

/**
 * 生成导出的html字符串
 * @param {string} element 要导出的元素选择器
 * @returns {string}
 */
function generateContent(element: any): string {
  const sourceElement = document.querySelector(element)
  let cloneElement = sourceElement.cloneNode(true)

  cloneElement = convertImagesToDataUrl(cloneElement, sourceElement)
  cloneElement = convertCanvasToDataUrl(cloneElement, sourceElement)

  return cloneElement.innerHTML
}

/**
 * 递归函数，获取节点及其子节点的类名和样式
 * @param node 获取节点及其子节点的类名和样式
 * @returns 样式
 */
function getClassAndStylesFromNode(node: HTMLElement): string {
  if (node) {
    // 获取节点及其子节点的所有 class
    const classes: string[] = [...node.classList]
    const elements = node.querySelectorAll('*')
    elements.forEach((element) => {
      const { classList } = element
      classList.forEach((className) => {
        if (!classes.includes(className)) {
          classes.push(className)
        }
      })
    })

    // 获取 class 的样式配置
    const styles: string[] = []
    const { styleSheets } = document
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i] as CSSStyleSheet
      const rules = styleSheet.cssRules
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j] as CSSStyleRule
        if (rule.selectorText && classes.some((cls) => rule.selectorText.includes(`.${cls}`))) {
          styles.push(`${rule.selectorText.replace(/(\[.*\])/, '')} {
            ${rule.style.cssText}
          }`)
        }
      }
    }

    return styles.join('\n')
  }

  return ''
}

/**
 * 转换图片地址为Data URL
 * @param {Element} cloneElement 拷贝要导出的元素
 * @param {Element} sourceElement 要导出的元素
 * @returns {Element}
 */
function convertImagesToDataUrl(cloneElement: any, sourceElement: any) {
  const sourceImages = sourceElement.querySelectorAll('img')
  const cloneImages = cloneElement.querySelectorAll('img')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  sourceImages.forEach((imgElement: any, index: number) => {
    const { width } = imgElement
    const { height } = imgElement

    // preparing canvas for drawing
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = width
    canvas.height = height

    try {
      ctx?.drawImage(imgElement, 0, 0, width, height)
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
function convertCanvasToDataUrl(cloneElement: any, sourceElement: any) {
  const sourceCanvas = sourceElement.querySelectorAll('canvas')
  const cloneCanvas = cloneElement.querySelectorAll('canvas')

  sourceCanvas.forEach((canvasElement: any, index: number) => {
    const dataURL = canvasElement.toDataURL(IMAGE_TYPE, IMAGE_QUALITY)
    const imgElement = document.createElement('img')
    imgElement.src = dataURL

    const replaceElement = cloneCanvas[index]
    // 把canvas元素替换成img，只适用于Echarts，parentNode.parentNode可以移除tooltip等组件
    replaceElement.parentNode.parentNode.replaceChildren(imgElement)
  })

  return cloneElement
}
