
import { html } from '@popeindustries/lit-html-server';
import {dooplMenu} from './doopl-menu.js'
import {linkMenu} from './doopl-link-menu.js'
import {select} from './doopl-select.js'

export const footer = data => {
  let { vocab, links, settings, menubars, global, location } = data

  return html`
  <footer class="footer flex-ver-st-ch">
    <div class="footer-start flex-hor-sb-st flex-wrap">
      <div class="footer-start-doopl flex-ver-st-st">
        <img class="footer-logo" src=${global.logo.url} width="114" height="34" />
        <p class="narrative-small-spaced footer-start-doopl-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae accumsan felis. Nullam tristique convallis sapien, in ultrices mi varius ut. Maecenas vitae nunc purus. Sed iaculis sed turpis quis varius. Aenean ut elementum tellus, ornare elementum .
        </p>
      </div>
      <div class="footer-start-quick-links flex-ver-st-st">
        <span class="title-small">${vocab.quickLinks}</span>
        ${linkMenu({data, name: 'quick', type: 'vertical', className: "footer-quick-links"})}
      </div>
      <div class="footer-start-contact-us flex-ver-st-st">
        <span class="title-small">${vocab.contactUs}</span>
        <div class="footer-contct-us-items narrative-contacts flex-ver-st-st">
          <span>${global.email}</span>
          <span>${global.phone}</span>
        </div>
      </div>
      <div class="footer-start-our-location flex-ver-st-st">
        <span class="title-small">${vocab.ourLocation}</span>
        <p class="narrative-small">
          ${global.location} 
        </p>
      </div>
    </div>
    <div class="footer-center flex-hor-st-st">
      ${select()}
      
    </div>
    <div class="footer-end flex-hor-sb-ce flex-wrap">
      <span class="narrative-very-small">${global.copyrights}</span>
      ${linkMenu({data, name: 'legal', type: 'horizontal', hasText: true, className: "footer-legal-links", isSmall: true})}
      ${linkMenu({data, name: 'social', type: 'horizontal', hasIcon: true, className: "footer-social-links"})}
    </div>
  </footer>
`;
}