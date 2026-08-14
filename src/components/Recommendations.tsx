'use client';

import { useState } from 'react';

const TABS = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    title: 'Portfolio',
    body: 'Placeholder content for the Portfolio option. This area will soon feature a curated collection of your best work, projects, and client highlights.',
    items: ['Sample project showcase', 'Short case-study summary', 'Call-to-action section'],
    visualClass: 'tab-visual--blue',
    icon: '🖼️',
    visualLabel: <>Placeholder: <strong>Portfolio</strong><br /><span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Coming soon</span></>,
  },
  {
    id: 'starter',
    label: 'Starter (1 page)',
    title: 'Starter (1 page)',
    body: 'Placeholder content for the Starter package. This section will explain the one-page website experience, making it easy to introduce your business quickly.',
    items: ['Simple one-page layout', 'Essential contact details', 'Fast launch experience'],
    visualClass: 'tab-visual--coral',
    icon: '📄',
    visualLabel: <>Placeholder: <strong>Starter</strong><br /><span style={{ fontSize: '0.8rem', opacity: 0.8 }}>1 page website</span></>,
  },
  {
    id: 'growth',
    label: 'Growth (3 pages)',
    title: 'Growth (3 pages)',
    body: 'Placeholder content for the Growth package. This area will highlight the expanded three-page structure for businesses that want more detail and more room to grow.',
    items: ['Three-page website structure', 'More detail for services and about', 'Expanded content layout'],
    visualClass: 'tab-visual--mint',
    icon: '📚',
    visualLabel: <>Placeholder: <strong>Growth</strong><br /><span style={{ fontSize: '0.8rem', opacity: 0.8 }}>3 pages website</span></>,
  },
  {
    id: 'all',
    label: 'All',
    title: 'All',
    body: 'Placeholder content for the All option. This section will eventually bring together the full range of package ideas and show how each one fits your goals.',
    items: ['Overview of all options', 'Quick comparison notes', 'Suggested next step'],
    visualClass: 'tab-visual--blue',
    icon: '✨',
    visualLabel: <>Placeholder: <strong>All options</strong><br /><span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Overview coming soon</span></>,
  },
];

export function Recommendations() {
  const [activeId, setActiveId] = useState(TABS[0].id);

  /* Keyboard navigation: arrow keys move between tabs */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = TABS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveId(TABS[nextIdx].id);
      document.getElementById(`btn-${TABS[nextIdx].id}`)?.focus();
    }
  };

  const activeTab = TABS.find(t => t.id === activeId)!;

  return (
    <section className="recommendations" id="recommendations" aria-labelledby="rec-heading">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">Who We Help</span>
          <h2 className="section-title" id="rec-heading">Find your fit — in seconds.</h2>
          <p className="section-subtitle">Select your type of business below and see exactly what we&apos;d build for you.</p>
        </div>

        {/* Tab buttons */}
        <div className="tabs" role="tablist" aria-label="Website package options">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              id={`btn-${tab.id}`}
              role="tab"
              aria-selected={tab.id === activeId}
              aria-controls={`panel-${tab.id}`}
              className={`tab${tab.id === activeId ? ' tab--active' : ''}`}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={e => handleKeyDown(e, idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panel — only the active tab renders visually; others hidden for a11y */}
        <div className="tab-panels">
          {TABS.map(tab => (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`btn-${tab.id}`}
              aria-hidden={tab.id !== activeId}
              className={`tab-panel${tab.id === activeId ? ' tab-panel--active' : ''}`}
            >
              <div className="tab-content">
                <div className="tab-text">
                  <h3 className="tab-title">{tab.title}</h3>
                  <p className="tab-body">{tab.body}</p>
                  <ul className="tab-list">
                    {tab.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <a href="#contact" className="btn btn--primary btn--sm">Get a Quote</a>
                </div>
                <div className={`tab-visual ${tab.visualClass}`} aria-hidden="true">
                  <div className="tab-visual-icon">{tab.icon}</div>
                  <div className="tab-visual-label">{tab.visualLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
