import { readFileToTable } from '../util.js'

const DOT = '.'
const GALAXY = '#'
let universe = readFileToTable('task11/input.txt')
const galaxies = []

function expandUniverse () {
  let new_u = []
  for (let i = 0; i < universe.length; i++) {
    if (universe[i].every(e => e === DOT)) {
      new_u.push([...universe[i]])
    }
    new_u.push(universe[i])
  }
  universe = new_u
  for (let j = 0; j < universe.length; j++) {
    let isEveryDot = true
    for (let i = 0; i < universe.length; i++) {
      if (universe[i][j] !== DOT) {
        isEveryDot = false
        break
      }
    }
    if (isEveryDot) {
      for (let i = 0; i < universe.length; i++) {
        universe[i].splice(j, 0, DOT)
      }
      j += 1
    }
  }
}

function findGalaxies () {
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === GALAXY) {
        galaxies.push({ i, j })
      }
    }
  }
}

function calculateDistance (g1, g2) {
  const width = g1.i - g2.i
  const height = g1.j - g2.j
  return Math.abs(width) + Math.abs(height)
}

function calculateAllGalaxiesDistance () {
  let all = 0
  for (let g1 = 0; g1 < galaxies.length; g1++) {
    for (let g2 = g1 + 1; g2 < galaxies.length; g2++) {
      const distance = calculateDistance(galaxies[g1], galaxies[g2])
      all +=distance
    }
  }
  return all
}

export function main () {
  expandUniverse()
  findGalaxies()
  return calculateAllGalaxiesDistance()
}
