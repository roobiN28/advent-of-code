import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task5/input.txt')
let counter = 0

let seeds
let seedsCopy
let line
let category

export function main () {
  while (line = broadbandLines.next()) {
    line = line.toString('ascii')

    if (line.includes('seeds: ')) {
      seeds = line.split(':')[1].trim().split(' ').map(seed => Number(seed))
      seedsCopy = line.split(':')[1].trim().split(' ').map(seed => Number(seed))
    } else if (line.includes('-')) {
      category = line
    } else if (line.length === 1) {
    } else {
      const split = line.split(' ')
      const destination = Number(split[0])
      const source = Number(split[1])
      const range = Number(split[2])

      for (let i = 0; i < seeds.length; i++) {
        if (seedsCopy[i] !== category && source <= seeds[i] && seeds[i] < source + range) {
          seeds[i] = seeds[i] - source + destination
          seedsCopy[i] = category
        }
      }
    }
  }

  return seeds.sort().pop()
}
