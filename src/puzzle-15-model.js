// model
export class Puzzle15Model {
  constructor(numberOfSquares) {
    let size = Math.floor(Math.sqrt(numberOfSquares));
    this.size = size;
    this.grid = []; // one dimensional array size*size of squares
    this.init();
  }

  init() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.grid[i] = i + 1;
    }
    // this.shuffle();
  }

  swap(i, j) {
    let temp = this.grid[i];
    this.grid[i] = this.grid[j];
    this.grid[j] = temp;
  }

  // makes random swaps, may end in an unsolvable state
  shuffle() {
    for (let i = 0; i < this.size * this.size; i++) {
      let j = Math.floor(Math.random() * this.size * this.size);
      let temp = this.grid[i];
      this.grid[i] = this.grid[j];
      this.grid[j] = temp;
    }
  }

  // makes random moves but preserving the solvabilitsy of the puzzle
  shuffle2() {
    for (let i = 0; i < this.size * this.size * this.size; i++) {
      let j = Math.floor(Math.random() * this.size * this.size);
      this.move(j);
    }
  }

  move(i) {
    for (const item of this.neighbors(i)) {
      if (this.isEmpty(item)) {
        this.swap(i, item);
        return;
      }
    }
  }

  randomMove() {
    let emptyIdx = this.findEmpty();
    let neighbors = this.neighbors(emptyIdx);
    let randomIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    this.swap(emptyIdx, randomIdx);
  }

  isEmpty(i) {
    return this.grid[i] == this.grid.length;
  }

  // return the array of indices of neighbors of the given index
  neighbors(i) {
    let neighbors = [];
    let row = Math.floor(i / this.size);
    let col = i % this.size;
    if (row > 0) {
      neighbors.push(i - this.size);
    }
    if (row < this.size - 1) {
      neighbors.push(i + this.size);
    }
    if (col > 0) {
      neighbors.push(i - 1);
    }
    if (col < this.size - 1) {
      neighbors.push(i + 1);
    }
    return neighbors.sort((a, b) => a - b);
  }

  isSolved() {
    for (let i = 0; i < this.size * this.size; i++) {
      if (this.grid[i] != i + 1) {
        return false;
      }
    }
    return true;
  }

  distance(i) {
    let row = Math.floor(i / this.size);
    let col = i % this.size;
    let value = this.grid[i] - 1; // values are 1-based
    let valrow = Math.floor(value / this.size);
    let valcol = value % this.size;
    let dist = Math.abs(row - valrow) + Math.abs(col - valcol);
    return dist;
  }

  totalDistance() {
    let total = 0;
    for (let i = 0; i < this.size * this.size; i++) {
      total += this.distance(i);
    }
    return total;
  }

  findEmpty() {
    for (let i = 0; i < this.size * this.size; i++) {
      if (this.isEmpty(i)) {
        return i;
      }
    }
  }

  scramble(n) {
    for (let i = 0; i < n; i++) {
      this.randomMove();
    }
  }

  toJson() {
    return JSON.stringify(this.grid);
  }

  fromJson(json) {
    this.grid = JSON.parse(json);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
