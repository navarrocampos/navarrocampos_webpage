import { withCad } from './withCad';

export function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-container">

        <h1 className="hero-heading" id="hero-heading">
          Affordable Web Design Services for<br />
          <em>Small Businesses &amp; Contractors Worldwide.</em>
        </h1>

        <p className="hero-subheading">
          Clean, fast, mobile-ready websites built to scale your business. Flat-rate packages,
          free first-year hosting, and 100% managed setup—no matter where you are located.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn--primary">Start My Website</a>
          <a href="#services" className="btn btn--ghost">See Global Plans &amp; Pricing</a>
        </div>

        <div className="hero-proof">
          <div className="proof-item">
            <span className="proof-number">10+</span>
            <span className="proof-label">Years in technology</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-item">
            <span className="proof-number">{withCad('$560CAD')}</span>
            <span className="proof-label">Websites from (launch price)</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-item">
            <span className="proof-number">100%</span>
            <span className="proof-label">Domain &amp; hosting managed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
