
import { html } from '@popeindustries/lit-html-server';
import {dooplMenu} from './doopl-menu.js'
import {login} from './doopl-login.js'

export const header = data => {
  let { vocab, settings, menubars, global, location } = data

  return html`
  <header class="header flex-hor-in-st">
    <div class="header-start">
      <img class="header-logo" src=${`${process.env.CMS_BASE_URL}${global.logo.url}`} width="150" height="44" />
    </div>
    <div class="header-center">
      ${dooplMenu(data,'doopl')}
    </div>
    <div class="header-end">
      ${login(data)}
      <a href="/media/app.kjm" download>
        <button class="doopl-button action-button header-download-button">download app</button>
      </a>
    </div>
    
    
    
    <div style="opacity: 0.2; background: white; position: fixed; top:85.88rem; width:1920rem; left: 0; height:50px; border: none"></div>
  </header>
`;
}