
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

export const dooplMenu = (data, mb="doopl", type="horizontal") => {
  let { vocab, settings, menubars, global, location } = data
  let doopl = menubars[mb];

  return html`
    <style>
      
    </style>
    <nav class="navbar ${type}-navbar">
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
  <ul class="menu ${type}-menu menu-${level}${level == 2? " menu-deep menu-submenu" : level > 2? " menu-deeper menu-submenu": " menu-root"}">
    ${ mb.children.map(item => menuItems(item, type, level))}
  </ul>
  `
  : ``
}

const menuItems = (item, type, level) => {
  return (Array.isArray(item.children) && item.children.length) || item.type == 'Grouping' || item.type == 'Submenu'
    ? html`
      <li class="menu-item-with-submenu menu-item ${type}-menu-item menu-item-${level}">
        <span class="menu-item-text">${item.title}</span>
        <svg class="menu-open-indicator ${type}-menu-open-indicator" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.35155 7.61757L12.3616 1.60757L10.9486 0.192566L6.35155 4.79257L1.75555 0.192566L0.341553 1.60657L6.35155 7.61757Z" fill="white"/>
        </svg>
        ${menubar(item, type, level+1)}
      </li>`
    : html`<li class="menu-item ${type}-menu-item menu-item-${level}"><a href=${item.url}><span class="menu-item-text">${item.title}</span></a></li>`
  ;
}

