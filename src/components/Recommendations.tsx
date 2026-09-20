'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface PortfolioItem {
  id: string;
  client: string;
  business: string;
  build: string;
  /** Omit for a "Coming Soon" placeholder card. */
  url?: string;
}

/**
 * Add more entries here as new client sites launch — the carousel is built
 * to loop infinitely regardless of how many items are in this list. Keep
 * AmbarLingua (or whichever is your best example) first so it centers by
 * default when the page loads.
 */
const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'ambarlingua',
    client: 'AmbarLingua',
    url: 'https://ambarlingua.com/',
    business: 'Teaching - English school',
    build: 'Starter',
  },
  {
    id: 'coming-soon-1',
    client: 'Coming Soon',
    business: 'New project',
    build: 'TBD',
  },
  {
    id: 'coming-soon-2',
    client: 'Coming Soon',
    business: 'New project',
    build: 'TBD',
  },
];

function PortfolioCard({
  item,
  realIndex,
  isActive,
}: {
  item: PortfolioItem;
  realIndex: number;
  isActive: boolean;
}) {
  const isComingSoon = !item.url;

  return (
    <div
      className={`carousel-card${isActive ? ' is-active' : ''}`}
      data-real-index={realIndex}
    >
      <button
        className="carousel-arrow carousel-arrow--prev"
        type="button"
        aria-label="Previous project"
        data-carousel-nav="prev"
      >
        ←
      </button>
      <button
        className="carousel-arrow carousel-arrow--next"
        type="button"
        aria-label="Next project"
        data-carousel-nav="next"
      >
        →
      </button>

      <div className="portfolio-card-face">
        {isComingSoon ? (
          <>
            <div className="portfolio-coming-soon" aria-hidden="true">
              <span className="portfolio-coming-soon-icon">🚧</span>
            </div>
            <div className="portfolio-face-overlay portfolio-face-overlay--empty">
              <h3 className="portfolio-client-name">{item.client}</h3>
              <span className="portfolio-coming-soon-tag">More projects on the way</span>
            </div>
          </>
        ) : (
          <>
            <iframe
              src={item.url}
              className="portfolio-preview-iframe"
              title={`${item.client} website preview`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="portfolio-badge-row">
              <span className="portfolio-badge">{item.business}</span>
              <span className="portfolio-badge portfolio-badge--build">{item.build} build</span>
            </div>

            <div className="portfolio-face-bottom">
              <h3 className="portfolio-client-name">{item.client}</h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-visit-pill"
              >
                Visit live site ↗
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const GAP = 24; // keep in sync with .carousel-track { gap } in globals.css

export function Recommendations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tIdxRef = useRef(1);
  const isWrappingRef = useRef(false);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [activeReal, setActiveReal] = useState(0);

  const realCount = PORTFOLIO.length;

  // Track layout: [cloneOfLast, real0, real1, ..., real(N-1), cloneOfFirst]
  const trackItems =
    realCount === 0
      ? []
      : [
          { item: PORTFOLIO[realCount - 1], real: realCount - 1, key: 'clone-start' },
          ...PORTFOLIO.map((item, i) => ({ item, real: i, key: `real-${i}` })),
          { item: PORTFOLIO[0], real: 0, key: 'clone-end' },
        ];

  const render = useCallback((withTransition: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    if (!withTransition) track.classList.add('no-anim');

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const wrapW = track.parentElement ? track.parentElement.offsetWidth : 0;
    const cardW = cards[0].offsetWidth;
    const stepW = cardW + GAP;
    const cardLeft = tIdxRef.current * stepW;
    const offset = cardLeft - (wrapW - cardW) / 2;
    track.style.transform = `translateX(${-offset}px)`;

    const activeCard = cards[tIdxRef.current];
    const realIdx = activeCard ? Number(activeCard.dataset.realIndex) : 0;
    cards.forEach((c, i) => c.classList.toggle('is-active', i === tIdxRef.current));
    setActiveReal(realIdx);

    if (!withTransition) {
      void track.offsetHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.classList.remove('no-anim');
          isWrappingRef.current = false;
        });
      });
    }
  }, []);

  const goTo = useCallback(
    (newTIdx: number) => {
      if (isWrappingRef.current) return;
      tIdxRef.current = newTIdx;
      render(true);
    },
    [render]
  );

  const moveCarousel = useCallback((dir: number) => goTo(tIdxRef.current + dir), [goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || realCount === 0) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== track || e.propertyName !== 'transform') return;
      const total = track.children.length;
      if (tIdxRef.current === 0) {
        isWrappingRef.current = true;
        tIdxRef.current = realCount;
        render(false);
      } else if (tIdxRef.current === total - 1) {
        isWrappingRef.current = true;
        tIdxRef.current = 1;
        render(false);
      }
    };

    const handleNavClick = (e: Event) => {
      const target = (e.target as HTMLElement).closest('[data-carousel-nav]');
      if (!target) return;
      moveCarousel(target.getAttribute('data-carousel-nav') === 'prev' ? -1 : 1);
    };

    let swipeStartX = 0;
    let swipeStartY = 0;
    let hasSwiped = false;

    const onTouchStart = (e: TouchEvent) => {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
      hasSwiped = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (hasSwiped) return;
      const dx = e.touches[0].clientX - swipeStartX;
      const dy = e.touches[0].clientY - swipeStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (hasSwiped) return;
      const dx = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(dx) >= 50) {
        hasSwiped = true;
        moveCarousel(dx < 0 ? 1 : -1);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => render(false), 80);
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    track.addEventListener('click', handleNavClick);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });
    track.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => render(false));
    });

    return () => {
      track.removeEventListener('transitionend', handleTransitionEnd);
      track.removeEventListener('click', handleNavClick);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf1);
      clearTimeout(resizeTimer.current);
    };
  }, [render, moveCarousel, realCount]);

  return (
    <section className="recommendations" id="recommendations" aria-labelledby="portfolio-heading">
      <div className="section-container">

        <div className="section-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title" id="portfolio-heading">See what we&apos;ve built.</h2>
          <p className="section-subtitle">
            Explore real client websites, built and delivered by NavarroCampos Services.
          </p>
        </div>

        <div className="carousel-wrap">
          <div className="carousel-track" ref={trackRef}>
            {trackItems.map((entry, i) => (
              <PortfolioCard
                key={entry.key}
                item={entry.item}
                realIndex={entry.real}
                isActive={i === 1}
              />
            ))}
          </div>
        </div>

        {realCount > 1 && (
          <div className="carousel-controls">
            {PORTFOLIO.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`carousel-dot${i === activeReal ? ' active' : ''}`}
                aria-label={`Go to ${item.client}`}
                onClick={() => goTo(i + 1)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
