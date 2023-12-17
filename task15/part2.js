import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task15/example.txt')
let line = broadbandLines.next().toString()
let codes = line.split(',')

function hashString (text) {
  let result = 0
  for (let i = 0; i < text.length; i++) {
    result = ((result + text.charCodeAt(i)) * 17) % 256
  }
  return result
}

function focalLength (code) {
  return code.split('=')[1]
}

function etykieta (code) {
  return code.split('=')[0]
}

export function main () {
  let result = 0
  for (let code of codes) {
    if (code.includes('=')) {
      console.log('===', code, hashString(code), hashString(etykieta(code)), focalLength(code))
    } else {
      console.log('----', code, hashString(code))

    }
    result += hashString(code)
  }
  return result
}