import { NCLogo } from './NCLogo';

const LINKS = [
  { href: '#services',        label: 'Services' },
  { href: '#maintenance',     label: 'Maintenance' },
  { href: '#recommendations', label: 'Who We Help' },
  { href: '#contact',         label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">

        <div className="footer-brand">
          <a href="#" className="footer-logo-link" aria-label="NavarroCampos Services home">
            <NCLogo variant="dark" className="footer-logo-img" />
          </a>
          <p className="footer-tagline">Professional websites. Honest prices. Family values.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
          ))}
        </nav>

        <p className="footer-legal">
          © {new Date().getFullYear()} NavarroCampos Services. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
