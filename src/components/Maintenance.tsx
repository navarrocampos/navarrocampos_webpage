const tiers = [
  {
    id: 'maint1',
    icon: '🔒',
    name: 'Foundation',
    tagline: 'Your site stays live — we handle everything behind the scenes.',
    cardClass: 'maint-step-card--slate',
    includedTag: '🎁 1st year free with any build package',
    price: '$89',
    period: '/year',
    cta: { label: 'Get Foundation', cls: 'maint-cta--slate' },
    features: [
      { text: 'Secure hosting' },
      { text: 'Domain registration & renewal' },
      { text: 'SSL certificate (https padlock)' },
      { text: 'Uptime monitoring' },
    ],
  },
  {
    id: 'maint2',
    icon: '✏️',
    name: 'Essential',
    tagline: 'Foundation + one round of content updates every month.',
    cardClass: 'maint-step-card--blue',
    price: '$199',
    period: '/year',
    save: { label: 'best value', cls: 'maint-save--blue' },
    cta: { label: 'Get Essential', cls: 'maint-cta--blue' },
    features: [
      { text: 'All of Foundation included', inherit: true },
      { text: '1 update session per month (~30 min of edits)' },
      { text: 'Text & image updates' },
      { text: 'Priority email support' },
    ],
  },
  {
    id: 'maint3',
    icon: '⚡',
    name: 'Growth Care',
    tagline: 'Essential + 15 hours of hands-on work. Your site keeps growing.',
    cardClass: 'maint-step-card--coral',
    badgeValue: '$1,500 value',
    price: '$999',
    period: '/year',
    save: { label: 'save $500+', cls: 'maint-save--coral' },
    cta: { label: 'Get Growth Care', cls: 'maint-cta--coral' },
    features: [
      { text: 'All of Essential included', inherit: true },
      { text: '15 hours of changes & updates ($1,500 value)' },
      { text: 'New pages, sections & features' },
      { text: 'Fastest response time' },
      { text: 'Unused hours roll over (up to 1 year)' },
    ],
  },
];

export function Maintenance() {
  return (
    <section className="maintenance-section" id="maintenance" aria-labelledby="maintenance-heading">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">After Your Site Launches</span>
          <h2 className="section-title" id="maintenance-heading">Keep it running.</h2>
          <p className="section-subtitle">
            Every website needs a home. Pick an annual plan and we handle hosting, domain renewal,
            and upkeep — so you never have to think about it.
          </p>
        </div>

        <div className="maint-ladder">
          {tiers.map((tier, idx) => (
            <article key={tier.id} className="maint-step" aria-labelledby={`${tier.id}-name`}>
              <div className="maint-step-marker">
                {idx < tiers.length - 1 && <div className="maint-step-line" aria-hidden="true" />}
              </div>

              <div className={`maint-step-card ${tier.cardClass}`}>
                {tier.includedTag && (
                  <div className="maint-included-tag-top">{tier.includedTag}</div>
                )}
                {tier.badgeValue && (
                  <div className="maint-badge-value">{tier.badgeValue}</div>
                )}

                <div className="maint-step-card-inner">
                  <div className="maint-step-left">
                    <div className="maint-step-header">
                      <span className="maint-icon" aria-hidden="true">{tier.icon}</span>
                      <div>
                        <h3 className="maint-name" id={`${tier.id}-name`}>{tier.name}</h3>
                        <p className="maint-tagline">{tier.tagline}</p>
                      </div>
                    </div>
                    <ul className="maint-features">
                      {tier.features.map((f, i) => (
                        <li key={i}>
                          <span
                            className={`maint-check${f.inherit ? ' maint-check--inherit' : ''}`}
                            aria-hidden="true"
                          >✓</span>
                          {f.inherit
                            ? <span className="maint-inherited">{f.text}</span>
                            : f.text
                          }
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="maint-step-right">
                    <div className="maint-price-group">
                      <div className="maint-step-price">
                        <span className="maint-price">{tier.price}</span>
                        <span className="maint-period">{tier.period}</span>
                      </div>
                      {tier.save && (
                        <span className={`maint-save ${tier.save.cls}`}>{tier.save.label}</span>
                      )}
                    </div>
                    <a href="#contact" className={`maint-cta ${tier.cta.cls}`}>
                      {tier.cta.label}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
