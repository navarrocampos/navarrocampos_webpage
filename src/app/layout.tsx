import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',          // Same as your old ?display=swap — no layout shift
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'NavarroCampos Services — Websites That Work For You',
  description:
    'NavarroCampos Services — Professional websites built for small businesses in Toronto and across Canada. Flat pricing, domain included, no surprises.',
  themeColor: '#1A7ABF',
  openGraph: {
    title: 'NavarroCampos Services — Websites for Small Businesses',
    description:
      'Family-run web studio serving Toronto and beyond. Flat-rate website builds from $560, domain management included, first year of hosting free.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}
