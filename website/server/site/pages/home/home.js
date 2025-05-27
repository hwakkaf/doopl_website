import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';

const render = async config => {
  let { pageData } = config;
  return html`
  
  `;
}

export default {
  css: [],
  headJS : [],
  bodyJS: [],
  headTags: [],
  bodyTags: [],
  render,
}

/*
  config.page = {
    css: fileName|['css files in /site/assets/css]
    headJS : fileName|['js files in /site/assets/js]
    bodyJS : fileName|['js files in /site/assets/js]
    headTags: TemplateString|function(config) returning html template string with page specific head tags
    bodyTags: TemplateString|function(config) returning html template string with page specific body html  tags(jus before body closing)
    render: TemplateString|function(config) returning page html template string with page contents
  }
*/