import React from 'react'
import main from '../assets/main.jpg'

const Section2 = () => {
  return (
   <section className="about-section" id="about">
  <div className="container">
    <h2 className="text-success fw-bold text-center mt-4">Introduction</h2>

    <div className="p-4 shadow-sm border-0 rounded-4">
      <div className="row g-4">
        {/* <!-- About Card 1 --> */}
        <div className="col-md-4">
          <h4><span className="text-success fw-bold">Atomic</span></h4>
          <p className="fs-5">
            Atomic is a leading educational material supplier, providing high quality materials and lab equipment for students and institutes for several years.
          </p>
          <img src={main} className="img-fluid rounded" alt="Atomic"/>
        </div>

        {/* <!-- About Card 2 --> */}
        <div className="col-md-4">
          <img src={main} className="img-fluid rounded mb-2" alt="Teamwork"/>
          <p>
            Our company believes in teamwork and mutual benefit where its workers, customers and suppliers are benefited. Our staff is professional, steadfast, sociable and ready to serve with respect, honesty and politeness.
          </p>
        </div>

        {/* <!-- About Card 3 --> */}
        <div className="col-md-4">
          <p>
            Our products are <span className="text-success fw-bold">up-to-date</span> and our prices are fair. Our doors are open to serve customers and answer any questions they may have.
          </p>
          <img src={main} className="img-fluid rounded" alt="Service"/>
        </div>
      </div>
    </div>

    {/* <!-- Vision Section --> */}
    <div className="p-4 border-0 rounded-4 vision shadow-sm mt-4">
      <h3 className="text-success fw-bold">Our Vision</h3>
      <div className="row align-items-center">
        <div className="col-lg-6">
          <p className="lead">
            Our Vision is to make learning accessible by providing <span className="text-success">top-quality</span> educational resources at
            <span className="text-success fw-bold">affordable prices</span> and to become a renowned supplier of lab and educational materials.
            We aim to transition from import to <span className="text-success fw-bold">manufacturing</span> and play a big role in Ethiopia's science industry.
          </p>
        </div>
        <div className="col-lg-6 text-center">
          <img src={main} className="img-fluid rounded" alt="Vision"/>
        </div>
      </div>
    </div>

    {/* <!-- Why Choose Us --> */}
    <div className="mt-4">
      <h4 className="text-success fw-bold">Why you should choose us?</h4>
      <ul className="text-muted">
        <li>Wide variety of products</li>
        <li>High-quality materials</li>
        <li>Affordable prices</li>
        <li>Fast delivery & excellent customer service</li>
      </ul>
    </div>
  </div>
</section>
  )
}

export default Section2