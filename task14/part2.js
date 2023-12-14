import { readFileToTable } from '../util.js'

const CYCLES = 1000000000
let cycle = {}
const CYCLE_PARAMETERS = {
  MIN_ELEMENTS_TO_FIND_CYCLE: 90,
  MAX_IN_CYCLE: 100,
}
let platform = readFileToTable('task14/input.txt')
const O = 'O'
const HASH = '#'
const DOT = '.'
const not_rocks = []
for (let i = 0; i < platform.length; i++) {
  for (let j = 0; j < platform[i].length; j++) {
    if (platform[i][j] !== HASH) {
      not_rocks.push({ i, j })
    }
  }
}

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

function tiltSouth () {
  for (let i = platform.length - 2; i >= 0; i--) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === O && platform[i + 1][j] === DOT) {
        platform[i][j] = DOT

        let direction = 1
        while (i + direction + 1 <= platform.length - 1 && platform[i + direction + 1][j] === '.') {
          direction++
        }
        platform[i + direction][j] = O
      }
    }
  }
}

function tiltWest () {
  for (let i = 0; i < platform.length; i++) {
    for (let j = 1; j < platform[i].length; j++) {
      if (platform[i][j] === O && platform[i][j - 1] === DOT) {
        platform[i][j] = DOT

        let direction = 1
        while (j - direction - 1 >= 0 && platform[i][j - direction - 1] === '.') {
          direction++
        }
        platform[i][j - direction] = O
      }
    }
  }
}

function tiltEast () {
  for (let i = 0; i < platform.length; i++) {
    for (let j = platform[i].length - 1; j >= 0; j--) {
      if (platform[i][j] === O && platform[i][j + 1] === DOT) {
        platform[i][j] = DOT

        let direction = 1
        while (j + direction + 1 <= platform[i].length - 1 && platform[i][j + direction + 1] === '.') {
          direction++
        }
        platform[i][j + direction] = O
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

function tiltCycle () {
  tiltNorth()
  tiltWest()
  tiltSouth()
  tiltEast()
}

function findCycle () {
  for (let key in cycle) {
    if (cycle[key].length > CYCLE_PARAMETERS.MIN_ELEMENTS_TO_FIND_CYCLE) {
      const difference = cycle[key][cycle[key].length - 1] - cycle[key][cycle[key].length - 2]
      if (difference < 2) continue
      let found = true
      for (let i = cycle[key].length - 3; i > 0; i--) {
        const last = cycle[key][i]
        const prev = cycle[key][i - 1]
        if (last - prev !== difference) found = false
      }
      if (found) {
        return {
          key,
          difference,
        }
      }
    }
  }
}

export function main () {
  let skipped = false
  for (let i = 0; i < CYCLES; i++) {

    tiltCycle()
    if (i > 1000 && !skipped) {
      const findedCycle = findCycle()
      if (findedCycle) {
        const cyclesToSkip = Math.floor((CYCLES - i) / findedCycle.difference)
        i = i + (findedCycle.difference * cyclesToSkip)
        skipped = true
      }
      const countedNumber = count()
      if (cycle[countedNumber]) {
        cycle[countedNumber].push(i)
        if (cycle[countedNumber].length > CYCLE_PARAMETERS.MAX_IN_CYCLE) {
          cycle[countedNumber].shift()
        }
      } else {
        cycle[countedNumber] = []
      }
    }
    /*    if (i % 10000 === 0) {
          const c = count()
          log('For: ' + i + '  --- ' + c + '  ' + percentage(i, 1000000000) + '%', color.FgRed)
        }*/
  }
  return count()
}