const start = 197487
const end = 673251

class Num {
  constructor(n) {
    this.length = 6 // assumption
    this.digits = new Array(this.length)
    let rem = n
    for(let i = 5; i >= 0; i--) {
      const pow = Math.pow(10, i)
      const dValue = ~~(rem / pow)
      rem %= pow
      this.digits[this.length - 1 - i] = dValue
    }
  }
  get value () {
    return this.digits.reduce((sum, dig, i) => sum + Math.pow(10, this.digits.length - 1 - i) * dig, 0)
  }
}

/**
 * 
 * @param {Num} num 
 * @returns boolean
 */
function checkAdjacent(num) {
  let prev = num.digits[0]
  for(let i = 1; i < 6; i++) {
    const d = num.digits[i]
    if (d === prev) return true;
    prev = d
  }
  return false
}

/**
 * 
 * @param {Num} num 
 * @returns boolean
 */
function checkDecrease(num) {
  let prev = num.digits[0]
  for(let i = 1; i < 6;i ++) {
    if (num.digits[i] < prev) return false
    prev = num.digits[i]
  }
  return true
}

/**
 * 
 * @param {Num} num 
 * @returns object
 */
function checkAdjacent2(num) {
  let isDoubleExist = false
  let adjCount = 0
  let prev = num.digits[0]
  for(let i = 1; i < 6; i++) {
    const d = num.digits[i]
    if (d === prev) {
      adjCount++
    } else {
      if (adjCount === 1) isDoubleExist = true
      adjCount = 0
    }
    prev = d
  }
  return isDoubleExist || adjCount === 1
}

function check(fns) {
  let count = 0
  for(let i = start; i <= end; i++)   {
    const num = new Num(i)
    if (fns.every(fn => fn(num))) count++
  }
  console.log(count)
}

check([checkAdjacent, checkDecrease])
check([checkAdjacent2, checkDecrease])

// Test
// console.log(checkAdjacent(new Num(122456)))
// console.log(checkDecrease(new Num(122426)))
// console.log(checkAdjacent2(new Num(112233)))
// console.log(checkAdjacent2(new Num(123444)))
// console.log(checkAdjacent2(new Num(111122)))