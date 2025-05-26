
import { html } from '@popeindustries/lit-html-server';
import {dooplMenu} from './doopl-menu.js'
import {login} from './doopl-login.js'

export const footer = data => {
  let { vocab, settings, menubars, global, location } = data

  return html`
  <footer class="footer flex-ver-st-st">
    <div class="footer-start flex-hor-st-st flex-wrap">
      <div class="footer-start-doopl flex-ver-st-st">
        <img class="header-logo" src=${`${process.env.CMS_BASE_URL}${global.logo.url}`} width="114" height="34" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae accumsan felis. Nullam tristique convallis sapien, in ultrices mi varius ut. Maecenas vitae nunc purus. Sed iaculis sed turpis quis varius. Aenean ut elementum tellus, ornare elementum .
        </p>
      </div>
      <div class="footer-start-quick-links flex-ver-st-st">
        <span>${vocab.quickLinks}</span>
      </div>
      <div class="footer-start-contact-us flex-ver-st-st"></div>
      <div class="footer-start-our-location flex-ver-st-st"></div>
    </div>
    <div class="footer-center">
      center
    </div>
    <div class="footer-end flex-hor-sb-ce">
      end
      <span>${global.copyrights}</span>
      <ul>

      </ul>
      <ul>
        
      </ul>
    </div>
  </footer>
`;
}