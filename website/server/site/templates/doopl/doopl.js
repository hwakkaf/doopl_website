
import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';

/*
  data = {
    css: fileName|['css files in /site/assets/css]
    headJS : fileName|['js files in /site/assets/js]
    tailJS : fileName|['js files in /site/assets/js]
    extraHead: TemplateString|function(config) returning html template string with extra heads
    extraTail: TemplateString|function(config) returning html template string with extra tail tags(jus before body closing)
    render: TemplateString|function(config) returning page html template string with page contents
  }
*/
const templateDooplMain = async (config) => {
  let { vocab, settings, menubars, global, location } = config
    , keywords = (config.keywords && config.keywords.length) ? config.keywords.replace('\n',',') : ''
  ;

	return html`
<!DOCTYPE html>
<html dir=${settings.siteDirection} lang=${settings.siteLanguage}>

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

  <!-- Template Main CSS File -->
  <link rel="stylesheet" href="assets/css/global.css" />
  <link rel="stylesheet" href="assets/css/theme.css" />
  <link rel="stylesheet" href="assets/css/doopl.css" />

  <!-- =======================================================
  * Template Name: Doopl Main
  * Updated: May 25 2025
  * Template URL:
  * Author: Adonai Freelance Group
  * License: Private Propriatry
  ======================================================== -->
</head>

<body>
  <div class="ellipse-header"></div>
  ${widgets.header(config)}
  <main>

  </main>
  <footer>

  </footer>
  <div class="ellipse-footer"></div>
  <script src="assets/js/main.js"></script>

</body>

</html>`;
}

export default templateDooplMain;
