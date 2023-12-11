import { readFileToTable } from '../util.js'
import { createDebugTable } from '../console.js'

const tiles = readFileToTable('task10/input.txt')
let debug = createDebugTable()
for (let i = 0; i < tiles.length; i++) {
  debug.push([...tiles[i]])
}

const MAX_I = tiles.length
const MAX_J = tiles[0].length

function findStart () {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === 'S') return { i, j }
    }
  }
}

const map = {
  isToLeft: (from, to) => {
    return from.i === to.i && from.j - to.j === 1
  },
  isToRight: (from, to) => {
    return from.i === to.i && from.j - to.j === -1
  },
  isToTop: (from, to) => {
    return from.j === to.j && from.i - to.i === 1
  },
  isToBottom: (from, to) => {
    return from.j === to.j && from.i - to.i === -1
  },
  isSame: (from, to) => {
    return from.j === to.j && from.i === to.i
  },
}

function checkTile (from, to) {
  if (to.i >= MAX_I || to.j >= MAX_J || to.i < 0 || to.j < 0) {
    return false
  }
  const tileFrom = tiles[from.i][from.j]
  const tileTo = tiles[to.i][to.j]

  if (map.isToLeft(from, to)) {
    const fromOk = tileFrom === 'S' || tileFrom === 'J' || tileFrom === '-' || tileFrom === 7
    const toOk = tileTo === 'S' || tileTo === '-' || tileTo === 'L' || tileTo === 'F'
    return fromOk && toOk
  }
  if (map.isToRight(from, to)) {
    const fromOk = tileFrom === 'S' || tileFrom === '-' || tileFrom === 'F' || tileFrom === 'L'
    const toOk = tileTo === 'S' || tileTo === '-' || tileTo === 7 || tileTo === 'J'
    return fromOk && toOk
  }
  if (map.isToTop(from, to)) {
    const fromOk = tileFrom === 'S' || tileFrom === '|' || tileFrom === 'L' || tileFrom === 'J'
    const toOk = tileTo === 'S' || tileTo === '|' || tileTo === 'F' || tileTo === 7
    return fromOk && toOk
  }
  if (map.isToBottom(from, to)) {
    const fromOk = tileFrom === 'S' || tileFrom === '|' || tileFrom === 'F' || tileFrom === 7
    const toOk = tileTo === 'S' || tileTo === '|' || tileTo === 'L' || tileTo === 'J'
    return fromOk && toOk
  }
}

function colorDebug (tile, point) {
  let c = 'm'
  if (point === 1) c = 'r'
  if (point === 2) c = 'b'
  if (point === 3) c = 'c'
  if (point === 4) c = 'y'
  if (point === 5) c = 'm'
  debug[tile.i][tile.j] = c
}

function path (from, to, num) {

  if (tiles[to.i][to.j] === 'S') {
    return 1
  }
  const left = { i: to.i, j: to.j - 1 }
  if (!map.isSame(from, left) && checkTile(to, left)) {
    const p = path(to, left, num + 1) + 1
    if (!isNaN(p)) {
      colorDebug(to, p)
      return p
    }
  }
  const right = { i: to.i, j: to.j + 1 }
  if (!map.isSame(from, right) && checkTile(to, right)) {
    const p = path(to, right, num + 1) + 1
    if (!isNaN(p)) {
      colorDebug(to, p)
      return p
    }
  }
  const top = { i: to.i - 1, j: to.j }
  if (!map.isSame(from, top) && checkTile(to, top)) {
    const p = path(to, top, num + 1) + 1
    if (!isNaN(p)) {
      colorDebug(to, p)
      return p
    }
  }
  const bottom = { i: to.i + 1, j: to.j }
  if (!map.isSame(from, bottom) && checkTile(to, bottom)) {
    const p = path(to, bottom, num + 1) + 1
    if (!isNaN(p)) {
      colorDebug(to, p)
      return p
    }
  }
  return 0
}

export function main () {
  const start = findStart()
  return path(start, { i: start.i + 1, j: start.j }, 1) / 2
}

