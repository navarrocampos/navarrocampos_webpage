'use client';

import { useState } from 'react';
import { withCad } from './withCad';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-outside-canada',
    question: 'Can I hire your web design services if I am located outside of Canada?',
    answer:
      "Yes, absolutely. We operate 100% remotely and build professional websites for small businesses, freelancers, and independent contractors worldwide. We primarily coordinate via WhatsApp and email to ensure seamless communication, regardless of your time zone.",
  },
  {
    id: 'faq-whats-included',
    question: 'What is included in your freelance and contractor website packages?',
    answer:
      "Every website build includes a fully custom, mobile-optimized design, essential SEO foundation setup, contact form integration, and social media linking. We also include free domain registration and hosting management for your first year so your site is live and secure from day one.",
  },
  {
    id: 'faq-cost',
    question: 'How much does a managed small business website cost?',
    answer:
      "We believe in honest, transparent pricing with flat rates and no hidden surprises. Our launch pricing starts at a one-time build fee of $560 USD/CAD for a single-page Starter website and $800 USD/CAD for a multi-page Growth site. After the first year, keeping your site online costs just $89 CAD/year for complete hosting and domain renewal.",
  },
  {
    id: 'faq-technical',
    question: 'Do I need to know how to code or manage servers?',
    answer:
      "Not at all. We handle 100% of the technical setup behind the scenes, including domain configuration, SSL security, and cloud hosting. Once your website goes live, we provide a personalized walkthrough to show you exactly how it works, and we offer hands-on monthly maintenance plans if you prefer us to handle text and image updates for you.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">Questions? Answers.</span>
          <h2 className="section-title" id="faq-heading">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything small business owners and contractors ask us before getting started.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map(item => {
            const isOpen = item.id === openId;
            return (
              <div key={item.id} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <h3 className="faq-question-wrap">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    id={`${item.id}-button`}
                    onClick={() => toggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${item.id}-button`}
                  hidden={!isOpen}
                >
                  <p>{withCad(item.answer)}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
