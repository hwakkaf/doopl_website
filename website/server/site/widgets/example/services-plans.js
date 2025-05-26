
import { html } from '@popeindustries/lit-html-server';


export const servicesPlans = data => {

  let description = {}
    , vocab = data.vocab
  ;
  data.plans = [];
  return html`
  
    <!-- ======= Pricing Section ======= -->
    <section id="pricing" class="pricing sections-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>${description.title}</h2>
          <p>${description.content}</p>
        </div>

        <div class="row g-4 py-lg-5" data-aos="zoom-out" data-aos-delay="100">
          ${
            (data.plans || []).map(p => html`
              <div class="col-lg-4">
                <div class="pricing-item${p.recommended? ' featured':''}">
                  <h3>${vocab.package} ${p.name}</h3>
                  <div class="icon large ltr">
                    <i class="bi bi-box-x">${p.speed}</i>
                  </div>
                  <h4>${p.price}<sup>${vocab.syrianPound}</sup><span> / ${vocab.month}</span></h4>
                  <ul>
                    <li><i class="bi bi-check"></i>${vocab.speed} ${p.speed}</li>
                    <li><i class="bi bi-check"></i>${vocab.consumptionSize} ${p.consumptionSize}</li>
                    <li><i class="bi bi-check"></i>${vocab.speedConsumed} ${p.speedConsumed}</li>
                    <li><i class="bi bi-check"></i> Quam adipiscing vitae proin</li>
                    <li><i class="bi bi-check"></i> Nec feugiat nisl pretium</li>
                    <li><i class="bi bi-check"></i> Nulla at volutpat diam uteera</li>
                    <li class="na"><i class="bi bi-x"></i> <span>Pharetra massa massa ultricies</span></li>
                    <li class="na"><i class="bi bi-x"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                  </ul>
                  <div class="text-center"><a href="#" class="buy-btn">${vocab.subscribeNow}</a></div>
                </div>
              </div><!-- End Pricing Item -->
            `)
          }
        </div>

      </div>
    </section><!-- End Pricing Section -->
`;
}