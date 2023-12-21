import { deepCopy, readFileToTableOfStrings } from '../util.js'

const HIGH = 'H'
const LOW = 'L'
const BROADCASTER = 'broadcaster'
const FLIP_FLOP = '%'
const CONJUNCTION = '&'
const ON = true
const OFF = false
const modules = {}
let highPulsCount
let lowPulsCount

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
    handle(r)
  }
}

function handle (r) {
  r.pulse === HIGH ? highPulsCount++ : lowPulsCount++
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
    module.receivers.map(rec => rail.push(
      { module: rec, pulse: Object.values(module.lasts).every(l => l === HIGH) ? LOW : HIGH, last: r.module }))
  }
}

function railCycle () {
  highPulsCount = 0
  lowPulsCount = 0
  rail.push({ module: BROADCASTER, pulse: LOW, last: 'button' })
  while (rail.length > 0) {
    runRail()
  }
}


export function main () {
  const PUSH_TIMES = 1000

  loadModules()

  let highCount = 0
  let lowCount = 0
  for (let i = 1; i <= PUSH_TIMES; i++) {
    railCycle()
    highCount += highPulsCount
    lowCount += lowPulsCount

  }
  return highCount * lowCount
}