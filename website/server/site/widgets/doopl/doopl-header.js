
import { html } from '@popeindustries/lit-html-server';
import {dooplMenu} from './doopl-menu.js'
import {login} from './doopl-login.js'

export const header = data => {
  let { vocab, settings, menubars, global, location } = data

  return html`
  <header class="header layout-sce-sb-st">
    <div class="layout-sce-start">
      <img class="header-logo" src=${`${process.env.CMS_BASE_URL}${global.logo.url}`} width="150" height="44" />
    </div>
    <div class="layout-sce-center">
      <div class="header-menu">MENU HERE</div>
      ${dooplMenu(data)}
    </div>
    <div class="layout-sce-end">
      ${login(data)}
      <a href="/media/app.kjm" download>
        <button class="doopl-button download-button header-download-button">download app</button>
      </a>
    </div>
    
    
    
    <div style="background: white; position: fixed; top:85.88rem; width:1920rem; left: 0; height:50px; border: none"></div>
  </header>
`;
}