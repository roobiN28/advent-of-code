import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task6/input.txt')
let points = 0
let race = {}

function loadRaces () {
  let line1 = broadbandLines.next().toString('ascii').split(':')[1].trim().split(';').map(l => Number(l.trim()))
  let line2 = broadbandLines.next().toString('ascii').split(':')[1].trim().split(';').map(l => Number(l.trim()))
  line1 = line1.toString().replaceAll(',', '')
  line2 = line2.toString().replaceAll(',', '')
  race = {
    time: line1,
    distance: line2,
  }

}

loadRaces()

function countDistance (holdTime, raceTime) {
  return (raceTime - holdTime) * holdTime
}

export function main () {

  for (let holdTime = 0; holdTime <= race.time; holdTime++) {
    if (countDistance(holdTime, race.time) > race.distance) {
      points++
    }
  }
  return points
}