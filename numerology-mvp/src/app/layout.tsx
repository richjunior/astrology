import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Synchronic Intelligence | Numerology, Astrology & Divination',
  description: 'Discover your cosmic blueprint through numerology, astrology, Chinese zodiac, I Ching, and tarot. Free instant readings with deep interpretations.',
  keywords: 'numerology, astrology, chinese zodiac, i ching, tarot, spiritual readings, birth chart, life path',
  authors: [{ name: 'Synchronic Intelligence' }],
  openGraph: {
    title: 'Synchronic Intelligence | Cosmic Blueprint Readings',
    description: 'Discover your cosmic blueprint through numerology, astrology, Chinese zodiac, I Ching, and tarot.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synchronic Intelligence',
    description: 'Free numerology, astrology, and divination readings.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
