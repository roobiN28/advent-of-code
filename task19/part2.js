import { deepCopy, readFileToTableOfStrings } from '../util.js'

const methods = {}
const givenParts = []
let list_raw = readFileToTableOfStrings('task19/input.txt')
let makeRange = () => ({
  min: 1,
  max: 4000,
})

function parse () {
  let readParts = false
  for (let l of list_raw) {
    if (l === '') {
      readParts = true
      continue
    }
    if (!readParts) {
      const split = l.split('{')
      let rs = split[1].slice(0, split[1].length - 1).split(',')
      const endCall = rs.pop()
      rs = rs.map(r => {
        const split = r.split(':')
        return {
          partElement: split[0].at(0),
          moreLess: split[0].at(1),
          value: Number(split[0].slice(2, split[0].length)),
          call: split[1],
        }
      })
      methods[split[0]] = {
        rules: rs,
        call: endCall,
      }

    } else {
      const split = l.slice(1, l.length - 1).split(',')
      const parsePart = (el) => Number(el.slice(2, el.length))
      givenParts.push({
        x: parsePart(split[0]),
        m: parsePart(split[1]),
        a: parsePart(split[2]),
        s: parsePart(split[3]),
      })
    }
  }
}

function calcDistinctFromRanges (ranges) {
  let result = 1
  result *= ranges.x.max - ranges.x.min + 1
  result *= ranges.m.max - ranges.m.min + 1
  result *= ranges.a.max - ranges.a.min + 1
  result *= ranges.s.max - ranges.s.min + 1
  return result
}

function callRecursive (name, ranges) {
  if (name === 'A') return calcDistinctFromRanges(ranges)
  if (name === 'R') return 0

  let result = 0
  for (let rule of methods[name].rules) {
    if (rule.moreLess === '>') {
      const rangeCopy = deepCopy(ranges)
      rangeCopy[rule.partElement].min = rule.value + 1
      result += callRecursive(rule.call, rangeCopy)
      ranges[rule.partElement].max = rule.value
    }
    if (rule.moreLess === '<') {
      const rangeCopy = deepCopy(ranges)
      rangeCopy[rule.partElement].max = rule.value - 1
      result += callRecursive(rule.call, rangeCopy)
      ranges[rule.partElement].min = rule.value
    }
  }

  result += callRecursive(methods[name].call, ranges)
  return result
}

export function main () {
  parse()
  const ranges = {
    x: makeRange(),
    m: makeRange(),
    a: makeRange(),
    s: makeRange(),
  }

  return callRecursive('in', ranges)
}