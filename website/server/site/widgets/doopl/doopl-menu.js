
import { html } from '@popeindustries/lit-html-server';

/*
  Menu types:
  first_level-second_level-deeper_levels

  Type                    Level emerging (first,second,deeper)          Description
  --------------------------------------------------------------------------------------------------
  horizontal              horizontal-vertical-hierarchical				      Traditional horizontal menus
  horizontal-drawer       horizontal-vertical-vertical					        Traditional horizontal menus
  drawer                  vertical-vertical-vertical						        Modern Drawer		
  vertical                vertical-hierarchical-hierarchical				    Traditional vertical menus		
  footer                  horizontal-vertical_opened-vertical_opened		Footer link menus
  
*/

export const dooplMenu = (data, type) => {
  let { vocab, settings, menubars, global, location } = data
  let { doopl } = menubars;

  return html`
    <style>
      
    </style>
    <nav class="navbar">
      ${menubar(doopl,type, 1)}
    </nav>
    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    <script type="module">
      let x = 10;
      console.log("menubar", x)
    </script>
`;
}

const menubar = (mb, type, level) => {
  return Array.isArray(mb.children) && mb.children.length
  ? html`
  <ul class="menu">
    ${ mb.children.map(item => menuItems(item))}
  </ul>
  `
  : ``
}

const menuItems = (item, type, level) => {
  return Array.isArray(item.children) && item.children.length
    ? html`
      <li class="dropdown menu-item"><a href=${item.url}><span>${item.title}</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
        ${menubar(item,level+1)}
      </li>`
    : html`<li class="menu-item"><a href=${item.url}>${item.title}</a></li>`
  ;
}

