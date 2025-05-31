import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';

const render = async config => {
  let { pageData, vocab } = config??{};
  let iwd = pageData.narratives?.home?.instantWithDoopl?? {};
  let wcu = pageData.narratives?.home?.whyChooseUs?? {};
  let hiw = pageData.narratives?.home?.howItWorks?? {};
  let learnerDriver = pageData.narratives?.home?.learnerDriver?? {};
  let instructor = pageData.narratives?.home?.instructor?? {};
  let helpVideo = pageData.narratives?.home?.helpVideo?? {};
  let readyStarted = pageData.narratives?.home?.readyStarted?? {};
  let happyCustomers = pageData.narratives?.home?.happyCustomers?? {};

  if (Array.isArray(wcu?.whys)) wcu.whys.sort((a,b) => a.ordering - b.ordering);
  if (Array.isArray(hiw?.sections)) hiw.sections.sort((a,b) => a.ordering - b.ordering);
  if (Array.isArray(happyCustomers.customers)) happyCustomers.customers.sort((a,b) => a.ordering - b.ordering);
  return html`

    <!-- INSTANT WITH DOOPL -->
    <section class="instant-with-doopl f-c f-a-ce txt-cen">
      <aside class="aside-note">
        <p class="instant-with-doopl-explore f-r f-a-en f-j-ce">
          <span class="nar-400 rm-12 lsp-03 lhi-1 n-on-s-color">${iwd.linkAnchorText}</span>
          ${widgets.svg.rightArrow(" tertiary-color")}
        </p>
      </aside>
      <article class="instant-with-doopl-article f-c f-a-ce">
        <h2 class="tit-700 rm-32 lhi-14 t-on-s-color">${iwd.title}</h2>
        <p class="instant-with-doopl-article-body nar-300 rm-21 lhi-13 n-on-s-color txt-cen">${iwd.narrative}</p>
      </article>
    </section>

    <!-- LEANER/INSTRUCTOR GO -->
    <section class="learner-instructor-nav f-r f-a-ch">
      <a class="learner-instructor-nav-learner f-r f-j-ce f-a-ce f-g" href="/learners">
        <span class="nar-400 rm-17 lsp--01 lhi-17 n-on-s-color txt-cap">${vocab.learner}</span>
      </a>
      <a class="learner-instructor-nav-instructor f-r f-j-ce f-a-ce f-g" href="/instrucors">
        <span class="nar-400 rm-17 lsp--01 lhi-17 n-on-p-color txt-cap">${vocab.instructor}</span>
      </a>
    </section>

    <!-- EXPLORE NOW -->
    <div class="explore-now f-c">${widgets.svg.exploreNow("explore-now-vertical")}</div>

    <!-- WHY CHOOSE US -->
    <div class="why-choose-us flex-ver-st-ch">
      <div class="hide-iphone-borders"></div>
      ${widgets.svg.borderGroundIphone("border-ground-iphone")}
      <img class="why-choose-us-iphone" src="/assets/images/iPhone 14 Pro Max 1.png" width="431" height="711">
      <div class="why-choose-us-main f-c">
        <h2 class="tit-700 rm-48 lsp--04 t-on-t-color">${wcu.main.title}</h2>
        <p class="nar-400 rm-21 lsp--009 lhi-15 n-on-t-color">${wcu.main.narrative}</p>
      </div>
      <div class="why-choose-us-features f-r f-w">
        ${wcu?.whys?.map(w => html`
          <div class="f-r f-w why-choose-us-why-card">
            <img src=${w.icon.url} width="64.7" height="64.7">
            <div class="why-choose-us-why f-c">
              <h3 class="tit-700 rm-21 lsp--02 lhi-15 t-on-t-color">${w.title}</h3>
              <p class="nar-400 rm-17 lsp--01 lhi-15 n-on-t-color">${w.narrative}</p>
            </div>
          </div>
        `)}
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <div class="how-it-works f-c f-a-ce f-as-ce">
      <div class="how-it-works-main f-c">
        <h2 class="tit-700 rm-48 lsp--025 t-on-s-color txt-cen">${hiw.main.title}</h2>
        <p class="nar-400 rm-19 lsp--01 lhi-17 n-on-s-color">${hiw.main.narrative}</p>
      </div>
      <div class="how-it-works-details f-r w-100p f-w">
        <div class="how-it-works-image-container relative">
          <img class="how-it-works-image" src=${hiw.main.images[0].url} width="425" height="571">
          <img class="how-it-works-image-background" src=${hiw.main.images[1].url} width="397" height="547">
          <div class="how-it-works-invitation f-r f-a-ce p-bg-color">
            <div class="how-it-works-circle f-r f-j-ce f-a-ce">
              <img class="" src=${(hiw.newInvitation.icon??{}).url} width="16" height="18">
            </div>
            <div class="how-it-works-text-container f-c">
              <span class="nar-500 rm-15 lsp--065 lhi-17 n-on-p-color">${hiw.newInvitation.title}</span>
              <span class="tit-700 rm-15 lsp--065 lhi-17 t-on-p-color">${hiw.newInvitation.narrative}</span>
            </div>
          </div>
        </div>
        <div class="how-it-works-sections f-c f-j-ce">
          ${hiw?.sections?.map((w,i) => html`
            <div class="how-it-works-sections-section f-r">
              <div class="how-it-works-sections-circle f-r f-j-ce f-a-ce">
                <span class="tit-700 rm-17 lsp--01 lhi-17 how-it-works-sections-number">${i+1}</span>
              </div>
              <div class="f-c">
                <h3 class="tit-700 rm-21 lsp--025 lhi-15 t-on-s-color capitalize">${w.title}</h3>
                <p class="nar-400 rm-17 lsp--01 lhi-17 n-on-s-color">${w.narrative}</p>
              </div>
            </div>
          `)}
        </div>
      </div>
    </div>

    <!-- LEARNER DRIVER -->
    <div class="learner-driver home-learner-driver f-r f-a-ce w-100p f-w">
    <img class="learner-driver-image" src=${learnerDriver.images[0].url} width="566.32" height="788.39">
    <div class="learner-driver-details f-c">
      <h1 class="tit-700 rm-48 lsp--04 lhi-12 t-on-t-color">${learnerDriver.title}</h1>
      <span class="learner-driver-details-main nar-400 rm-27 lsp--007 lhi-12 lhi-12 n-on-t-color">${learnerDriver.narrative}</span>
      <a href="${learnerDriver.link}" target="_blank">
        <button class="doopl-button action-button learner-driver-details-link">${learnerDriver.linkAnchorText}</button>
      </a>
    </div>
    </div>

    <!-- INSTRUCTOR -->
    <div class="learner-driver home-instructor f-rr f-a-ce w-100p f-w">
    <img class="learner-driver-image" src=${instructor.images[0].url} width="566.32" height="788.39">
    <div class="learner-driver-details f-c">
      <h1 class="tit-700 rm-48 lsp--04 lhi-12 t-on-t-color">${instructor.title}</h1>
      <span class="learner-driver-details-main nar-400 rm-27 lsp--007 lhi-12 n-on-t-color">${instructor.narrative}</span>
      <a href="${instructor.link}" target="_blank">
        <button class="doopl-button action-button learner-driver-details-link">${instructor.linkAnchorText}</button>
      </a>
    </div>
    </div>

    <!-- PARTNERS -->
    <div class="our-partners">
    ${widgets.linkMenu({data: config, name: 'partners', type: 'horizontal', hasIcon: true, hasText: false, className: "our-partners-links"})}
    </div>

    <!-- HELP VIDEO -->
    <div class="help-video">
      <div class="help-video-container">
        <img class="help-video-bg-image" src=${helpVideo.images[0].url} width="1343.1" height="580">
        <div class="help-video-main f-c f-a-ce f-j-ce">
          <img class="help-video-image" src=${helpVideo.icon.url} width="72.75" height="68" role="button">
          <h2 class="help-video-main-title tit-400 rm-36 lsp-03 lhi-13 t-on-p-color txt-cen">${helpVideo.title}</h2>
          <span class="help-video-main-text help-video-main-text_wide nar-400 rm-19 lsp--01 lhi-17 txt-cen">${helpVideo.narrative}</span>
        </div>
      </div>
      <span class="help-video-main-text help-video-main-text_mobile nar-400 rm-19 lsp--01 lhi-17 txt-cen">${helpVideo.narrative}</span>
    </div>

    <!-- HAPPY CUSTOMERS -->
    <div class="happy-customers f-c f-a-ce f-j-ce">
      <div class="happy-customers-header f-r f-a-ce f-j-sb f-w">
        <h2 class="f-g tit-700 rm-48 lhi-19 t-on-s-color">${happyCustomers.main.title}</h2>
        <div class="happy-customers-header-nav f-r f-a-ce f-j-sb">
          <button class="happy-customers-button f-c f-a-ce f-j-ce">${widgets.svg.arrowLeft("c1")}</button>
          <button class="happy-customers-button f-c f-a-ce f-j-ce">${widgets.svg.arrowRight("c1")}</button>
        </div>
      </div>
      <div class="happy-customers-slides-container">
        <div class="happy-customers-slides f-r">
          ${(happyCustomers.customers || []).map((w,i) => html`
            <div class="happy-customers-card f-c f-j-sa f-a-ce">
              <img class="happy-customers-image" src=${w.images[0]?.url??''} width="83.12" height="88.05">
              <h3 class="tit-700 rm-21 lsp--025 lhi-15 t-on-t-color capitalize">${w.title}</h3>
              <p class="nar-400 rm-17 lsp--01 lhi-17 n-on-t-color txt-cen">
                <span class="nar-700 rm-18 lhi-18 p-color">“ </span>
                ${w.narrative}
                <span class="nar-700 rm-18 lhi-18 p-color"> ”</span>
              </p>
            </div>
          `)}
        </div>
      </div>
      <img class="happy-customers-driving-wheel" src=${happyCustomers.main.images[0].url} width="316.27" height="315.18">
    </div>

    
    <!-- READY TO GET STARTED -->
    <div class="ready-started-container f-c f-a-ce">
      <div class="ready-started f-c f-a-ce f-j-ce">
        <span class="ready-started-brief f-r f-a-ce">
          <span class="ready-started-bullet"></span>
          <span class="mont-400-12-3p-100p-top">${readyStarted.brief}</span> 
        </span>
        <h2 class="tit-700 rm-72 lsp-0 lhi-125 txt-cen t-on-p-color">${readyStarted.title}</h2>
        <span class="help-video-main-text nar-200 rm-20 lsp--007 lhi-16 txt-cen">${readyStarted.narrative}</span>
        <a class="ready-started-download" href="${readyStarted.link}" target="_blank">
          <button class="doopl-button action-button learner-driver-details-link">${readyStarted.linkAnchorText}</button>
        </a>
      </div>
    </div>

  `;
}

export default {
  css: ['pages/home/home'],
  headJS : [],
  bodyJS: ['pages/home/home-page'],
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