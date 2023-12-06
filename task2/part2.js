import LineByLineReader from 'n-readlines'
import { extractOnlyLetters, extractOnlyNumber } from '../util.js'

const broadbandLines = new LineByLineReader('task2/input.txt')
let counter = 0

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
      formatted[(extractOnlyLetters(color))] = Number(extractOnlyNumber(color))
    }
    return formatted
  })
}

let line

function fewer (round) {
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

export function main () {
  while (line = broadbandLines.next()) {
    line = line.toString('ascii')

    const [gameNumber, game] = splitGame(line)

    const rounds = splitRounds(game)
    // console.log(gameNumber, rounds)

    const fewer = {
      green: 0,
      red: 0,
      blue: 0,
    }
    for (let round of rounds) {
      if (round.green && fewer.green < round.green) {
        fewer.green = round.green
      }
      if (round.blue && fewer.blue < round.blue) {
        fewer.blue = round.blue
      }
      if (round.red && fewer.red < round.red) {
        fewer.red = round.red
      }
    }

    counter += fewer['blue'] * fewer['red'] * fewer['green']

  }

  return counter
}