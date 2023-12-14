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

export function reverseString(str) {
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

export function readFileToTable (file, separator = '') {
  const broadbandLines = new LineByLineReader(file)
  const table = []
  let line
  while (line = broadbandLines.next()) {
    table.push(
      line
      .toString('ascii')
      .replace('\r', '')
      .split(separator)
      .map( el => isNaN(el) ? el : Number(el))
    )
  }
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