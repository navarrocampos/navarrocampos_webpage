interface Cta {
  label: string;
  href: string;
  cls: string;
  target?: string;
}

interface Plan {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  headerClass: string;
  cardClass: string;
  badge?: string;
  priceWas?: string;
  price: string;
  perHour?: boolean;
  priceNote: string;
  features: string[];
  highlightLast?: boolean;
  cta: Cta[];
}

const plans: Plan[] = [
  {
    id: 'starter',
    icon: '🌐',
    name: 'Starter',
    tagline: 'Your business, online — fast.',
    headerClass: 'plan-header--blue',
    cardClass: 'plan-card--blue-border',
    priceWas: '$700',
    price: '$560',
    priceNote: 'one-time build · launch price',
    features: [
      'Single-page professional website',
      'Mobile & tablet ready',
      'Contact form',
      'Domain setup & management included',
      'Social media links & Google Maps',
    ],
    cta: [
      { label: 'Get a quote',       href: '#contact',                cls: 'plan-cta--blue' },
      { label: 'See Starter Style', href: 'starter-style-main.html', cls: 'plan-cta--blue-ghost', target: '_blank' },
    ],
  },
  {
    id: 'growth',
    icon: '🚀',
    name: 'Growth',
    tagline: 'Built to showcase everything you do.',
    headerClass: 'plan-header--coral',
    cardClass: 'plan-card--coral-border plan-card--featured',
    badge: 'Most Popular',
    priceWas: '$1,000',
    price: '$800',
    priceNote: 'one-time build · launch price',
    features: [
      'Up to 3 pages as per your needs',
      'Mobile & tablet ready',
      'Contact form',
      'Domain setup & management included',
      'Social media links & Google Maps',
    ],
    cta: [
      { label: 'Get a quote',      href: '#contact',               cls: 'plan-cta--coral' },
      { label: 'See Growth Style', href: 'growth-style-main.html', cls: 'plan-cta--coral-ghost', target: '_blank' },
    ],
  },
  {
    id: 'active-care',
    icon: '⚡',
    name: 'Active Care',
    tagline: 'Live updates when you need them.',
    headerClass: 'plan-header--mint',
    cardClass: 'plan-card--mint-border',
    price: '$100',
    perHour: true,
    priceNote: 'no minimum · no retainer',
    features: [
      'Text & image updates',
      'New sections or pages added',
      'Menu & price list changes',
      'Priority response time',
      'Billed only for actual hours worked',
    ],
    highlightLast: true,
    cta: [{ label: 'Book free consultation', href: '#contact', cls: 'plan-cta--mint' }],
  },
];

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">What We Offer</span>
          <h2 className="section-title" id="services-heading">Pick your plan. We handle the rest.</h2>
          <p className="section-subtitle">
            Every build includes mobile-optimized design, SEO basics, domain setup, and a personal
            walkthrough the day your site goes live.
          </p>
        </div>

        <a
          href="#maint1-name"
          className="maint-included-banner"
          role="note"
          aria-label="1st year of Foundation hosting included free — click to learn more"
        >
          <span className="maint-included-icon" aria-hidden="true">🎁</span>
          <div className="maint-included-text">
            <strong>1st year of Foundation included free</strong> with any website build — your
            hosting, domain &amp; SSL are covered from day one.
          </div>
          <span className="maint-included-badge">$89 value</span>
        </a>

        <div className="plans-grid">
          {plans.map(plan => (
            <article
              key={plan.id}
              className={`plan-card ${plan.cardClass}`}
              aria-labelledby={`plan-${plan.id}-name`}
            >
              {plan.badge && <div className="plan-badge-popular">{plan.badge}</div>}

              <div className={`plan-header ${plan.headerClass}`}>
                <span className="plan-icon" aria-hidden="true">{plan.icon}</span>
                <h3 className="plan-name" id={`plan-${plan.id}-name`}>{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              <div className="plan-body">
                <div className="plan-price">
                  <span className="price-inline-row">
                    {plan.priceWas && <span className="price-was">{plan.priceWas}</span>}
                    <span className="price-amount">{plan.price}</span>
                    {plan.perHour && <span className="price-per-hour">/hr</span>}
                  </span>
                  <span className="price-note">{plan.priceNote}</span>
                </div>

                <ul className="plan-features" aria-label={`${plan.name} plan features`}>
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className={`plan-feature${plan.highlightLast && i === plan.features.length - 1 ? ' plan-feature--highlight' : ''}`}
                    >
                      <span className="feature-check" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.cta.length === 1 ? (
                  <a
                    href={plan.cta[0].href}
                    className={`plan-cta ${plan.cta[0].cls}`}
                    {...(plan.cta[0].target ? { target: plan.cta[0].target, rel: 'noopener noreferrer' } : {})}
                  >
                    {plan.cta[0].label}
                  </a>
                ) : (
                  <div className="plan-cta-group">
                    {plan.cta.map((c, i) => (
                      <a
                        key={i}
                        href={c.href}
                        className={`plan-cta ${c.cls}`}
                        {...(c.target ? { target: c.target, rel: 'noopener noreferrer' } : {})}
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="plans-note">
          Not sure which plan fits?{' '}
          <a href="#contact" className="inline-link">Send us a message</a> — we&apos;ll recommend
          the right one for your business at no charge.
        </p>

      </div>
    </section>
  );
}
