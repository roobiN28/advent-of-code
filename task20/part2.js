import { deepCopy, readFileToTableOfStrings } from '../util.js'

const HIGH = 'H'
const LOW = 'L'
const BROADCASTER = 'broadcaster'
const FLIP_FLOP = '%'
const CONJUNCTION = '&'
const ON = true
const OFF = false
const modules = {}
let finalResult = 0

function loadModules () {
  let list_raw = readFileToTableOfStrings('task20/input.txt')
  list_raw.forEach(el => {
    const split = el.split(' -> ')
    const receivers = split[1].split(', ')
    if (split[0] === BROADCASTER) {
      modules[BROADCASTER] = {
        type: BROADCASTER,
        receivers,
      }
    } else {
      modules[split[0].slice(1, split[0].length)] = {
        type: split[0].at(0),
        mode: OFF,
        lasts: {},
        receivers,
      }
    }
  })

  Object.keys(modules).filter(key => modules[key].type === CONJUNCTION).map(key => {
    Object.keys(modules).filter(keyFind => modules[keyFind].receivers.includes(key)).map(related => {
      modules[key].lasts[related] = LOW
    })
  })
}

let rail = []

function runRail () {
  const railCopy = deepCopy(rail)
  rail = []
  for (let r of railCopy) {
    if (finalResult) break
    handle(r)
  }
}

const res = {}

function handle (r) {
  const module = modules[r.module]
  if (module === undefined) return
  if (module.type === BROADCASTER) {
    module.receivers.map(rec => rail.push({ module: rec, pulse: r.pulse, last: r.module }))
  } else if (module.type === FLIP_FLOP) {
    if (r.pulse === LOW) {
      module.mode = module.mode === ON ? OFF : ON
      module.receivers.map(rec => rail.push({ module: rec, pulse: module.mode === ON ? HIGH : LOW, last: r.module }))
    }
  } else if (module.type === CONJUNCTION) {
    module.lasts[r.last] = r.pulse
    const ppulse = Object.values(module.lasts).every(l => l === HIGH) ? LOW : HIGH
    if (r.module === 'rg' && r.pulse === HIGH) {
      res[r.last] = i
      if (Object.values(res).length === 4) {
        finalResult = Object.values(res).reduce((a, c) => a * c, 1)
      }
    }
    module.receivers.map(rec => rail.push(
      { module: rec, pulse: ppulse, last: r.module }))
  }
}

function railCycle () {
  rail.push({ module: BROADCASTER, pulse: LOW, last: 'button' })
  while (rail.length > 0 && !finalResult) {
    runRail()
  }
}

const PUSH_TIMES = 100000
let i

export function main () {
  loadModules()
  for (i = 1; i <= PUSH_TIMES; i++) {
    if (finalResult) break
    railCycle()
  }
  return finalResult
}