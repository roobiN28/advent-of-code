import LineByLineReader from 'n-readlines'
import { isNumber } from '../util.js'

const broadbandLines = new LineByLineReader('task3/input.txt')
let counter = 0
let engine = []
let line
while (line = broadbandLines.next()) {
  line = line.toString('ascii')
  engine.push(line)
}

// find number

function isSymbol(element) {
  return !(/^[0-9.]+$/.test(element))
}

function findNumberEnd (row, numberStart) {
  let i = numberStart + 1
  while (i < row.length && isNumber(row[i])) {
    i++
  }
  return i

}

function sliceWithBuffer (row, iStart, iEnd) {
  const start = iStart > 0 ? iStart - 1 : 0
  const end = iEnd < row.length ? iEnd + 1 : iEnd
  return row.slice(start, end)
}

for (let iRow = 0; iRow < engine.length; iRow++) {
  const row = engine[iRow]
  for (let iColumn = 0; iColumn < row.length; iColumn++) {
    const element = row[iColumn]
    let iStart, iEnd
    if (isNumber(element)) {
      iStart = iColumn
      iEnd = findNumberEnd(row, iStart)
      iColumn = iEnd

      // console.log(row, iStart, iEnd, row.slice(iStart, iEnd))

      const number = Number(row.slice(iStart, iEnd))
      let isPartNumber = false
      if(iStart > 0 && isSymbol(row[iStart - 1])) {
        console.log(row, number, 'yes left', iStart)
        isPartNumber = true
      }

      if(iEnd < (row.length - 1)  && isSymbol(row[iEnd])) {
        console.log(row, number, ' yes right', iStart)
        isPartNumber = true
      }

      if(iRow > 0 && isSymbol(sliceWithBuffer(engine[iRow-1], iStart, iEnd))) {
        console.log(row, number, ' yes top', iStart)
        isPartNumber = true
      }

      if(iRow < engine.length - 1 && isSymbol(sliceWithBuffer(engine[iRow+1], iStart, iEnd))) {
        console.log(row, number, ' yes bottom', iStart)
        isPartNumber = true
      }


      if(isPartNumber) {
        counter += number
      }

    }
  }
}

console.log('end of file.')
const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)

console.log(counter)