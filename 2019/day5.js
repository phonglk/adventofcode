const fs = require('fs')
const input = fs.readFileSync('day5.txt').toString().split(',')

function getParam(modes, input, state, p) {
  let val = input[state+p]
  if (!modes[p]) val = input[val]
  return parseInt(val)
}

function run(input, state = 0) {
  const ops = input[state]
  let op
  let modes = []
  if (ops.length > 2) {
    op = parseInt(ops.slice(-2), 10)
    const rem = ops.slice(0, ops.length - 2).split('').reverse().join('')
    for(let i = 0; i < 3; i++) {
      modes[i] = parseInt(rem[i] || '0')
    }
  } else {
    op = parseInt(ops, 10)
  }
  let jump = op === 3 ? 2 : 4
  console.log(input.slice(state, state+jump))
  const get = getParam.bind(null, modes, input, state)
  switch(op) {
    case 1:
      {
        const p1 = get(1)
        const p2 = get(2)
        const out = p1 + p2
        input[input[state+3]] = out.toString()
      }
      break;
    case 2:
      {
        const p1 = get(1)
        const p2 = get(2)
        const out = p1 * p2
        input[input[state+3]] = out.toString()
      }
      break;
    case 3:
      input[input[state+1]] = '1'
      jump = 2
      break;
    case 4:
      return input[input[state+1]]
    default: 
      throw new Error(`Invalid op ${op} @ state=${state}`)
  }
  return run(input, state + jump)
}
console.log(run(input))
// 2.1 =  10566835
// 2.2 = (19690720)


