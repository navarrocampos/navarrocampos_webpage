'use client';

import { useState, useEffect, useCallback } from 'react';
import { NCLogo } from './NCLogo';

const NAV_LINKS = [
  { href: '#services',        label: 'Services' },
  { href: '#maintenance',     label: 'Maintenance' },
  { href: '#recommendations', label: 'Who We Help' },
  { href: '#contact',         label: 'Contact' },
];

export function Navbar() {
  const [annVisible, setAnnVisible] = useState(true);
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  /* Restore dismissed state from sessionStorage */
  useEffect(() => {
    if (sessionStorage.getItem('nc_ann_dismissed') === '1') {
      setAnnVisible(false);
    }
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Keep body scroll locked when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Update body/navbar offset class when announcement is gone */
  useEffect(() => {
    if (!annVisible) {
      document.body.classList.add('ann-gone');
    } else {
      document.body.classList.remove('ann-gone');
    }
  }, [annVisible]);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Keyboard: Escape closes menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const dismissAnn = useCallback(() => {
    sessionStorage.setItem('nc_ann_dismissed', '1');
    setAnnVisible(false);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  /* Smooth scroll with offset for fixed header */
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const navbar = document.getElementById('navbar');
    const annBar = document.querySelector('.announcement-bar');
    let offset = navbar ? navbar.offsetHeight : 0;
    if (annBar && annVisible) offset += (annBar as HTMLElement).offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 16;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <>
      {/* Announcement Bar */}
      {annVisible && (
        <div className="announcement-bar" role="banner" aria-label="Promotional announcement">
          <div className="announcement-inner">
            <span className="announcement-badge">Launch Offer</span>
            <p className="announcement-text">
              🎉 <strong>20% off all website builds</strong> — limited spots while we complete our portfolio.{' '}
              <a href="#contact" className="announcement-link" onClick={handleAnchor}>Get launch pricing →</a>
            </p>
            <button className="announcement-close" aria-label="Close announcement" onClick={dismissAnn}>✕</button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        id="navbar"
        className={`navbar${scrolled ? ' is-scrolled' : ''}${!annVisible ? ' ann-gone' : ''}`}
        role="banner"
      >
        <div className="nav-container">
          <div className="nav-logo" aria-label="NavarroCampos Services">
            <NCLogo variant="light" className="nav-logo-img" />
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link" onClick={handleAnchor}>{l.label}</a>
            ))}
            <a href="#contact" className="nav-cta" onClick={handleAnchor}>Get a Free Quote</a>
          </nav>

          <button
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            id="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobileMenu"
          className={`mobile-menu${menuOpen ? ' is-open' : ''}${!annVisible ? ' ann-gone' : ''}`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="mobile-nav" aria-label="Mobile main navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="mobile-link" onClick={handleAnchor}>{l.label}</a>
            ))}
            <a href="#contact" className="mobile-link mobile-link--cta" onClick={handleAnchor}>Get a Free Quote</a>
          </nav>
        </div>
      </header>
    </>
  );
}
