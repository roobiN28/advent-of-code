import { readFileToTable } from '../util.js'

const table = readFileToTable('task9/input.txt', ' ')

function extrapolate (sequence) {
  if (sequence.every(value => value === 0)) {
    return 0
  }
  const nextSequence = []
  for (let i = 0; i < sequence.length - 1; i++) {
    nextSequence.push(sequence[i + 1] - sequence[i])
  }
  return sequence[0] - extrapolate(nextSequence)
}

export function main () {

  let sum = 0
  for (let sequence of table) {
    const value = extrapolate(sequence)
    sum += value
  }

  return sum
}

// to high: 21433
