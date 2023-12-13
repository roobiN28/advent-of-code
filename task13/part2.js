import { readFileToTableOfStrings, reverseString } from '../util.js'

const mirrors = []

function loadMirrors () {
  let table = readFileToTableOfStrings('task13/input.txt')
  mirrors.push([])
  let mirror = 0
  for (let i = 0; i < table.length; i++) {
    if (table[i] === '') {
      mirrors.push([])
      mirror++
      continue
    }
    mirrors[mirror].push(table[i])
  }
}

function copyMirror (mirror) {
  return mirror.slice()
}

function reverseMirror (mir) {
  const mirror = copyMirror(mir)
  let reversed = []
  for (let i = 0; i < mirror[0].length; i++) {
    reversed.push('')
  }

  for (let j = 0; j < mirror[0].length; j++) {
    for (let i = 0; i < mirror.length; i++) {
      reversed[j] = reversed[j] + mirror[i][j]
    }
  }
  return reversed
}

function checkMirrorRow (evenMirror) {
  for (let i = 0; i < evenMirror.length; i++) {
    const row = evenMirror[i]
    const part = row.slice(0, row.length / 2)
    const part2 = row.slice(row.length / 2, row.length)
    if (part !== reverseString(part2)) {
      return false
    }
  }
  return true
}

function checkRows (mirror, rev = 1, origin) {
  let isOdd = mirror[0].length % 2 !== 0
  let mirrorLength = isOdd ? mirror[0].length - 1 : mirror[0].length
  for (let i = mirrorLength; i >= 2; i -= 2) {
    let mirrorCopy = copyMirror(mirror).map(row => row.slice(0, i))
    if (checkMirrorRow(mirrorCopy)) {
      const result = mirrorCopy[0].length / 2
      if (result !== origin) {
        return result
      }
    }
  }

  for (let i = isOdd ? 1 : 0; i <= mirror[0].length - 2; i += 2) {
    let mirrorCopy = copyMirror(mirror).map(row => row.slice(i, mirror[0].length))
    if (checkMirrorRow(mirrorCopy)) {
      const result = (mirrorCopy[0].length / 2) + i - 1 + (isOdd ? 1 : 0)
      if (result !== origin) {
        return result
      }
    }
  }
  return 0
}

function findReflection (mirror, origin) {
  const rowResult = checkRows(mirror, 1, origin)
  if (rowResult) {
    return rowResult
  } else {
    const reversed = reverseMirror(mirror)
    return checkRows(reversed, 0, origin / 100) * 100
  }
  return 0
}

export function main () {
  loadMirrors()
  let result = 0
  for (let mirror of mirrors) {
    let ref = 0
    const originReflection = findReflection(mirror, -10000)
    for (let i = 0; i < mirror.length; i++) {
      for (let j = 0; j < mirror[i].length; j++) {
        const mirrorCopy = copyMirror(mirror)
        let rowTable = mirrorCopy[i].split('')
        rowTable[j] = rowTable[j] === '.' ? '#' : '.'
        mirrorCopy[i] = rowTable.join('')
        ref = findReflection(mirrorCopy, originReflection, -1000)
        if (ref) break
      }
      if (ref) break
    }
    result += ref

  }

  return result
}