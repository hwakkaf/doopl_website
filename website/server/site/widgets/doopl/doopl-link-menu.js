
import { html } from '@popeindustries/lit-html-server';
/*
type = horizontal|vertical
*/
export const linkMenu = (config) => {
  let {data, name, type, hasText, hasIcon, className, iconWidth, iconHeight, alt, isSmall} = config
  let links = data.links[name] || [];
  let settings = data?.settings??{useFallbackIcon: true, fallbacIcon: {url: 'assets/icons/fallback.svg'}};

  type = type || 'horizontal';
  if (!hasText && !hasIcon) hasText = true;

  
  return (Array.isArray(links) && links.length)? html`
    <nav class="link-menu-navbar link-menu-navbar-${type}${className? ` ${className}`: ''}${isSmall? ` link-menu-navbar-small`: ''}">
      <ul class="link-menu link-menu-${type}">
        ${ links.map(link => html`
          <li class="link-menu-item link-menu-item-${type}">
            <a href=${link.url}>
              ${hasIcon
                ? settings.useFallbackIcon
                ? html`
                  <picture>
                    <source srcset=${link.icon.url} type=${link.icon.mime}>
                    <img class="link-menu-item-icon" src=${settings?.fallbacIcon?.url??'assets/icons/fallback.svg'} alt=${link.title} width=${iconWidth || 18} height=${iconHeight || 18}>
                  </picture>
                `
                : html`
                  <img src=${link.icon.url} alt=${link.title}>
                `
                : ''
              }
              ${hasText
                ? html`
                  <span class="link-menu-item-text">${link.title}</span>
                `
                : ''
              }
              
            </a>
          </li>
        `)}
      </ul>
    </nav>
`
: html`
<p class="link-menu-alt-text">
  ${alt}
</p>
`;
}
