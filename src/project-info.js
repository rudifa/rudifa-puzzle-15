/** @prettier */

import {html, css, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

/**
 * ProjectInfo component
 */
@customElement('project-info')
export class ProjectInfo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
        font-size: 16px;
      }
      p,
      a {
        font-size: 16px;
        font-family: sans-serif;
      }
    `;
  }

  aHref(url, text) {
    return html` <a href=${url} class="link" target="_blank">${text} </a>`;
  }

  render() {
    return html`
      <p>
        Experiments in sharing a game state in a peer-to-peer network.
        <br /><br />
        Open the game link in several browser tabs, browsers and devices to see
        the game state sharing in action.
      </p>
      ${this.aHref('https://github.com/rudifa/rudifa-puzzle-15', 'Source code')}
      <slot></slot>
    `;
  }
}
