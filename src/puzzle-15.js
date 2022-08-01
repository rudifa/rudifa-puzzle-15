/** @prettier */

import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

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

  //${this.squares[Math.floor(j / 4)][j % 4]}

  line = (lineData) => {
    return lineData.map((i) => html`${this.button(i)}`);
  };

  game = () => {
    return this.squares.map((lineData) => {
      //console.log(`lineData: ${lineData}`);
      return html`<div>${this.line(lineData)}</div> `;
    });
  };

  render() {
    // <button class="square-button"></button>
    // <button class="square-button"></button>ß
    //  console.log(this.squares);
    //    console.log(this.line(this.squares[0]));

    // ${this.squares.map(
    //   (i) => html`<button class="square-button">${i}</button>`
    // )}

    // ${this.line(this.squares[0])}

    return html`
      ${this.game()}

      <div>
        <br />
        <button @click=${this._onClick} part="button">New Game</button>
      </div>
      <div>${this.button('test')}</div>
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
  };
}

// TODO change squares to 1-d array
// button: display current value of squares (0-15)
