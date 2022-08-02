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

  shuffle() {
    for (let i = 0; i < this.size * this.size; i++) {
      let j = Math.floor(Math.random() * this.size * this.size);
      let temp = this.grid[i];
      this.grid[i] = this.grid[j];
      this.grid[j] = temp;
    }
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
