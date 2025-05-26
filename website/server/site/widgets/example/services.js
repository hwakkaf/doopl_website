
import { html } from '@popeindustries/lit-html-server';


export const services = data => {

  let description = data.description[0] || {}
  , vocab = data.vocab
  ;
  return html`
    <!-- ======= Our Services Section ======= -->
    <section id="services" class="services sections-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>${description.title}</h2>
          <p>${description.content}</p>
        </div>

        <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">
          ${
            (data.services || []).map(p => html`
          <div class="col-lg-4 col-md-6">
            <div class="service-item  position-relative d-f-c-s-s">
              <div class="icon">
                <i class="bi bi-${p.icon || 'globe'}"></i>
              </div>
              <h3>${p.title}</h3>
              <p>${p.brief}</p>
              <a href="#" class="readmore stretched-link">${vocab.readMore || 'المزيد'} <i class="bi bi-arrow-left"></i></a>
            </div>
          </div><!-- End Service Item -->
          `)
          }

        </div>

      </div>
    </section><!-- End Our Services Section -->
`;
}