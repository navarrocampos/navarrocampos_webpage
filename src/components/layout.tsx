import type { Metadata, Viewport } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',          // Same as your old ?display=swap — no layout shift
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'Affordable Web Design for Small Businesses & Contractors | NC Navarro Campos',
  description:
    "Get a fast, mobile-optimized website for your small business or freelance trade. Flat rates, 1st-year free hosting, and 100% managed globally. Get a free quote!",
  openGraph: {
    title: 'Affordable Web Design for Small Businesses & Contractors | NC Navarro Campos',
    description:
      "Get a fast, mobile-optimized website for your small business or freelance trade. Flat rates, 1st-year free hosting, and 100% managed globally. Get a free quote!",
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A7ABF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}
