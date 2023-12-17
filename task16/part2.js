import { readFileToTable } from '../util.js'
import { createDebugTable } from '../console.js'
import { EAST, NORTH, SOUTH, WEST } from '../compass.js'

let layout = readFileToTable('task16/input.txt')

function copyDebug () {
  let debug = createDebugTable()
  for (let i = 0; i < layout.length; i++) {
    debug[i] = []
    for (let j = 0; j < layout[i].length; j++) {
      debug[i].push('.')
    }
  }
  return debug
}

function copyEnergized () {
  let debug = createDebugTable()
  for (let i = 0; i < layout.length; i++) {
    debug[i] = []
    for (let j = 0; j < layout[i].length; j++) {
      debug[i].push({
        energized: false,
        directions: [],
      })
    }
  }
  return debug
}

function beamOutLayout (x, y) {
  return y < 0 || y >= layout[0].length || x < 0 || x >= layout.length
}

function light (beam, energized) {
  let x = beam.x
  let y = beam.y
  let direction = beam.direction

  let x2 = undefined
  let y2 = undefined
  let direction2 = undefined

  switch (beam.direction) {
    case EAST:
      y = beam.y + 1
      break
    case WEST:
      y = beam.y - 1
      break
    case NORTH:
      x = beam.x - 1
      break
    case SOUTH:
      x = beam.x + 1
      break
  }
  if (beamOutLayout(x, y)) return []
  energized[x][y].energized = true

  switch (beam.direction) {
    case EAST:
      if (layout[x][y] === '|') {
        direction = NORTH
        x2 = x
        y2 = y
        direction2 = SOUTH
      }
      if (layout[x][y] === '\\') direction = SOUTH
      if (layout[x][y] === '/') direction = NORTH
      break
    case WEST:
      if (layout[x][y] === '|') {
        direction = NORTH
        x2 = x
        y2 = y
        direction2 = SOUTH
      }
      if (layout[x][y] === '\\') direction = NORTH
      if (layout[x][y] === '/') direction = SOUTH

      break
    case NORTH:
      if (layout[x][y] === '-') {
        direction = WEST
        x2 = x
        y2 = y
        direction2 = EAST
      }
      if (layout[x][y] === '\\') direction = WEST
      if (layout[x][y] === '/') direction = EAST
      break
    case SOUTH:
      if (layout[x][y] === '-') {
        direction = WEST
        x2 = x
        y2 = y
        direction2 = EAST
      }
      if (layout[x][y] === '\\') direction = EAST
      if (layout[x][y] === '/') direction = WEST
      break
  }

  const newBeams = []
  if (!beamOutLayout(x, y) && !energized[x][y].directions.includes(direction)) {
    energized[x][y].directions.push(direction)
    newBeams.push({ x, y, direction })
  }

  if (x2 !== undefined && y2 !== undefined && !energized[x][y].directions.includes(direction2)) {
    energized[x][y].directions.push(direction2)
    newBeams.push({ x: x2, y: y2, direction: direction2 })
  }

  return newBeams
}

function countEnergized (energized) {
  let e = 0

  for (let i = 0; i < energized.length; i++) {
    for (let j = 0; j < energized[i].length; j++) {
      if (energized[i][j].energized === true) e++
    }
  }

  return e
}

function energizeAll (startBeam) {
  let lastEnergized = 0
  let newEnergized = 1
  let counter = 0
  let energized = copyEnergized()
  // energized[0][0] = '#'
  let beams = [startBeam]

  while (lastEnergized !== newEnergized) {
    const newBeams = []
    for (let beam of beams) {
      newBeams.push(light(beam, energized))
    }
    beams = newBeams.flatMap(beam => beam)
    counter++
    if (counter % 10 === 0) {
      // log(counter + ', ' + lastEnergized + ', ' + newEnergized, color.FgGreen)
      lastEnergized = newEnergized
      newEnergized = countEnergized(energized)
    }
  }
  return lastEnergized
}

export function main () {
  const debug = copyDebug()
  let allEnergized = []
  let bestEnergized = 0

  for (let i = 0; i < layout.length; i++) {
    const n = energizeAll({
      x: i,
      y: -1,
      direction: EAST,
    })
    allEnergized.push({ x: i, y: -1, direction: EAST, n: n })
    if (n > bestEnergized) bestEnergized = n
    const n2 = energizeAll({
      x: i,
      y: layout[i].length,
      direction: WEST,
    })
    if (n2 > bestEnergized) bestEnergized = n2
    allEnergized.push({ x: i, y: -1, direction: EAST, n: n2 })
  }

  for (let j = 0; j < layout[0].length; j++) {
    const n = energizeAll({
      x: -1,
      y: j,
      direction: SOUTH,
    })
    allEnergized.push({ x: -1, y: j, direction: SOUTH, n: n })
    if (n > bestEnergized) bestEnergized = n
    const n2 = energizeAll({
      x: layout.length,
      y: j,
      direction: NORTH,
    })
    if (n2 > bestEnergized) bestEnergized = n2
    allEnergized.push({ x: layout.length, y: -1, direction: NORTH, n: n2 })
  }

  return bestEnergized
}