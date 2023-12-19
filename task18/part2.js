import { readFileToTableOfStrings } from '../util.js'
import { EAST_R, NORTH_U, SOUTH_D, WEST_L } from '../compass.js'

const coordinates = []

let list_raw = readFileToTableOfStrings('task18/input.txt')
let list = []

function parseDirection (d) {
  if (d === '0') return 'R'
  if (d === '1') return 'D'
  if (d === '2') return 'L'
  if (d === '3') return 'U'
}

for (let i = 0; i < list_raw.length; i++) {
  const splitted = list_raw[i].split(' ')
  const color = splitted[2].slice(1, splitted[2].length - 1)
  const direction = parseDirection(color.slice(color.length - 1, color.length))
  const length = parseInt(color.slice(color.length - 6, color.length - 1), 16)
  list.push({
    direction: direction,
    length: length,
  })
}

function calculateCoordinate (last, direction, length) {
  if (direction === EAST_R) return { x: last.x, y: last.y + length }
  if (direction === WEST_L) return { x: last.x, y: last.y - length }
  if (direction === SOUTH_D) return { x: last.x + length, y: last.y }
  if (direction === NORTH_U) return { x: last.x - length, y: last.y }
}

function digPitCoordinates () {
  let last = { x: 0, y: 0 }
  coordinates.push(last)

  for (let instruction of list) {
    let length = instruction.length
    last = calculateCoordinate(last, instruction.direction, length)
    coordinates.push(last)
  }
}

function formula () {
  let result = 0
  for (let i = 0; i < coordinates.length; i++) {
    const nextY = coordinates[i === coordinates.length - 1 ? 0 : i + 1].y
    const prevY = coordinates[i === 0 ? coordinates.length - 1 : i - 1].y
    const meantime = coordinates[i].x * (prevY - nextY)
    result += meantime
  }
  return Math.abs(result) / 2
}

function calculateBoundryPoins () {
  let result = 0
  for (let i = 0; i < coordinates.length; i++) {
    const point = coordinates[i]
    const nextPoint = coordinates[i === coordinates.length - 1 ? 0 : i + 1]
    const x = Math.abs(point.x - nextPoint.x)
    const y = Math.abs(point.y - nextPoint.y)
    result += x + y
  }
  return result
}

export function main () {
  // https://en.wikipedia.org/wiki/Shoelace_formula   Other formulas
  // https://en.wikipedia.org/wiki/Pick%27s_theorem

  digPitCoordinates()
  const area = formula()
  const boundariesCount = calculateBoundryPoins()
  const interiorPoints = area - (boundariesCount / 2) + 1
  return interiorPoints + boundariesCount
}


