
import { html } from '@popeindustries/lit-html-server';


export const mainMenu = data => {

  return html`
    <nav id="navbar" class="navbar">
      ${menubar(data.menu)}
    </nav><!-- .navbar -->
    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
`;
}

const menubar = mb => {
  return Array.isArray(mb.children) && mb.children.length
  ? html`
  <ul>
    ${ mb.children.map(item => menuItems(item))}
  </ul>
  `
  : ``
}

const menuItems = item => {
  return Array.isArray(item.children) && item.children.length
    ? html`
      <li class="dropdown"><a href=${item.url}><span>${item.title}</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
        ${menubar(item)}
      </li>`
    : html`<li><a href=${item.url}>${item.title}</a></li>`
  ;
}

