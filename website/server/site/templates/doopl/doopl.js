
import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';
import { setHead, setBody } from '../../../lib/template-tools.js';
/*
  config.page = {
    css: fileName|['css files in /site/assets/css], must be injected in head tag
    headJS : fileName|['js files in /site/assets/js], must be injected in head tag
    bodyJS : fileName|['js files in /site/assets/js], must be injected in body tag, preferably just before body closing
    headTags: TemplateString|function(config) returning html template string with page specific head tags
    bodyTags: TemplateString|function(config) returning html template string with page specific body html  tags(jus before body closing)
    render: TemplateString|function(config) returning page html template string with page contents
  }
*/

/*
    config = {
      query: request.query,
      params: request.params,
      location,
      
      // spread from baseData
      settings,
      global,
      vocab,
      menus,
      menubars,
      sitemap,
      links,
      languages,
      cities,

      lang: request.lang || baseData.defaultLocale,
      dir: request.dir || baseData.defaultDir,
      templateData: await getCache((await import(tmpl[1])).default, {refreshRequestTime, lang: request.lang || baseData.defaultLocale}),
      page: (await import(`../site/pages/${location.page}/${location.page}.js`)).default,
      pageData: await getCache((await import(`../site/pages/${location.page}/data-config.js`)).default, {refreshRequestTime, lang: request.lang || baseData.defaultLocale}),
      user: {
      }
    }
*/
const template = {
  css: ['/assets/css/theme.css', 'templates/doopl/doopl.css'],
  headJS : [],
  bodyJS: ['templates/doopl/doopl-page.js'],
  headTags: [],
  bodyTags: [],
}
const templateDooplMain = async (config) => {
  let { css, headJS, bodyJS, headTags, bodyTags, render } = config.page || {}
    , keywords = (config.keywords && config.keywords.length) ? config.keywords.replace('\n', ',') : ''
    ;

  return html`
<!DOCTYPE html>
<html dir=${config.dir} lang=${config.language}>

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport">

  <title>Doopl</title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@200;300;400;500;700&display=swap" rel="stylesheet">
  ${setHead(template, config.page)}
  <!-- =======================================================
  * Template Name: Doopl Main
  * Updated: May 25 2025
  * Template URL:
  * Author: Adonai Freelance Group
  * License: Private Propriatry
  ======================================================== -->
</head>

<body>
  ${widgets.svg.ellipseTop("blurred-spot-top")}
  ${widgets.header(config)}
  <h1 style="display: none; min-height: 2500px; font-size: 48px; color: white;">JUST BELOW HEADER</h1>
  <main class="flex-ver-st-st">
    ${render? render instanceof Function? render(config) : render : ''}
  </main>
  <div class="bottom-container">
    ${widgets.footer(config)}
    ${widgets.svg.ellipseBottom("blurred-spot-bottom")}
  </div>
  ${setBody(template, config.page)}
</body>

</html>`;
}

export default templateDooplMain;
