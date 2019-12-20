const CHAR_WALL = '#';
const CHAR_PATH = '.';

const isValid = (char: string) => [CHAR_PATH, CHAR_WALL].indexOf(char) > -1;

class GNode {
  private nexts: [] = [];
  constructor(private name: string, private position: Position) {
    this.explore();
  }

  public explore(step = 0) {
    // const { position, charMap } = this;
    // const [i, j] = position;
    // if (charMap[i][j+1] === )
  }

  toString() {
    return `${this.name}: ${this.position.i}, ${this.position.j}`
  }
}

class CharMap {
  private lines: string[] = [];
  constructor(mazeString: string) {
    this.lines = mazeString.split('\n').filter((line) => line.trim() !== '');
  }

  each(fn: (pos: Position) => void) {
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]
      for (let j = 0; j < line.length; j++) {
        const pos = new Position(this, [i, j])
        fn(pos)
      }
    }
  }

  getValueAt(i, j) { return this.lines[i].charAt(j) }
}

class Position {
  constructor(private charMap: CharMap, private position: number[]) {}
  get i() { return this.position[0]}
  get j() { return this.position[1]}
  get value() {
    const [i, j] = this.position
    return this.charMap.getValueAt(i, j)
  }
  get isWall() { return this.value === CHAR_WALL }
  get isPath() { return this.value === CHAR_PATH }
  get isAZ() { return /\w/.test(this.value) }
  get up() {
    const [i, j] = this.position
    return new Position(this.charMap, [i-1, j])
  }
  get down() {
    const [i, j] = this.position
    return new Position(this.charMap, [i+1, j])
  }
  get left() {
    const [i, j] = this.position
    return new Position(this.charMap, [i, j-1])
  }
  get right() {
    const [i, j] = this.position
    return new Position(this.charMap, [i, j+1])
  }
}

function parseMaze(mazeString: string) {
  const charMap = new CharMap(mazeString)
  const nodes = [];

  

  charMap.each((pos) => {
    const addNode = (name) => nodes.push(new GNode(name, pos));
    if (pos.isPath) {
      if (pos.up.isWall) {
        if (pos.left.isAZ) { addNode(pos.left.left.value + pos.left.value)
        } else if (pos.right.isAZ) { addNode(pos.right.value + pos.right.right.value) }
      } else if (pos.left.isWall) {
        if (pos.up.isAZ) { addNode(pos.up.up.value + pos.up.value)
        } else if (pos.down.isAZ) { addNode(pos.down.value + pos.down.value)}
      }
    }
  })

  return nodes;
}

console.log(parseMaze(`
         A
         A
  #######.#########
  #######.........#
  #######.#######.#
  #######.#######.#
  #######.#######.#
  #####  B    ###.#
BC...##  C    ###.#
  ##.##       ###.#
  ##...DE  F  ###.#
  #####    G  ###.#
  #########.#####.#
DE..#######...###.#
  #.#########.###.#
FG..#########.....#
  ###########.#####
             Z
             Z
`).map(node => node.toString()));
