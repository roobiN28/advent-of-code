import { readFileToTableOfStrings } from '../util.js'

const table = readFileToTableOfStrings('task8/input.txt')
const instructions = table.shift()

function gcd (a, b) {
  while (b !== 0) {
    let temp = b
    b = a % b
    a = temp
  }
  return a
}

// Funkcja do obliczania NWW (najmniejsza wspólna wielokrotność) dwóch liczb
function lcm (a, b) {
  return (a * b) / gcd(a, b)
}

// Funkcja do obliczania NWW wielu liczb
function multipleLCM (arr) {
  let result = arr[0]
  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i])
  }
  return result
}

function parseRow (row) {
  const split1 = row.split(' = ')
  const split2 = split1[1].replace('(', '').replace(')', '').split(', ')

  return [split1[0], split2[0], split2[1]]
}

function generateMap () {
  let all = {}

  const findNode = (value) => {
    if (all[value]) {
      return all[value]
    }
    return {
      value,
      left: undefined,
      right: undefined,
    }
  }

  const fillNodeForExisting = (newNode) => {
    for (const [, node] of Object.entries(all)) {
      if (node.left.value === newNode.value) {
        node.left = newNode
      }
      if (node.right.value === newNode.value) {
        node.right = newNode
      }
    }
  }

  const firstRow = parseRow(table[0])
  all[firstRow[0]] = {
    value: firstRow[0],
    left: findNode(firstRow[1]),
    right: findNode(firstRow[2]),
  }

  for (let i = 1; i < table.length; i++) {
    const element = parseRow(table[i])
    let nodeL = findNode(element[1])
    let nodeR = findNode(element[2])
    const node = {
      value: element[0],
      left: nodeL,
      right: nodeR,
    }
    fillNodeForExisting(node)
    all[element[0]] = node
  }
  return all
}

export function main () {
  let all = generateMap()

  let nodes = {}

  const numbers = {}
  for (const [key, node] of Object.entries(all)) {
    if (key.at(2) === 'A') {
      nodes[key] = node
      numbers[key] = -1
    }
  }

  const allFine = () => {
    let fine = true
    for (const [, value] of Object.entries(numbers)) {
      if (value === -1) {
        fine = false
      }
    }
    return fine
  }

  const numberstoarray = () => {
    let num = []
    for (const [, value] of Object.entries(numbers)) {
      num.push(value)
    }
    return num
  }

  let steps = 1
  while (true) {
    for (let instruction of instructions) {
      let count = 0
      for (const [key,] of Object.entries(nodes)) {
        nodes[key] = instruction === 'R' ? nodes[key].right : nodes[key].left
        if (nodes[key].value.at(2) === 'Z') {
          numbers[key] = steps
          if (allFine()) {
            return multipleLCM(numberstoarray())
          }
          count++

        }
      }
      steps++
    }
  }
}