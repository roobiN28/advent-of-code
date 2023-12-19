import { readFileToTableOfStrings } from '../util.js'
import { EAST_R, NORTH_U, SOUTH_D, WEST_L } from '../compass.js'

const PIT_ROWS = 420
const PIT_COLS = 380
let list_raw = readFileToTableOfStrings('task18/input.txt')
let list = []

const pit = []
for (let i = 0; i < PIT_ROWS; i++) {
  const row = []
  for (let j = 0; j < PIT_COLS; j++) {
    row.push('.')
  }
  pit.push(row)
}

for (let i = 0; i < list_raw.length; i++) {
  const splitted = list_raw[i].split(' ')
  list.push({
    direction: splitted[0],
    length: Number(splitted[1]),
    color: splitted[2].slice(1, splitted[2].length - 1),
  })
}

function calcHead (h, direction) {
  if (direction === EAST_R) return { x: h.x, y: h.y + 1 }
  if (direction === WEST_L) return { x: h.x, y: h.y - 1 }
  if (direction === SOUTH_D) return { x: h.x + 1, y: h.y }
  if (direction === NORTH_U) return { x: h.x - 1, y: h.y }
}

function drawPit (p) {
  if (p.x >= 0) pit[p.x][p.y] = '#'
}

function digPit () {
  let head = { x: 168, y: 80 }
  drawPit(head)

  for (let instruction of list) {
    let length = instruction.length
    while (length > 0) {
      head = calcHead(head, instruction.direction)
      drawPit(head)
      length--
    }
  }
}

function floodfill (x, y) {
  if(pit[x][y] === '#') return
  if(pit[x][y] === '.') {
    pit[x][y] = '#'
    floodfill(x, y+1)
    floodfill(x, y-1)
    floodfill(x+1, y)
    floodfill(x-1, y)
  }
}

function countPit () {
  let count = 0
  for (let i = 0; i < PIT_ROWS; i++) {
    for (let j = 0; j < PIT_COLS; j++) {
      if(pit[i][j] === '#') count++
    }
  }
  return count
}

export function main () {
  digPit()

  floodfill(170, 82)
  return countPit()
}