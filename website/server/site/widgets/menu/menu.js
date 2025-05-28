
import { html } from '@popeindustries/lit-html-server';
import {svg} from '../svg/svg.js';
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

export const dooplMenu = (config) => {
  let { data, name, type, className } = config
  let mb = data.menubars[name];

  type = type || 'horizontal';
  return html`
    <nav class="menu-navbar menu-navbar-${type}${className? ` ${className}`: ''}">
      ${menubar(mb,type, 1)}
    </nav>
    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
`;
}

const menubar = (mb, type, level) => {
  return Array.isArray(mb.children) && mb.children.length
  ? html`
  <ul class="menu menu-${type} menu-${level}${level == 2? " menu-deep menu-submenu" : level > 2? " menu-deeper menu-submenu": " menu-root"}">
    ${ mb.children.map(item => menuItems(item, type, level))}
  </ul>
  `
  : ``
}

const menuItems = (item, type, level) => {
  return (Array.isArray(item.children) && item.children.length) || item.type == 'Grouping' || item.type == 'Submenu'
    ? html`
      <li class="menu-item-with-submenu menu-item menu-item-${type} menu-item-${level}">
        <span class="menu-item-text">${item.title}</span>
        ${svg.selectArrow(`menu-open-indicator menu-open-indicator-${type}`)}
        ${menubar(item, type, level+1)}
      </li>`
    : html`<li class="menu-item menu-item-${type} menu-item-${level}"><a href=${item.url}><span class="menu-item-text">${item.title}</span></a></li>`
  ;
}

