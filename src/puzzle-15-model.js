/**
 * Puzzle 15 model.
 * @constructor
 * @param {number} numberOfSquares - Determines the size of the grid.
 *
 * @example
 * let model = new Puzzle15Model(16); - creates a 4x4 grid.
 *
 */
export class Puzzle15Model {
  constructor(numberOfSquares) {
    let size = Math.floor(Math.sqrt(numberOfSquares || 16));
    this.size = size;
    this.grid = []; // one dimensional array size*size of squares
    this.init();
  }

  // this.grid represents the state of the puzzle.
  // this.grid[i] is the value of the square at position i.
  // in initial a.k.a. solved state, this.grid[i] == i + 1 for all i.
  // this.grid[i] == this.size*this.size + 1 represents the empty square.

  init() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.grid[i] = i + 1;
    }
  }

  _swap(i, j) {
    [this.grid[i], this.grid[j]] = [this.grid[j], this.grid[i]];
  }

  // move the square to the neighbouring empty position (if any)
  move(i) {
    for (const item of this.neighbors(i)) {
      if (this._isEmpty(item)) {
        this._swap(i, item);
        return;
      }
    }
  }

  // move a randomly selected neighbour into the empty position
  randomMove() {
    let emptyIdx = this.findEmpty();
    let neighbors = this.neighbors(emptyIdx);
    let randomIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    this._swap(emptyIdx, randomIdx);
  }

  // return true if the empty square is at position i
  _isEmpty(i) {
    return this.grid[i] == this.grid.length;
  }

  // return row, col for index i
  rowCol(i) {
    return [Math.floor(i / this.size), i % this.size];
  }

  // return the array of indices of neighbors of the given index
  neighbors(i) {
    let neighbors = [];
    let [row, col] = this.rowCol(i);
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

  // return true if all values are in their initial positions
  isSolved() {
    return this.totalDistance() == 0;
  }

  // the distance between the current position and the initial position
  distance(i) {
    let [row, col] = this.rowCol(i);
    let val0 = this.grid[i] - 1; // values are 1-based
    let [valrow, valcol] = this.rowCol(val0);
    return Math.abs(row - valrow) + Math.abs(col - valcol);
  }

  // the sum of distances of all nonempty squares from their initial positions
  totalDistance() {
    let total = 0;
    for (let i = 0; i < this.size * this.size; i++) {
      if (!this._isEmpty(i)) {
        total += this.distance(i);
      }
    }
    return total;
  }

  // return the index of the empty square
  findEmpty() {
    for (let i = 0; i < this.size * this.size; i++) {
      if (this._isEmpty(i)) {
        return i;
      }
    }
  }

  // scramble the puzzle by making n random moves
  scramble(n) {
    for (let i = 0; i < n; i++) {
      this.randomMove();
    }
  }

  // return a string representation of the puzzle
  toJson() {
    return JSON.stringify(this.grid);
  }

  // initialize the puzzle from a string representation
  fromJson(json) {
    this.grid = JSON.parse(json);
  }
}
