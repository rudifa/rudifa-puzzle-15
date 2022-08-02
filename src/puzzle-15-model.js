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

  isEmpty(i) {
    return this.grid[i] == this.grid.length;
  }

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
    return neighbors;
  }

  isSolved() {
    for (let i = 0; i < this.size * this.size; i++) {
      if (this.grid[i] != i + 1) {
        return false;
      }
    }
    return true;
  }
}

// console.log('test');

// let model = new Puzzle15Model(16);
// console.log(model.grid);
// console.log(model.size);
// console.log(model.grid.length);
// console.log(model.grid[0]);
// model.swap(0, 1);
// console.log(model.grid);
