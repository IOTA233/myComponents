// @link https://github.com/exceljs/exceljs
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

/**
 * 导出JSON到excel文件
 * @param {object} param
 */
export function exportJsonToExcel({
  columns, // 表头
  data, // 数据
  filename, // 导出excel文件名称
  style = {},
  merges = [], // 合并行，行列下标从0开始 [{ start: { r: 开始行, c: 开始列 }, end: { r: 结束行, c: 结束列 }}]
} = {}) {
  style = {
    ...{
      autoWidth: true, // 自动列宽
      fillHeader: true, // 是否填充表头
      headerRowCount: 1, // 表头行数
    },
    ...style,
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')

  // 设置工作簿属性，默认列宽
  if (!style.autoWidth) {
    worksheet.properties.defaultColWidth = 15
  }

  if (typeof columns[0] !== 'object') {
    columns = columns.map((item) => {
      return {
        header: item,
        key: item,
      }
    })
  }
  worksheet.columns = columns
  worksheet.addRows(data)

  // 合并行
  merges.forEach(({ start, end }) => {
    // 按开始行，开始列，结束行，结束列合并
    worksheet.mergeCells(start.r + 1, start.c + 1, end.r + 1, end.c + 1)
  })

  setProp(worksheet, columns, workbook)

  // 设置样式
  setStyle(worksheet, style)

  // 添加回调处理
  return writeFile(workbook, filename)
}

/**
 * 设置单元格属性，如注释、数据校验
 */
function setProp(worksheet, columns, workbook) {
  const header = worksheet.getRow(1)
  const newSheet = workbook.addWorksheet('Sheet2')

  columns.forEach((item, index) => {
    const headerCell = header.getCell(item.key)
    // 单元格注释
    if (item.$note) {
      headerCell.note = item.$note
    }

    const column = worksheet.getColumn(item.key)
    // 数据校验
    if (item.$dataValidation) {
      column.eachCell((cell, rowNumber) => {
        if (rowNumber !== 1) {
          const { longLen, formulae, ...rest } = item.$dataValidation
          if (longLen) {
            const newCol = newSheet.getColumn(index)
            newCol.values = formulae.split(',')

            const col = newCol.letter // 第几列
            const { rowCount } = newCol._worksheet // 最后一行
            cell.dataValidation = { ...rest, formulae: [`Sheet2!$${col}$1:$${col}$${rowCount}`] } // Sheet2!$F$1:$F$20
          } else {
            cell.dataValidation = item.$dataValidation
          }
        }
      })
    }
  })
}

/**
 * 设置样式
 * @param {object} worksheet 工作簿
 * @param {boolean} fillHeader 是否填充表头
 * @param {number} headerRowCount 表头的行数
 * @param {boolean} autoWidth 是否自动调整列宽
 */
function setStyle(worksheet, { fillHeader, headerRowCount, autoWidth, customStyle }) {
  worksheet.eachRow((row, rowNumber) => {
    // 对齐：垂直、水平居中
    row.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    if (autoWidth && rowNumber === 1) {
      // 设置列宽
      row.eachCell((cell, colNumber) => {
        const column = worksheet.getColumn(colNumber)
        column.width = calcWidth(column.values)
      })
    }

    if (fillHeader && rowNumber <= headerRowCount) {
      row.eachCell((cell) => {
        // 填充
        cell.font = {
          color: { argb: 'FFFFFFFF' },
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF999999' },
        }
        // 边框
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFD5D5D5' } },
          left: { style: 'thin', color: { argb: 'FFD5D5D5' } },
          bottom: { style: 'thin', color: { argb: 'FFD5D5D5' } },
          right: { style: 'thin', color: { argb: 'FFD5D5D5' } },
        }
      })
    }
  })

  typeof customStyle === 'function' && customStyle(worksheet)
}

/**
 * 计算列单元格最大宽度
 * @param {Array} data 列的所有数据
 * @returns {number}
 */
function calcWidth(data) {
  let maxWidth = 0
  data.forEach((val) => {
    const temp = val ? countWord(val.toString()) : 0

    if (maxWidth < temp) {
      maxWidth = temp
    }
  })
  return maxWidth
}

