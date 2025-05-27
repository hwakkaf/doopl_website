
import { html } from '@popeindustries/lit-html-server';
import {dooplMenu} from './doopl-menu.js'
import {login} from './doopl-login.js'

export const header = data => {
  let { vocab, settings, menubars, global, location } = data

  return html`
  <header class="header flex-hor-in-st">
    <div class="header-start">
      <img class="header-logo" src=${global.logo.url} width="150" height="44" />
    </div>
    <div class="header-center">
      ${dooplMenu({data, name: 'doopl'})}
    </div>
    <div class="header-end">
      ${login(data)}
      ${dooplMenu({data,name: 'login'})}
      <a href="/" download>
        <button class="doopl-button action-button header-download-button">download app</button>
      </a>
    </div>
    
  </header>
`;
}