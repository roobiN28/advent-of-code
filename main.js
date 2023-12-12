import { color, log } from './console.js'
import { performance } from 'perf_hooks'

run(11, 2)
// double for shortcuts
// await runAll()

async function run (task, part) {
  const { main } = await import((`./task${task}/part${part}.js`))

  before()
  const result = main()
  log(`Task:${task}, Part:${part}, Result: ` + result, color.FgMagenta)
  after()
  return result
}

async function runAll () {
  for (let task = 1; task < 30; task++) {
    for (let part = 1; part <= 2; part++) {
      try {

        if (await run(task, part) !== correctResults()[task][part]) {
          log(`Task:${task}, Part:${part},Correct: ` + correctResults()[task][part] + '\n\n', color.FgRed)
        }

      } catch (e) {
        break
      }
    }
  }
}

function correctResults () {
  return {
    1: { 1: 54824, 2: 54824 },
    2: { 1: 2006, 2: 84911 },
    3: { 1: 537811, 2: 75741499 },
    4: { 1: 25010, 2: 9924412 },
    5: { 1: 88151870, 2: 2008785 },
    6: { 1: 5133600, 2: 40651271 },
    7: { 1: 247961593, 2: 248750699 },
    8: { 1: 21797, 2: 23977527174353 },
    9: { 1: 1972648895, 2: 919 },
    10: { 1: 6714, 2: 429 },
    11: { 1: 9769724, 2: 603020563700 },
  }
}

function before () {
  performance.mark('start')
}

function after () {
  performance.mark('end')
  const memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100
  let timeDiff = performance.measure('', 'start', 'end').duration

  log(`Memory: ${memory} MB ${(timeDiff / 1000).toFixed(2)}s\n`, color.FgGray)
}