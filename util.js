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

export function readFileToTable (file) {
  const broadbandLines = new LineByLineReader(file)
  const table = []
  let line
  while (line = broadbandLines.next()) {
    table.push(line.toString('ascii').split(''))
  }
  return table
}

export function readFileToTableOfStrings (file) {
  const broadbandLines = new LineByLineReader(file)
  const table = []
  let line
  while (line = broadbandLines.next()) {
    table.push(line.toString('ascii'))
  }
  return table
}