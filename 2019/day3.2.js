const fs = require('fs')
const DIR = {
  U: [+1,+0],
  D: [-1,+0],
  R: [+0,+1],
  L: [+0,-1]
}
const parseWire = w => w.split(',').map(s => [s[0], parseInt(s.slice(1))]);
const read = () => {
  const file = fs.readFileSync('day3.txt').toString()
  const [w1,w2] = file.split('\n')
  return [parseWire(w1), parseWire(w2)]
}

const [w1, w2] = read()
const board = {}
let closestDist = Infinity

// flag the cell, assume there are only 2 flags: a & b
function set(x, y, flag, step) {
  if (!board[x]) board[x] = {}
  if (!board[x][y]) board[x][y] = {a: 0, b: 0}
  const p = board[x][y]
  p[flag] = step
  if (p.a > 0 && p.b > 0) {
    const dist = p.a + p.b
    console.log({x, y, dist})
    closestDist = Math.min(closestDist, dist)
  }
}

function layWire(w, flag) {
  let pos = [0, 0]
  let step = 0
  w.forEach(([dir, l]) => {
    for(let i = 1; i <= l; i++) {
      step++
      const x = pos[0] + DIR[dir][0]
      const y = pos[1] + DIR[dir][1]
      set(x, y, flag, step)
      pos = [x, y]
    }
  })
}

layWire(w1, 'a')
layWire(w2, 'b')
console.log(closestDist)
