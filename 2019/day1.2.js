const fs = require('fs')
const redsum = require('redsum')

const input = fs.readFileSync('day1.txt').toString()

const toNumbers = input => input.split('\n').map(s => parseInt(s, 10)).filter(n => Number.isInteger(n))

const numbers = toNumbers(input)
const getFuel = (mass, total = 0) => {
  const fuel = Math.floor(mass / 3) - 2
  if (fuel <= 0) return total;
  return  getFuel(fuel, total + fuel)
}
const sum = redsum(numbers, getFuel)
console.log(sum)