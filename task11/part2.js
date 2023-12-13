import { readFileToTable } from '../util.js'
import { color, createDebugTable, log } from '../console.js'

const DOT = '.'
const GALAXY = '#'
let universe = readFileToTable('task11/input.txt')
let universeExpanded = []
let TIMES_LARGER = 1000000
function copyDebug (universe) {
  let debug = createDebugTable()
  for (let i = 0; i < universe.length; i++) {
    debug[i] = []
    for (let j = 0; j < universe[i].length; j++) {
      debug[i].push(universe[i][j])
    }
  }
  return debug
}
function debugColorLineWithDots (debug, universeArg) {
  for (let i = 0; i < debug.length; i++) {
    if (universeArg[i].every(e => e === DOT)) {
      for(let j = 0;j<debug[i].length;j++) {
        debug[i][j] = 'r'
      }
    }
  }

  for (let j = 0; j < universeArg.length; j++) {
    let isEveryDot = true
    for (let i = 0; i < universeArg.length; i++) {
      if (universeArg[i][j] !== DOT) {
        isEveryDot = false
        break
      }
    }
    if (isEveryDot) {
      for (let i = 0; i < universeArg.length; i++) {
        debug[i][j] = 'g'
      }
      j += 0
    }
  }
}

function expandUniverse () {
  for (let i = 0; i < universe.length; i++) {
    if (universe[i].every(e => e === DOT)) {
      universeExpanded.push([...universe[i]])
    }
    universeExpanded.push([...universe[i]])
  }
  for (let j = 0; j < universeExpanded.length; j++) {
    let isEveryDot = true
    for (let i = 0; i < universeExpanded.length; i++) {
      if (universeExpanded[i][j] !== DOT) {
        isEveryDot = false
        break
      }
    }
    if (isEveryDot) {
      for (let i = 0; i < universeExpanded.length; i++) {
        universeExpanded[i].splice(j, 0, DOT)
      }
      j += 1
    }
  }
}

function findGalaxies (uni) {
  const galaxies = []
  for (let i = 0; i < uni.length; i++) {
    for (let j = 0; j < uni[i].length; j++) {
      if (uni[i][j] === GALAXY) {
        galaxies.push({ i, j })
      }
    }
  }
  return galaxies
}

function calculateDistance (g1, g2) {
  const width = g1.i - g2.i
  const height = g1.j - g2.j
  return Math.abs(width) + Math.abs(height)
}

function calculateAllGalaxiesDistance(g, ge) {
  let all = 0

  for (let g1 = 0; g1 < g.length; g1++) {
    for (let g2 = g1 + 1; g2 < g.length; g2++) {
      const distance = calculateDistance(g[g1], g[g2])
      const distanceExpanded = calculateDistance(ge[g1], ge[g2])
      all +=distance + ((distanceExpanded - distance) * (TIMES_LARGER-1))
    }
  }
  return all
}

export function main () {
  // const debug = copyDebug(universe)
  // debugColorLineWithDots(debug, universe)
  // debug.show(universe)

  expandUniverse()

  // const debugExpanded = copyDebug(universeExpanded)
  // debugColorLineWithDots(debugExpanded, universeExpanded)
  // debugExpanded.show(universeExpanded)

  const galaxies = findGalaxies(universe)
  const galaxiesExpanded = findGalaxies(universeExpanded)


  return calculateAllGalaxiesDistance(galaxies, galaxiesExpanded)
}