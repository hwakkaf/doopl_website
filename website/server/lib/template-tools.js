import { html } from '@popeindustries/lit-html-server';

export const setHead = (template, page) => {
  if (!template) template = {}
  if (!page) page = {}
  return html`
    ${template.headTags? template.headTags instanceof Function? template.headTags() : template.headTags : ''}
    ${page.headTags? page.headTags instanceof Function? page.headTags() : page.headTags : ''}
    ${template.css? (template.css.map? template.css : [template.css]).map( c => html`<link href="${c}${c.endsWith('.css')?'':'.css'}" rel="stylesheet">`) : ''}
    ${page.css? (page.css.map? page.css : [page.css]).map( c => html`<link href="${c}${c.endsWith('.css')?'':'.css'}" rel="stylesheet">`) : ''}
    ${template.headJS? (template.headJS.map? template.headJS : [template.headJS]).map( c => html`<script src="${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
    ${page.headJS? (page.headJS.map? page.headJS : [page.headJS]).map( c => html`<script src="${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
  `;
}

export const setBody = (template, page) => {
  if (!template) template = {}
  if (!page) page = {}
  return html`
    ${template.bodyTags? template.bodyTags instanceof Function? template.bodyTags() : template.bodyTags : ''}
    ${page.bodyTags? page.bodyTags instanceof Function? page.bodyTags() : page.bodyTags : ''}
    ${template.bodyJS? (template.bodyJS.map? template.bodyJS : [template.bodyJS]).map( c => html`<script src="${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
    ${page.bodyJS? (page.bodyJS.map? page.bodyJS : [page.bodyJS]).map( c => html`<script src="${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
  `;
}
