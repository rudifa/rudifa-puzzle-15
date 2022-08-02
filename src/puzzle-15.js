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
        font-size: 14px;
      }
      .square-button {
        height: 5rem;
        width: 5rem;
      }
    `;
  }

  //@internalProperty() name = 'World';

  @state() count = 0;
  @state() squares = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
  ];
  @state() model = new Puzzle15Model(16);

  showRow(rowIdx) {
    let size = this.model.size;
    let row = this.model.grid.slice(rowIdx * size, (rowIdx + 1) * size);
    return html`<div>${row.map((i) => this.button(i))}</div>`;
  }

  showModel = () => {
    let size = this.model.size;
    let rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(this.showRow(i));
    }
    return html`<div>${rows}</div>`;
  };

  // id should define the position in grid
  // value displayed should be the value of the square
  button = (i) => {
    let j = parseInt(i);
    return html`<button
      id="${i}"
      class="square-button"
      @click="${this._onClick2}">
      ${i}
    </button>`;
  };

  render() {
    return html`
      <br />
      <div>
        <button @click=${this._onClick} part="button">New Game</button>

        <button @click=${this._onClick3} part="button">Test</button>
      </div>
      <br />
      <div>${this.showModel()}</div>
    `;
  }

  _onClick(e) {
    this.count++;
    console.log(`_onClick`, e);
  }
  _onClick2(e) {
    console.log(`_onClick2`, e.target.id);
  }

  _onClick3 = (event) => {
    console.log(event.target);
    this.model.swap(0, 1);
    console.log(`model: ${this.model.grid}`);
    this.requestUpdate();
  };
}

// TODO change squares to 1-d array
// button: display current value of squares (0-15)
