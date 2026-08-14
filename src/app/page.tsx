import { Navbar }          from '@/components/Navbar';
import { Hero }            from '@/components/Hero';
import { Services }        from '@/components/Services';
import { Maintenance }     from '@/components/Maintenance';
import { Recommendations } from '@/components/Recommendations';
import { Contact }         from '@/components/Contact';
import { Footer }          from '@/components/Footer';

/**
 * This page is statically generated at build time (no server needed).
 * Only Navbar, Recommendations (tabs), and ContactForm are client components
 * — everything else is zero-JS pure HTML.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Maintenance />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
