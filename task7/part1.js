import { readFileToTableOfStrings } from '../util.js'

const table = readFileToTableOfStrings('task7/input.txt')
const game = table.map(t => {
  const el = t.split(' ')
  return {
    cards: el[0],
    bid: Number(el[1]),
  }
})

function sortFunctionSymbol (s1, s2) {
  const map = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
  }
  if (map[s1] < map[s2]) return 1
  else if (map[s1] > map[s2]) return -1
  else return 0
}

function findSameIndex (string, same) {
  for (let i = 0; i < string.length; i++) {
    let count = 1
    for (let j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        count++
      }
    }
    if (count === same) return i
  }
}

function findSame (string, same) {
  for (let i = 0; i < string.length; i++) {
    let count = 1
    for (let j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        count++
      }
    }
    if (count === same) return true
  }
  return false
}

const type = {
  ifFive: (hand) => /^(\S)\1*$/.test(hand),
  ifFour: (hand) => findSame(hand, 4),
  ifFullHouse: (hand) => {
    let index = findSameIndex(hand, 3)
    if (index !== undefined) {
      return findSame(hand.replaceAll(hand[index], ''), 2)
    }
    return false
  },
  ifThree: (hand) => findSame(hand, 3),
  ifTwoPairs: (hand) => {
    let index = findSameIndex(hand, 2)
    if (index !== undefined) {
      return findSame(hand.replaceAll(hand[index], ''), 2)
    }
    return false
  },
  ifTwo: (hand) => findSame(hand, 2),
  ifOne: (hand) => /^(?!.*(.).*\1)/.test(hand),
}

function determineType (hand) {
  if (type.ifFive(hand)) return 7
  if (type.ifFour(hand)) return 6
  if (type.ifFullHouse(hand)) return 5
  if (type.ifThree(hand)) return 4
  if (type.ifTwoPairs(hand)) return 3
  if (type.ifTwo(hand)) return 2
  if (type.ifOne(hand)) return 1
  return 'errror'
}

function sortCards (c1, c2) {
  const t1 = determineType(c1.cards)
  const t2 = determineType(c2.cards)

  if (t1 < t2) return 1
  else if (t1 > t2) return -1

  for (let i = 0; i < c1.cards.length; i++) {
    const sort = sortFunctionSymbol(c1.cards[i], c2.cards[i])
    if (sort !== 0) return sort
  }
  return 0
}

export function main () {
  let result = 0
  let multiplier = game.length
  game.sort(sortCards)
  for (let hand of game) {
    result += multiplier * hand.bid
    multiplier--
  }
  return result
}