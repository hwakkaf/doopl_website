
import { html } from '@popeindustries/lit-html-server';
import { svg } from '../svg/svg.js';

export const select = config => {
  let { data, current, icon } = config || {}
  if (!data) data = [];
  return html`
    <nav class="doopl-select">
      <!-- Selected option display -->
      <button class="select-button narrative-select" aria-expanded="false">
        ${svg[icon]('select-icon')}
        <span class="select-text">${current}</span>
        ${svg.selectArrow("select-arrow")}
      </button>
      <!-- Dropdown options -->
      <ul class="select-options">
        ${data.map(option => html`<li><a href="#" class="select-option">${option.displayName}</a></li>`)}
      </ul>
    </nav>
  `;
}