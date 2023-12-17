import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task15/input.txt')
let line = broadbandLines.next().toString()
let codes = line.split(',')

function hashString (text) {
  let result = 0
  for (let i = 0; i < text.length; i++) {
    result = ((result + text.charCodeAt(i)) * 17) % 256
  }
  return result
}

export function main () {
  let result = 0
  for (let code of codes) {
    result += hashString(code)
  }
  return result
}