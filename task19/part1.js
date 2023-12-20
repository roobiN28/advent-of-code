import { readFileToTableOfStrings } from '../util.js'
import { EAST_R, NORTH_U, SOUTH_D, WEST_L } from '../compass.js'

const rules = {}
const parts = []
const PIT_COLS = 380
let list_raw = readFileToTableOfStrings('task19/example.txt')

function parse () {
  let readParts = false
  for (let l of list_raw) {
    if (l === '') {
      readParts = true
      continue
    }
    if (!readParts) {
      const split = l.split('{')
      rules[split[0]] = split[1].slice(0, split[1].length - 1).split(',')
    } else {
      const split = l.slice(1, l.length - 1).split(',')
      const parsePart = (el) => Number(el.slice(2, el.length))
      parts.push({
        x: parsePart(split[0]),
        m: parsePart(split[1]),
        a: parsePart(split[2]),
        s: parsePart(split[3]),
      })
    }

  }
}

function call (name, part) {
  if(name === 'A') return 'A'
  if(name === 'R') return 'R'

  for (let rule of rules[name]) {
    // console.log(part, rule)
    if (rule.includes(':')) {
      const split = rule.split(':')
      const partElement = split[0].at(0)
      const moreLess = split[0].at(1)
      const compare = Number(split[0].slice(2, split[0].length))
      console.log(partElement, moreLess, compare, rule, part)
      if(moreLess === '>'){
        if(part[partElement] > compare) return call(split[1], part)
      } else {
        if(part[partElement] < compare) return call(split[1], part)
      }
    } else {
      return call(rule, part)
    }
  }
}

function machine () {
  const acceptedParts = []
  let result = 0
  for (let part of parts) {
    const c = call('in', part)
    if (c === 'A') {
      acceptedParts.push(part)
      result += part.x + part.m + part.a + part.s
    }
  }
  console.log(acceptedParts)
  return result
}

export function main () {
  parse()
  console.log(rules)
  console.log(parts)
  console.log('---------------------------')

  return machine()
}