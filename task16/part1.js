import { readFileToTable } from '../util.js'
import { createDebugTable } from '../console.js'
import { EAST, WEST, NORTH, SOUTH } from '../compass.js'

let layout = readFileToTable('task16/input.txt')
let energized = copyDebug()
let beams = []

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

function beamOutLayout (x, y) {
  return y < 0 || y >= layout[0].length || x < 0 || x >= layout.length
}

function light (beam) {
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
  if(beamOutLayout(x,y)) return []
  energized[x][y] = '#'

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
  if (!beamOutLayout(x, y)) {
    newBeams.push({ x, y, direction })
  }

  if (x2 !== undefined && y2 !== undefined) {
    newBeams.push({ x: x2, y: y2, direction: direction2 })
  }

  return newBeams
}

function countEnergized () {
  let e = 0

  for (let i = 0; i < energized.length; i++) {
    for (let j = 0; j < energized[i].length; j++) {
      if(energized[i][j] === '#') e++
    }
  }
  return e
}

export function main () {
  const debug = copyDebug()
  let lastEnergized = 0
  let newEnergized = 1
  let counter = 0
  let beamStart = {
    x: 0,
    y: 0,
    direction: SOUTH,
  }
  energized[0][0] = '#'
  beams.push(beamStart)



  while (lastEnergized !== newEnergized) {
    const newBeams = []
    for (let beam of beams) {
      newBeams.push(light(beam))
    }
    beams = newBeams.flatMap(beam => beam)
    counter++
    if(counter % 10 === 0) {
      lastEnergized = newEnergized
      newEnergized = countEnergized()
    }
  }


  debug.show(energized)
  return lastEnergized
}