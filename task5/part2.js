import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task5/input.txt')

let seeds
let line
let almanacRaw = []

while (line = broadbandLines.next()) {
  line = line.toString('ascii')

  if (line.includes('seeds: ')) {
    seeds = line.split(':')[1].trim().split(' ').map(seed => Number(seed))
  } else if (line.includes('-')) {
    almanacRaw.push(line.replace('\r', ''))
  } else if (line.length === 1) {
  } else {
    almanacRaw.push(line.replace('\r', ''))
  }

}

const almanac = []
let temp = []
for (let i = almanacRaw.length - 1; i >= 0; i--) {
  if (almanacRaw[i].includes('-')) {
    almanac.push(temp)
    temp = []
  } else {
    const split = almanacRaw[i].split(' ')
    const destination = Number(split[0])
    const source = Number(split[1])
    const range = Number(split[2])

    temp.push(
      {
        destination, source, range,
      },
    )
  }
}
almanac.forEach((innerArray) => {
  innerArray.sort((a, b) => a.destination - b.destination)
})


function checkFromEnd (location) {
  let reverse = location
  for (let i = 0; i < almanac.length; i++) {
    for (let map of almanac[i]) {
      if (reverse >= map.destination && reverse < (map.destination + map.range)) {
        reverse = reverse - map.destination + map.source
        break
      }
    }

  }
  return reverse
}

function isInSeed (check) {
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i]
    const range = seeds[i + 1]
    if (check >= start && check < start + range) {
      return true
    }
  }
  return false
}

function checkAllLocations () {
  let lowest = Number.MAX_VALUE
  for (let row of almanac[0]) {
    for (let location = row.destination; location < row.destination + row.range; location++) {
      const seed = checkFromEnd(location)
      if (location < lowest) {
        if (isInSeed(seed)) {
          return lowest = location
        }
      }
    }
  }
}

console.log('end of file.')
const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(
  `The script uses approximately ${Math.round(used * 100) / 100} MB`)

console.log( checkAllLocations())