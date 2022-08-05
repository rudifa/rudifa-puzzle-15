/** @prettier */

import {html, css, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {Puzzle15Model} from './puzzle-15-model.js';

/**
 * Implementation of the Puzzle 15.
 */
@customElement('puzzle-15')
export class Puzzle15 extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
        font-size: 16px;
      }
      .button {
        font-size: 20px;
        min-width: 11.8rem;
      }
      .square {
        height: 6rem;
        width: 6rem;
        font-size: 28px;
        border-radius: 5px;
      }
      @media screen and (max-width: 640px) {
        .button {
          font-size: 20px;
          min-width: 9.7rem;
        }
        .square {
          height: 5rem;
          width: 5rem;
          font-size: 28px;
          border-radius: 5px;
        }
      }
      .empty {
        color: #00000000;
        background-color: #00000000;
      }
    `;
  }

  @state() model = new Puzzle15Model(16);

  showPuzzle = () => {
    let size = this.model.size;
    let rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(this.showRow(i));
    }
    return html`<div>${rows}</div>`;
  };

  showRow(rowIdx) {
    let size = this.model.size;
    let row = this.model.grid.slice(rowIdx * size, (rowIdx + 1) * size);

    return html`<div>
      ${row.map((value, idx) => this.squareButton(value, rowIdx * size + idx))}
    </div>`;
  }

  render() {
    return html`
      <div>
        <div>${this.showPuzzle()}</div>
        <br />
        ${this.newGameButton()} ${this.solvedButton()}
      </div>
      <br />
    `;
  }

  // id defines the position in grid
  // value displayed is the value of the square
  squareButton = (value, position) => {
    let empty = value == this.model.grid.length;
    return html`<button
      id="${position}"
      class=${empty ? 'empty square' : 'square'}
      @click="${this._onClickSquare}">
      ${value}
    </button>`;
  };

  newGameButton() {
    return html`<button @click=${this._onClickNewGame} class="button">
      Scramble
    </button>`;
  }

  solvedButton() {
    let totalDistance = this.model.totalDistance();
    return html`<button class="button">
      ${this.model.isSolved() ? 'Solved!' : totalDistance}
    </button>`;
  }

  _onClickSquare(e) {
    console.log(`_onClick2`, e.target.id);
    this.model.move(parseInt(e.target.id));
    this.requestUpdate();
    if (this.model.isSolved()) {
      this.play();
    }
  }

  _onClickNewGame(e) {
    console.log(`_onClick`, e);
    this.model.scramble(200);
    this.requestUpdate();
  }

  // for development only
  _onClickTest = (event) => {
    console.log(event.target);
    for (_ of this.model.grid) {
      this.model.randomMove();
      console.log(`model: ${this.model.grid}`);
      this.requestUpdate();
    }
  };

  play() {
    const audio = new Audio('/cymbal.wav');
    audio.play();
  }
}
