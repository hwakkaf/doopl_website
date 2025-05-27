
import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';

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
const templateDooplMain = async (config) => {
  let { css, headJS, bodyJS, headTags, bodyTags, render } = config.page || {}
    , keywords = (config.keywords && config.keywords.length) ? config.keywords.replace('\n', ',') : ''
    ;

  return html`
<!DOCTYPE html>
<html dir=${config.dir} lang=${config.language}>

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Doopl</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  ${css? (css.map? css : [css]).map( c => html`<link href="/assets/css/${c}${c.endsWith('.css')?'':'.css'}" rel="stylesheet">`) : ''}
  <!-- Template Main CSS File -->
  <link rel="stylesheet" href="assets/css/doopl.css" />
  ${headJS? (headJS.map? headJS : [headJS]).map( c => html`<script src="/assets/js/${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
	${headTags? headTags instanceof Function? headTags() : headTags : ''}
  <!-- =======================================================
  * Template Name: Doopl Main
  * Updated: May 25 2025
  * Template URL:
  * Author: Adonai Freelance Group
  * License: Private Propriatry
  ======================================================== -->
</head>

<body>
  <svg class="blurred-spot-top" width="704" height="526" viewBox="0 0 704 526" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_241_2187)">
    <ellipse cx="244.52" cy="66.6758" rx="431.446" ry="266.235" transform="rotate(-45 244.52 66.6758)" fill="url(#paint0_linear_241_2187)" fill-opacity="0.75"/>
    </g>
    <defs>
    <filter id="filter0_f_241_2187" x="-214.018" y="-391.862" width="917.075" height="917.075" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_241_2187"/>
    </filter>
    <linearGradient id="paint0_linear_241_2187" x1="244.52" y1="-199.559" x2="244.52" y2="332.911" gradientUnits="userSpaceOnUse">
    <stop offset="0.125" stop-color="#0A0AF5"/>
    <stop offset="0.485577" stop-color="#8585FA" stop-opacity="0.5"/>
    <stop offset="0.94386" stop-color="#EEEAF8" stop-opacity="0.1"/>
    </linearGradient>
    </defs>
  </svg>
  ${widgets.header(config)}
  <h1 style="display: none; min-height: 2500px; font-size: 48px; color: white;">JUST BELOW HEADER</h1>
  <main class="flex-ver-st-ce">
    <div class="card-container"></div>
    ${render? render instanceof Function? render(config) : render : ''}
  </main>
  <div class="bottom-container">
    ${widgets.footer(config)}

    <svg class="blurred-spot-bottom" width="840" height="402" viewBox="0 0 840 402" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_241_2121)">
      <ellipse cx="241.271" cy="431.259" rx="320.834" ry="504.532" transform="rotate(-101.584 241.271 431.259)" fill="url(#paint0_linear_241_2121)" fill-opacity="0.75"/>
      </g>
      <defs>
      <filter id="filter0_f_241_2121" x="-357.222" y="0.947266" width="1196.99" height="860.625" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_241_2121"/>
      </filter>
      <linearGradient id="paint0_linear_241_2121" x1="241.271" y1="-73.2727" x2="241.271" y2="935.791" gradientUnits="userSpaceOnUse">
      <stop offset="0.125" stop-color="#0A0AF5"/>
      <stop offset="0.485577" stop-color="#8585FA" stop-opacity="0.5"/>
      <stop offset="0.94386" stop-color="#EEEAF8" stop-opacity="0.1"/>
      </linearGradient>
      </defs>
    </svg>

  </div>
  
  ${bodyTags? bodyTags instanceof Function? bodyTags() : bodyTags : ''}
  <script src="assets/js/doopl.js"></script>
  ${bodyJS? (bodyJS.map? bodyJS : [bodyJS]).map( c => html`<script src="/assets/js/${c}${c.endsWith('.js')?'':'.js'}"></script>`) : ''}
</body>

</html>`;
}

export default templateDooplMain;
