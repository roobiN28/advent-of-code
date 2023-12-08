import { color, log } from './console.js'
import { performance } from 'perf_hooks'

// run(8, 1)

await runAll()

async function run (task, part) {
  const { main } = await import((`./task${task}/part${part}.js`))

  before()
  const result = main()
  log(`Task:${task}, Part:${part}, Result: ` + result, color.FgMagenta)
  after()
}

async function runAll () {
  for (let i = 1; i < 30; i++) {
    try {
      await run(i, 1)
      await run(i, 2)
    } catch (e) {
      break
    }
  }
  /*await run(1, 2)
  await run(2, 1)
  await run(2, 2)
  await run(3, 1)
  await run(3, 2)
  await run(4, 1)
  await run(4, 2)
  await run(5, 1)
  await run(5, 2)
  await run(6, 1)
  await run(6, 2)
  await run(7, 1)
  await run(7, 2)
  await run(8, 1)
  await run(8, 2)*/
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