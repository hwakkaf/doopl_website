
import { html } from '@popeindustries/lit-html-server';
import {mainMenu} from './main-menu.js'

export const header = data => {
  return html`
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        ${global.logo? html`<img src=${global.logo.url} alt="">` : ''}
        <h1>${global.companyName}<span>.</span></h1>
      </a>
      ${mainMenu(data)}
    </div>
  </header><!-- End Header -->
`;
}