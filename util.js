import LineByLineReader from 'n-readlines'

export function containNumber (text) {
  return /\d/.test(text)
}

export function extractOnlyNumber (text) {
  return text.replace(/\D/g, '')
}

export function extractOnlyLetters (text) {
  return text.replace(/[^a-zA-Z]/g, '')
}

export function isNumber (string) {
  return /^[0-9]*$/.test(string)
}

export function reverseString (str) {
  let newString = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i]
  }
  return newString
}

function isNotIn (x, y) {
  return x < 0 || x >= this.length || y < 0 || y >= this[0].length
}

function isIn (x, y) {
  return x >= 0 && x < this.length && y >= 0 && y < this[0].length
}

export function readFileToTable (file, separator = '') {
  const broadbandLines = new LineByLineReader(file)
  const table = []
  let line
  while (line = broadbandLines.next()) {
    table.push(
      line.toString('ascii').replace('\r', '').split(separator).map(el => isNaN(el) ? el : Number(el)),
    )
  }
  table.isIn = isIn
  table.isNotIn = isNotIn
  return table
}

export function readFileToTableOfStrings (file) {
  const broadbandLines = new LineByLineReader(file)
  const table = []
  let line
  while (line = broadbandLines.next()) {
    table.push(line.toString('ascii').replace('\r', ''))
  }
  return table
}

export function percentage (number, numberAll) {
  return ((number / numberAll) * 100).toFixed(3)
}

export function deepCopy (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let clonedObject = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObject[key] = deepCopy(obj[key])
    }
  }

  return clonedObject
}