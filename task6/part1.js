import LineByLineReader from 'n-readlines'

const broadbandLines = new LineByLineReader('task6/input.txt')
let points = 1
let line
const races = []

function loadRaces () {
  let line1 = broadbandLines.next().toString('ascii').split(':')[1].trim().split(';').map(l => Number(l.trim()))
  let line2 = broadbandLines.next().toString('ascii').split(':')[1].trim().split(';').map(l => Number(l.trim()))
  for (let i = 0; i < line1.length; i++) {
    races.push({
      time: line1[i],
      distance: line2[i],
    })
  }
}

loadRaces()

function countDistance (holdTime, raceTime) {
  return (raceTime - holdTime) * holdTime
}

export function main () {
  for (let race of races) {
    let win = 0
    for (let holdTime = 0; holdTime <= race.time; holdTime++) {
      if (countDistance(holdTime, race.time) > race.distance) {
        // console.log(race, holdTime, distance)
        win++
      }
    }
    points *= win
  }
  return points
}
