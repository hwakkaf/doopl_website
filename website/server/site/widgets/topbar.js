
import { html } from '@popeindustries/lit-html-server';

export const topBar = data => {
  let global = data?.baseData?.global || {}
  return html`
    <section id="topbar" class="topbar d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:${global.email}">${global.email}</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span>${data?.vocab?.phone || 'Phone'}</span></i>
      </div>
      ${socialLinks(data)}
    </div>
  </section>
  `;
}