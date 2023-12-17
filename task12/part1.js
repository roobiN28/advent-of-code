import { readFileToTableOfStrings } from '../util.js'

let table = readFileToTableOfStrings('task12/input.txt')
let springs = []

function parse () {
  table.forEach(t => {
    const row = t.split(' ')
    springs.push({
      record: row[0].split(''),
      arrange: row[1].split(',').map(number => Number(number)),
    })
  })
}

parse()

function customTrim (str) {
  let start = 0
  let end = str.length - 1

  while (str[start] === ' ' && start < end) {
    start++
  }

  while (str[end] === ' ' && end > start) {
    end--
  }

  let result = str.substring(start, end + 1)
  result = result.replace(/^\.+/, match => match.replace(/\./g, '')) // Trims leading dots

  result = result.replace(/\.*$/, match => match.replace(/\.$/, ''))

  return result
}

function fit (record, arrange) {
  const string = record.join('')
  const damaged = customTrim(string.replace(/\.{2,}/g, '.')).split('.')
  if (damaged.length !== arrange.length) return false
  for (let i = 0; i < damaged.length; i++) {
    if (damaged[i].length !== arrange[i]) return false
  }
  return true
}

function extractQuestionMarks (record) {
  const questionMarks = []
  for (let i = 0; i < record.length; i++) {
    if (record[i] === '?') {
      questionMarks.push(i)
    }
  }
  return questionMarks
}

function generateCombinations (arr, spring) {
  const combinations = []

  function generate (current, start) {
    // if (current.length > 0 && current.length <= spring) {
    if (current.length === spring) {
      combinations.push(current)
    }
    for (let i = start; i < arr.length; i++) {
      generate(current.concat(arr[i]), i + 1)
    }
  }

  generate([], 0)
  return combinations
}

function checkFitForRow (spring) {
  let possibilities = 0
  const questionMarks = extractQuestionMarks(spring.record)
  const combinations = generateCombinations(questionMarks,
    spring.arrange.reduce((acc, val) => acc + val) - spring.record.filter(a => a === '#').length)
  for (let i = 0; i < combinations.length; i++) {
    let recordCopy = [...spring.record]
    for (let r = 0; r < recordCopy.length; r++) {
      if (recordCopy[r] === '?') {
        recordCopy[r] = combinations[i].includes(r) ? '#' : '.'
      }
    }

    possibilities += fit(recordCopy, spring.arrange) ? 1 : 0
  }
  return possibilities
}

export function main () {
  let result = 0
  for (let i = 0; i < springs.length; i++) {
    const numberOfFits = checkFitForRow(springs[i])
    result += numberOfFits
  }
  return result
}
