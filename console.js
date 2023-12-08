export const color = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  FgGray: '\x1b[90m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
  BgGray: '\x1b[100m',
}

export function log (text, c = color.FgWhite) {
  if(typeof text === 'object') {
    console.log(c + JSON.stringify(text) + color.FgWhite+ color.BgBlack)

  } else {
    console.log(c + text + color.FgWhite)
  }
}

export function consoleHighlightLine (string, start, end) {
  if (end === undefined) end = start
  return string.slice(0, start) + color.FgGreen + string.slice(start, end + 1) +
    color.FgWhite + string.slice(end + 1, string.length)
}

export function show (table) {
  for (let row = 0; row < table.length; row++) {
    let line = ''
    for (let col = 0; col < table[row].length; col++) {
      const el = table[row][col]
      const hi = this[row][col]
      if (hi === 'g') {
        line = line + color.BgGreen + el + color.BgBlack
      } else if (hi === 'r') {
        line = line + color.FgRed + el + color.FgWhite
      } else if (hi === 'b') {
        line = line + color.FgBlue + el + color.FgWhite
      } else if (hi === 'c') {
        line = line + color.FgCyan + el + color.FgWhite
      } else if (hi === 'y') {
        line = line + color.FgYellow + el + color.FgWhite
      } else if (hi === 'm') {
        line = line + color.FgMagenta + el + color.FgWhite
      } else {
        line += el
      }
    }
    console.log(line)
  }
}

export function replaceElementInString (row, start, end = undefined, mark = 'g') {
  const line = this[row]
  if (end === undefined) end = start
  this[row] = line.slice(0, start) + mark.repeat(end - start + 1) + line.slice(end + 1, line.length)
}

export function createDebugTable () {
  const debug = []
  debug.replaceElementInString = replaceElementInString
  debug.show = show
  return debug
}