
import { html } from '@popeindustries/lit-html-server';


export const socialLinks = data => {
  let social = data?.baseData?.menubars?[data?.cookies?.language || 'en']?.social?.children || [];
  return html`
    <div class="social-links d-none d-md-flex align-items-center">
    ${social.filter(m => !m.invisible).map(s => html`<a href=${s.url} class=${s.name} title=${s.title}><i class="bi bi-${s.title.toLoweCase()}"></i></a>`)}
    </div>
  `;
}