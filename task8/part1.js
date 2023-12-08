import { readFileToTableOfStrings } from '../util.js'

const table = readFileToTableOfStrings('task8/input.txt')
const instructions = table.shift()

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
  return all['AAA']
}

export function main () {
  let node = generateMap()
  let steps = 0
  let findedZZZ = false
  while (findedZZZ === false) {
    for (let instruction of instructions) {
      node = instruction === 'R' ? node.right : node.left
      steps++
      if (node.value === 'ZZZ') {
        return steps
      }
    }
  }

  return 0
}


