
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
const templateMain = async (config) => {
  let { vocab, settings, menubars, global, location } = config
    , keywords = (config.keywords && config.keywords.length) ? config.keywords.replace('\n',',') : ''
    , by = _ => ({})
  ;

	return html`
<!DOCTYPE html>
<html dir=${settings.siteDirection} lang=${settings.siteLanguage}>

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Impact Bootstrap Template - Index</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/main.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Impact
  * Updated: Jul 27 2023 with Bootstrap v5.3.1
  * Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>
  ${widgets.topBar({
    vocab, global, social: menubars.social
  })}
  <!-- ======= Header ======= -->
  ${widgets.header({
    vocab, global, menu: menubars.main
  })}
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  ${widgets.hero({
    vocab, global, menu: menubars.main
  })}

  <!-- End Hero Section -->

  <main id="main">
    ${widgets.servicesPlans({
      vocab, global, plans: by('adslPrices'), description: by('adsl-prices')
    })}

    <!-- ======= About Us Section ======= -->
    ${widgets.dualColumns({
      vocab, global
    })}

    <!-- ======= Clients Section ======= -->
    ${widgets.associates({
      vocab, global
    })}
    <!-- End Clients Section -->

    <!-- ======= Stats Counter Section ======= -->
    ${widgets.stats({
      vocab, global
    })}
    <!-- End Stats Counter Section -->

    <!-- ======= Call To Action Section ======= -->
    ${widgets.contactCallToAction({
      vocab, global
    })}
    <!-- End Call To Action Section -->
  
    <!-- ======= Our Services Section ======= -->
    ${widgets.services({
      vocab, services: [], description: 'ok'
    })}
    <!-- End Our Services Section -->

    <!-- ======= Testimonials Section ======= -->
    ${widgets.testimonials({
      vocab, global
    })}

    <!-- End Testimonials Section -->

    <!-- ======= Portfolio Section ======= -->
    ${widgets.portfolio({
      vocab, global
    })}
    <!-- End Portfolio Section -->

    <!-- ======= Our Team Section ======= -->
    ${widgets.team({
      vocab, global
    })}
    <!-- End Our Team Section -->

    <!-- ======= Frequently Asked Questions Section ======= -->
    ${widgets.faq({
      vocab, global
    })}
    <!-- End Frequently Asked Questions Section -->

    <!-- ======= Recent Blog Posts Section ======= -->
    ${widgets.recentPosts({
      vocab, global
    })}

    <!-- End Recent Blog Posts Section -->

    <!-- ======= Contact Section ======= -->
    ${widgets.contactUs({
      vocab, global
    })}

    <!-- End Contact Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  ${widgets.footer({
      vocab, global
    })}

  <!-- End Footer -->

  <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <div id="preloader"></div>

  <script src="assets/vendor/all.js"></script>
  <script src="assets/js/main.js"></script>

</body>

</html>`;
}

export default templateMain;