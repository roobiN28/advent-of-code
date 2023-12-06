import LineByLineReader from 'n-readlines'
import { containNumber } from '../util.js'

const broadbandLines = new LineByLineReader('task4/input.txt')
let points = 0
let line

function parseNumbers (numbers) {
  const splitted = numbers.split('|')[0].trim().split(' ')
  return splitted.filter(s => containNumber(s)).map(s => Number(s))
}

export function main () {
  while (line = broadbandLines.next()) {
    line = line.toString('ascii')
    let linePoint = 0

    let numbers = line.split(':')[1].split('|')
    const win = parseNumbers(numbers[0])
    const your = parseNumbers(numbers[1])
    for (let num of your) {
      if (win.includes(num)) {
        linePoint = linePoint === 0 ? 1 : linePoint * 2
      }
    }
    points += linePoint

  }

  return points
}
