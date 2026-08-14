export function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-container">

        <h1 className="hero-heading" id="hero-heading">
          Your business deserves<br />
          <em>a website that works.</em>
        </h1>

        <p className="hero-subheading">
          We build clean, fast, mobile-ready websites for small businesses in Toronto and
          across Canada — domain setup and management included, first year of hosting on us.
          Flat rates, no surprises.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn--primary">Start My Website</a>
          <a href="#services" className="btn btn--ghost">See Plans &amp; Pricing</a>
        </div>

        <div className="hero-proof">
          <div className="proof-item">
            <span className="proof-number">10+</span>
            <span className="proof-label">Years in technology</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-item">
            <span className="proof-number">$560</span>
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
