import LineByLineReader from 'n-readlines'
import { containNumber } from '../util.js'

const broadbandLines = new LineByLineReader('task4/input.txt')
let points = 0
let line
let copies = {}

function parseNumbers (numbers) {
  const splitted = numbers.split('|')[0].trim().split(' ')
  return splitted.filter(s => containNumber(s)).map(s => Number(s))
}

export function main () {
  while (line = broadbandLines.next()) {
    line = line.toString('ascii')

    const numbers = line.split(':')[1].split('|')
    const cardId = Number(parseNumbers(line.split(':')[0]))
    const win = parseNumbers(numbers[0])
    const your = parseNumbers(numbers[1])
    copies[cardId] = copies[cardId] ?? 1
    for (let i = 0; i < copies[cardId]; i++) {
      let copiesPoint = cardId
      for (let num of your) {
        if (win.includes(num)) {
          copiesPoint += 1
          copies[copiesPoint] = Number((copies[copiesPoint] ?? 1)) + 1
        }
      }
    }
    points += (copies[cardId] ?? 0)
  }

  return points
}