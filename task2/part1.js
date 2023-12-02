import LineByLineReader from 'n-readlines'
import { extractOnlyLetters, extractOnlyNumber } from '../util.js'

const broadbandLines = new LineByLineReader('task2/input.txt')
let counter = 0
const RED = 12
const GREEN = 13
const BLUE = 14

function splitGame (line) {
  const splitted = line.split(':')
  const gameNumber = extractOnlyNumber(splitted[0])

  return [Number(gameNumber), splitted[1]]
}

function splitRounds (game) {
  const rounds = game.split(';')
  return rounds.map(round => {
    const formatted = {}
    for (let color of round.split(',')) {
      formatted[(extractOnlyLetters(color))] = extractOnlyNumber(color)
    }
    return formatted
  })
}

let line

function isOverflow (round) {
  if (round['green'] > GREEN) {
    return true
  }
  if (round['red'] > RED) {
    return true
  }
  if (round['blue'] > BLUE) {
    return true
  }
  return false
}

while (line = broadbandLines.next()) {
  line = line.toString('ascii')

  const [gameNumber, game] = splitGame(line)

  const rounds = splitRounds(game)
  console.log(gameNumber, rounds)

  let overflow = false
  for (let round of rounds) {
    overflow = isOverflow(round)
    if (overflow) {
      break
    }
  }

  if (!overflow) {
    counter += gameNumber
  }

}

console.log('end of file.')
const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)

console.log(counter)