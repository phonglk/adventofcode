const map = 
`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`

class SpaceMap {
  constructor(str) {
    this.asteroids = [] // list of asteroids and their associated coordinates
    this.coordRef = {}  // quick ref to any coord
    this.maxX = 0
    this.maxY = 0
    str
      .split('\n')
      .map(s => s.trim(s))
      .filter(s => s !== '')
      .map((line, y) => {
        this.maxY = Math.max(this.maxY, y)
        line.split('').forEach((c, x) => {
          this.maxX = Math.max(this.maxX, x)
          if (c === '#') {
            const coord = [x, y]
            this.asteroids.push(coord)
            let xref = this.coordRef[x]
            if (!xref) xref = this.coordRef[x] = {}
            xref[y] = coord
          }
        })
      })
  }

  isAsteroidAt(x, y) {
    return new Boolean(this.coordRef[x] && this.coordRef[x][y])
  }

  getLineEquation([x1, y1], [x2, y2]) {
    const xdiff = x2 - x1
    if (xdiff === 0) return { x: x1 }
    const slope = (y2 - y1)/xdiff
    // y = mx + b => b = y - mx
    const yi = y1 - slope*x1
    return {sl: slope, yi, x: false}
  }

  getBtwAsteroids(p1, p2) {
    const line = this.getLineEquation(p1, p2)
    const [minX, maxX, minY, maxY] = [
      Math.min(p1[0], p2[0]),
      Math.max(p1[0], p2[0]),
      Math.min(p1[1], p2[1]),
      Math.max(p1[1], p2[1]),
    ]
    const asts = []
    for(let p of this.asteroids) {
      if (comp(p, p1) || comp(p, p2)) continue;
      if (!(p[0] >= minX && p[0] <= maxX && p[1] >= minY && p[1] <= maxY)) continue;
      if (this.isOnLine(line, p)) {
        asts.push(p)
      }
    }
    return asts
  }

  isOnLine({sl, yi, x: lineX}, [x, y]) {
    if (lineX !== false) {
      return x === lineX
    }
    // console.log({sl, yi, lineX, x, y })
    return y === sl*x + yi
  }

  bestLocation () {
    let max = 0
    let maxLoc = null
    for(let p of this.asteroids) {
      let count = 0;
      for(let p2 of this.asteroids) {
        if (p2 === p) continue;
        const inBtw = this.getBtwAsteroids(p, p2).length
        // console.log(p, '->', p2, inBtw)
        if ( inBtw === 0) count++
      }
      // console.log(p, count)
      if (count > max || maxLoc === null) {
        max = count
        maxLoc = p
      }
    }
    return [maxLoc, max]
  }
}

function comp(p1, p2) {
  return p1[0] === p2[0] && p1[1] === p2[1]
}

const sm = new SpaceMap(map)
// console.log(sm.getBtwAsteroids([0, 2], [4, 2]))
console.log(sm.bestLocation())