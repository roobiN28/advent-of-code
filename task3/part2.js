import LineByLineReader from 'n-readlines'
import { containNumber, extractOnlyNumber, isNumber } from '../util.js'
import { createDebugTable } from '../console.js'

const broadbandLines = new LineByLineReader('task3/input.txt')
let counter = 0

let engine = []
let debug = createDebugTable()

let line, iRow
while (line = broadbandLines.next()) {
  line = line.toString('ascii')
  engine.push(line)
  debug.push('.'.repeat(line.length))
}

function isGear (element) {
  return element === '*'
}

function findNumber (row, index) {
  let numberEnd = index + 1
  while (numberEnd < row.length && isNumber(row[numberEnd])) {
    numberEnd++
  }

  let numberStart = index - 1
  while (numberStart > 0 && isNumber(row[numberStart])) {
    numberStart--
  }

  return Number(extractOnlyNumber(
    row.slice(numberStart <= 0 ? 0 : numberStart, numberEnd + 1)))
}

function findNumberStartEnd (row, index) {
  let numberEnd = index + 1
  while (numberEnd < row.length && isNumber(row[numberEnd])) {
    numberEnd++
  }

  let numberStart = index - 1
  while (numberStart > 0 && isNumber(row[numberStart])) {
    numberStart--
  }

  return [numberStart <= 0 ? 0 : numberStart + 1, numberEnd - 1]
}

function sliceWithBuffer (row, iStart, iEnd) {
  const start = iStart > 0 ? iStart - 1 : 0
  const end = iEnd < row.length ? iEnd + 1 : iEnd
  return row.slice(start, end)
}

function findNumberColumn (row, index) {
  if (isNumber(row[index])) {
    return index
  } else if (index !== 0 && isNumber(row[index - 1])) {
    return index - 1
  } else if (index !== row.length && isNumber(row[index + 1])) {
    return index + 1
  }
}

function isEdgeCaseWithTwoInline (index, row) {
  return index > 0 && index < row.length && row[index] ===
    '.' && isNumber(row[index - 1]) &&
    isNumber(row[index + 1])
}

export function main () {
  for (iRow = 0; iRow < engine.length; iRow++) {
    const row = engine[iRow]
    for (let iColumn = 0; iColumn < row.length; iColumn++) {
      const element = row[iColumn]
      if (isGear(element)) {
        debug.replaceElementInString(iRow, iColumn)
        let adjustToPartNumber = 0
        let gearRatio = 1

        if (iColumn > 0 && isNumber(row[iColumn - 1])) {
          const number = findNumber(row, iColumn - 1)
          adjustToPartNumber++
          gearRatio *= number
          const a = findNumberStartEnd(row, iColumn - 1)
          debug.replaceElementInString(iRow, a[0], a[1], 'm')
        }

        if (iColumn < (row.length - 1) && isNumber(row[iColumn + 1])) {
          const number = findNumber(row, iColumn + 1)
          adjustToPartNumber++
          gearRatio *= number
          const a = findNumberStartEnd(row, iColumn + 1)
          debug.replaceElementInString(iRow, a[0], a[1], 'b')
        }

        const topRow = engine[iRow - 1]
        if (iRow > 0 &&
          containNumber(sliceWithBuffer(topRow, iColumn, iColumn + 1))) {
          if (iColumn > 0 && iColumn < topRow.length && topRow[iColumn] === '.' &&
            isNumber(topRow[iColumn - 1]) && isNumber(topRow[iColumn + 1])) {
            adjustToPartNumber += 2
            gearRatio *= findNumber(topRow, iColumn - 1)
            gearRatio *= findNumber(topRow, iColumn + 1)
            const a = findNumberStartEnd(topRow, iColumn - 1)
            debug.replaceElementInString(iRow - 1, a[0], a[1], 'r')
            const b = findNumberStartEnd(topRow, iColumn + 1)
            debug.replaceElementInString(iRow - 1, b[0], b[1], 'r')
          } else {
            const numberColumn = findNumberColumn(topRow, iColumn)
            const number = findNumber(topRow, numberColumn)
            adjustToPartNumber++
            gearRatio *= number

            const a = findNumberStartEnd(topRow, numberColumn)
            debug.replaceElementInString(iRow - 1, a[0], a[1], 'c')
          }
        }

        const bottomRow = engine[iRow + 1]
        if (iRow < engine.length - 1 &&
          containNumber(sliceWithBuffer(bottomRow, iColumn, iColumn + 1))) {
          // special case
          if (isEdgeCaseWithTwoInline(iColumn, bottomRow)) {
            adjustToPartNumber += 2
            gearRatio *= findNumber(bottomRow, iColumn - 1)
            gearRatio *= findNumber(bottomRow, iColumn + 1)

            const a = findNumberStartEnd(bottomRow, iColumn - 1)
            debug.replaceElementInString(iRow + 1, a[0], a[1], 'r')
            const b = findNumberStartEnd(bottomRow, iColumn + 1)
            debug.replaceElementInString(iRow + 1, b[0], b[1], 'r')
          } else {
            const numberColumn = findNumberColumn(bottomRow, iColumn)
            const number = findNumber(bottomRow, numberColumn)
            adjustToPartNumber++
            gearRatio *= number

            const a = findNumberStartEnd(bottomRow, numberColumn)
            debug.replaceElementInString(iRow + 1, a[0], a[1], 'y')
          }
        }

        if (adjustToPartNumber === 2) {
          counter += gearRatio
        }
      }
    }
  }

  // debug.show(engine)

  return counter
}