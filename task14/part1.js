import { readFileToTable } from '../util.js'

let platform = readFileToTable('task14/input.txt')
const O = 'O'
const DOT = '.'

function tiltNorth () {
  for (let i = 1; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === O && platform[i - 1][j] === DOT) {
        platform[i][j] = DOT
        let direction = 1
        while (i - direction - 1 >= 0 && platform[i - direction - 1][j] === '.') {
          direction++
        }
        platform[i - direction][j] = O
      }
    }
  }
}

function count () {
  let result = 0
  let multiplier = platform.length
  for (let i = 0; i < platform.length; i++) {
    const roundedRocks = platform[i].filter(rock => rock === O).length
    result += roundedRocks * multiplier
    multiplier--
  }
  return result
}

export function main () {
  tiltNorth()
  return count()
}