import { deepCopy, readFileToTableOfStrings } from '../util.js'

function parseBricks () {
  const bricksInFly = []
  let i = 1
  let bricks_raw = readFileToTableOfStrings('task22/input.txt')
  for (let b of bricks_raw) {
    const parse = b.split('~')
    const begin = parse[0].split(',').map(n => Number(n))
    const end = parse[1].split(',').map(n => Number(n))

    const brick = {
      x1: begin[0], y1: begin[1], z1: begin[2],
      x2: end[0], y2: end[1], z2: end[2],
    }
    bricksInFly.push(brick)
  }
  return bricksInFly
}

function fallBrick (brick) {
  const fallen = deepCopy(brick)
  fallen.z1 -= 1
  fallen.z2 -= 1
  return fallen
}

function inLine (p, l1, l2) {
  return p >= l1 && p <= l2
}

function inn (b1, b2) {
  const zIn = inLine(b1.z1, b2.z1, b2.z2) || inLine(b1.z2, b2.z1, b2.z2) || inLine(b2.z1, b1.z1, b1.z2) ||
    inLine(b2.z2, b1.z1, b1.z2)
  if (!zIn) return false

  const xIn = inLine(b1.x1, b2.x1, b2.x2) || inLine(b1.x2, b2.x1, b2.x2) || inLine(b2.x1, b1.x1, b1.x2) ||
    inLine(b2.x2, b1.x1, b1.x2)
  if (!xIn) return false

  const yIn = inLine(b1.y1, b2.y1, b2.y2) || inLine(b1.y2, b2.y1, b2.y2) || inLine(b2.y1, b1.y1, b1.y2) ||
    inLine(b2.y2, b1.y1, b1.y2)
  if (!yIn) return false
  return true
}

function canBeHere (b, bricks) {
  if (b.z1 <= 0) return false

  for (const brick of bricks) {
    if (inn(b, brick)) return false
  }
  return true
}

function fallBricks (bricks) {
  let result = 0
  const newBricks = []
  for (let b of bricks) {
    let prev = b
    let fallen = fallBrick(prev, newBricks)
    while (canBeHere(fallen, newBricks) && fallen.z1 > 0) {
      prev = fallen
      fallen = fallBrick(prev, newBricks)
    }
    if (b.z1 !== prev.z1) {
      result++
    }
    newBricks.push(prev)
  }
  return [newBricks, result]
}

function fallBricksForCalc (bricks) {
  let result = 0
  const newBricks = []
  for (let b of bricks) {
    let prev = b
    let fallen = fallBrick(prev, newBricks)
    while (canBeHere(fallen, newBricks) && fallen.z1 > 0) {
      prev = fallen
      fallen = fallBrick(prev, newBricks)
    }
    if (b.z1 !== prev.z1) {
      result++
    }
    newBricks.push(prev)
  }
  return result
}

function calcDisintegrate (bricks) {
  let result = 0
  for (let i = 0; i < bricks.length; i++) {
    const copy = deepCopy(bricks)
    copy.splice(i, 1)
    const how = fallBricksForCalc(copy)
    result += how
  }
  return result
}

export function main () {
  const bricksInFly = parseBricks()
  bricksInFly.sort((b1, b2) => b1.z1 > b2.z1 ? 1 : -1)
  const bricks = fallBricks(bricksInFly)[0]
  bricks.sort((b1, b2) => b1.z1 > b2.z1 ? 1 : -1)
  return calcDisintegrate(bricks)
}
