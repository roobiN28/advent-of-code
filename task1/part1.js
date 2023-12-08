import { containNumber, extractOnlyNumber, readFileToTableOfStrings } from '../util.js'

const table = readFileToTableOfStrings('task1/input.txt')

function replace (text) {
  return text.replace('one', '1').
    replace('eight', '8').
    replace('two', '2').
    replace('three', '3').
    replace('four', '4').
    replace('five', '5').
    replace('six', '6').
    replace('seven', '7').
    replace('nine', '9')
}

let counter = 0

export function main () {
  for (let text of table) {

    //first
    for (let i = 1; i < text.length; i++) {
      const splitted = text.slice(0, i)
      if (containNumber(splitted)) {
        break
      }
      text = replace(splitted) + text.slice(i, text.length)
    }

    // last
    for (let i = text.length - 1; i > 1; i--) {
      const splitted = text.slice(i, text.length)
      if (containNumber(splitted)) {
        break
      }
      text = text.slice(0, i) + replace(splitted)
    }

    const l = extractOnlyNumber(replace(text))
    if (l.length === 1) {
      counter += Number(l + l)
    } else if (l.length > 1) {
      counter += Number(l[0] + l[l.length - 1])
    }
  }

  return counter
}
