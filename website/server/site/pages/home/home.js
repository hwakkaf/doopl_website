import { html } from '@popeindustries/lit-html-server';
import * as widgets from '../../widgets/index.js';

const render = async config => {
  let { pageData, vocab } = config??{};
  let iwd = pageData.narratives?.home?.instantWithDoopl?? {};
  let wcu = pageData.narratives?.home?.whyChooseUs?? {};
  let hiw = pageData.narratives?.home?.howItWorks?? {};
  let learnerDriver = pageData.narratives?.home?.learnerDriver?? {};
  let instructor = pageData.narratives?.home?.instructor?? {};

  if (Array.isArray(wcu?.whys)) wcu.whys.sort((a,b) => a.ordering - b.ordering);
  if (Array.isArray(hiw?.sections)) hiw.sections.sort((a,b) => a.ordering - b.ordering);
  return html`

    <!-- INSTANT WITH DOOPL -->
    <div class="flex-ver-st-ch center w-1">
      <span class="mont-400-15-3-1-top n-on-s-color">${iwd.linkAnchorText}${widgets.svg.rightArrow(" tertiary-color")}</span>
      <h2 class="popp-700-32-0-92p-top t-on-s-color">${iwd.title}</h2>
      <p class="mont-300-21-0-27p-top n-on-s-color w-2">${iwd.narrative}</p>
    </div>

    <!-- LEANER/INSTRUCTOR GO -->
    <div class="f-r f-a-ch learner-instructor-nav">
      <a class="f-r f-j-ce f-a-ce f-g learner-instructor-nav-learner" href="/learners"><span class="mont-400-17--0d2-29px-top n-on-s-color capitalize">${vocab.learner}</span></a>
      <a class="f-r f-j-ce f-a-ce f-g learner-instructor-nav-instructor" href="/instrucors"><span class="mont-400-17--0d2-29px-top n-on-p-color capitalize">${vocab.instructor}</span></a>
    </div>

    <!-- EXPLORE NOW -->
    <div class="explore-now f-c">${widgets.svg.exploreNow("explore-now-vertical")}</div>

    <!-- WHY CHOOSE US -->
    <div class="why-choose-us flex-ver-st-ch">
      <div class="hide-iphone-borders"></div>
      ${widgets.svg.borderGroundIphone("border-ground-iphone")}
      <img class="why-choose-us-iphone" src="/assets/images/iPhone 14 Pro Max 1.png" width="431" height="711">
      <div class="why-choose-us-main f-c">
        <h2 class="popp-700-48--1d8px-58px-top t-on-t-color">${wcu.main.title}</h2>
        <p class="mont-400-21--0d2-32px-top n-on-t-color">${wcu.main.narrative}</p>
      </div>
      <div class="why-choose-us-features f-r f-w">
        ${wcu?.whys?.map(w => html`
          <div class="f-r f-w why-choose-us-why-card">
            <img src=${w.icon.url} width="64.7" height="64.7">
            <div class="why-choose-us-why f-c">
              <h3 class="popp-700-21--0d5px-32px-top t-on-t-color">${w.title}</h3>
              <p class="mont-400-17--0d2-29px-top n-on-t-color">${w.narrative}</p>
            </div>
          </div>
        `)}
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <div class="how-it-works f-c f-a-ce f-as-ce">
      <div class="how-it-works-main f-c">
        <h2 class="popp-700-48--1d2px-48px-top t-on-s-color center">${hiw.main.title}</h2>
        <p class="mont-400-19--0d2-32px-top n-on-s-color">${hiw.main.narrative}</p>
      </div>
      <div class="how-it-works-details f-r w-100p">
        <div class="how-it-works-image-container relative">
          <img class="how-it-works-image" src=${hiw.main.images[0].url} width="425" height="571">
          <img class="how-it-works-image-background" src=${hiw.main.images[1].url} width="397" height="547">
          <div class="how-it-works-invitation f-r f-a-ce p-bg-color">
            <div class="how-it-works-circle f-r f-j-ce f-a-ce">
              <img class="" src=${(hiw.newInvitation.icon??{}).url} width="16" height="18">
            
            </div>
            <div class="how-it-works-text-container f-c">
              <span class="mont-500-15--0d1-26px-top n-on-p-color">${hiw.newInvitation.title}</span>
              <span class="popp-700-15--0d2-29px-top t-on-p-color">${hiw.newInvitation.narrative}</span>
            </div>
          </div>
        </div>
        <div class="how-it-works-sections f-c f-j-ce">
          ${hiw?.sections?.map((w,i) => html`
          <div class="how-it-works-sections-section f-r">
            <div class="how-it-works-sections-circle f-r f-j-ce f-a-ce">
              <span class="popp-700-17--0d2-29px-top how-it-works-sections-number">${i+1}</span>
            </div>
            <div class="f-c">
              <h3 class="popp-700-21--0d5px-32px-top t-on-s-color capitalize">${w.title}</h3>
              <p class="mont-400-17--0d2-29px-top n-on-s-color">${w.narrative}</p>
            </div>
          </div>
        `)}
        </div>
      </div>
    </div>

    <!-- LEARNER DRIVER -->
    <div class="learner-driver home-learner-driver f-r f-a-ce w-100p">
    <img class="" src=${learnerDriver.images[0].url} width="566.32" height="788.39">
    <div class="learner-driver-details f-c">
      <h1 class="popp-700-48--1d8px-58px-top t-on-t-color">${learnerDriver.title}</h1>
      <span class="learner-driver-details-main mont-400-27--0d2-32px-top n-on-t-color">${learnerDriver.narrative}</span>
      <a href="${learnerDriver.link}" target="_blank">
        <button class="doopl-button action-button learner-driver-details-link">${learnerDriver.linkAnchorText}</button>
      </a>
    </div>
    </div>

    <!-- LEARNER DRIVER -->
    <div class="learner-driver home-instructor f-rr f-a-ce w-100p">
    <img class="" src=${instructor.images[0].url} width="566.32" height="788.39">
    <div class="learner-driver-details f-c">
      <h1 class="popp-700-48--1d8px-58px-top t-on-t-color">${instructor.title}</h1>
      <span class="learner-driver-details-main mont-400-27--0d2-32px-top n-on-t-color">${instructor.narrative}</span>
      <a href="${instructor.link}" target="_blank">
        <button class="doopl-button action-button learner-driver-details-link">${instructor.linkAnchorText}</button>
      </a>
    </div>
    </div>
    <!-- PARTNERS -->
     <div class="our-partners">
      ${widgets.linkMenu({data: config, name: 'partners', type: 'horizontal', hasIcon: true, hasText: false, className: "our-partners-links"})}
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