/** @prettier */

import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Puzzle15Model} from './puzzle-15-model.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
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
      button {
        font-size: 24px;
      }
      .square-button {
        height: 6rem;
        width: 6rem;
    `;
  }

  //@internalProperty() name = 'World';

  @state() count = 0;

  @state() model = new Puzzle15Model(16);

  showModel = () => {
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
      ${row.map((value, idx) => this.button(value, rowIdx * size + idx))}
    </div>`;
  }

  // id should define the position in grid
  // value displayed should be the value of the square
  button = (value, position) => {
    let empty = value == this.model.grid.length;
    return html`<button
      id="${position}"
      class="square-button"
      @click="${this._onClickTile}">
      ${empty ? '·' : value}
    </button>`;
  };

  render() {
    return html`
      <br />
      <div>
        <button @click=${this._onClickNewGame} part="button">New Game</button>
        <button part="button">${this.model.isSolved() ? 'Solved' : ' '}</button>
      </div>
      <br />
      <div>${this.showModel()}</div>
    `;
  }

  /* <button @click=${this._onClickTest} part="button">Test</button> */

  _onClickNewGame(e) {
    this.count++;
    console.log(`_onClick`, e);
    /* this.model.shuffle(); */
    this.model.scramble(100);
    this.requestUpdate();
  }

  _onClickTile(e) {
    console.log(`_onClick2`, e.target.id);
    this.model.move(parseInt(e.target.id));
    this.requestUpdate();
  }

  _onClickTest = (event) => {
    console.log(event.target);
    for (let i = 0; i < this.model.grid.length; i++) {
      this.model.randomMove();

      console.log(`model: ${this.model.grid}`);
      this.requestUpdate();
    }
  };
}

// TODO add randomMove(), test interactively