/**
 * 计算字符数
 * @param {string} str
 * @returns {number}
 */
function countWord(str) {
  let intLength = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255) {
      intLength += 2.2
    } else {
      intLength += 1.4
    }
  }
  return intLength
}

/**
 * 导出table到excel
 * @param {Element} table
 * @param {string} filename
 */
export function exportTableToExcel({ table, filename, style }) {
  const [out, ranges] = generateArray(table)

  return exportJsonToExcel({
    columns: [], // 表头
    data: out,
    merges: ranges,
    style,
    filename,
  })
}

/**
 * 读取table元素数据
 * @param {Element} table
 * @returns {Array} [数据，合并单元格]
 */
function generateArray(table) {
  const out = []
  const rows = table.querySelectorAll('tr')
  const ranges = []
  for (let R = 0; R < rows.length; ++R) {
    const outRow = []
    const row = rows[R]
    const columns = row.querySelectorAll('th, td')
    for (let C = 0; C < columns.length; ++C) {
      const cell = columns[C]
      let colspan = cell.getAttribute('colspan')
      let rowspan = cell.getAttribute('rowspan')
      let cellValue = cell.innerText
      if (cellValue !== '' && cellValue == +cellValue) {
        cellValue = +cellValue
      }

      // Skip ranges
      ranges.forEach(({ start, end }) => {
        if (R >= start.r && R <= end.r && outRow.length >= start.c && outRow.length <= end.c) {
          for (let i = 0; i <= end.c - start.c; ++i) outRow.push(null)
        }
      })

      // Handle Row Span
      if (rowspan || colspan) {
        rowspan = +rowspan || 1
        colspan = +colspan || 1
        ranges.push({
          start: {
            r: R,
            c: outRow.length,
          },
          end: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1,
          },
        })
      }

      // Handle Value
      outRow.push(cellValue !== '' ? cellValue : null)

      // Handle Colspan
      if (colspan) {
        outRow.push(...Array(colspan - 1).fill(null))
      }
    }
    out.push(outRow)
  }
  return [out, ranges]
}

/**
 * 保存文件
 * @param {object} workbook ExcelJS 工作表实例
 * @param {string} filename 文件名
 */
async function writeFile(workbook, filename = 'excel-js') {
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(
    new Blob([buffer], {
      type: 'application/octet-stream',
    }),
    `${filename}.xlsx`,
  )
}

/**
 * 读取excel文件
 * @param {ArrayBuffer} buffer
 */
export async function readExcelToJson(buffer) {
  let columns = []
  const data = []

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  const worksheet = workbook.getWorksheet(1) // 获取第一个worksheet
  worksheet.eachRow((row, rowNumber) => {
    const rowValues = row.values
    rowValues.shift()
    if (rowNumber === 1) {
      columns = rowValues
    } else {
      const sheetToJson = {}
      rowValues.forEach((item, index) => {
        sheetToJson[columns[index]] = item
      })
      data.push(sheetToJson)
    }
  })

  return { columns, data }
}

/**
 * 读取干滩长度曲线excel文件
 * @param {ArrayBuffer} buffer
 */
export async function readDryBeachExcelToJson(buffer) {
  let columns = []
  const data = []
  let height = 0 // 滩顶高程
  let columnsDryBeach = '' // 滩顶高程表头名称
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  const worksheet = workbook.getWorksheet(1) // 获取第一个worksheet
  worksheet.eachRow((row, rowNumber) => {
    const rowValues = row.values
    rowValues.shift()
    if (rowNumber === 1) {
      height = rowValues[1] || 0
      columnsDryBeach = rowValues[0]
    } else if (rowNumber === 2) {
      columns = [...rowValues, columnsDryBeach]
    } else {
      const sheetToJson = {}
      rowNumber = [...rowValues, height]
      rowNumber.forEach((item, index) => {
        sheetToJson[columns[index]] = item
      })
      data.push(sheetToJson)
    }
  })

  return { columns, data }
}
