import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Montserrat, Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/src/components/Navigation';
import Footer from '@/src/components/Footer';
import ClientProviders from '@/src/components/ClientProviders';

const displayFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400','600','700','800'],
  variable: '--font-display',
});

const editorialFont = Montserrat({
  subsets: ['latin'],
  weight: ['500','600','700'],
  variable: '--font-editorial',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400','500','600'],
  variable: '--font-body',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'Ceylon Stories — Gallery Café & Tea House | Colombo',
    template: '%s | Ceylon Stories',
  },
  icons: {
    icon: '/logo-white.png',
    shortcut: '/logo-white.png',
    apple: '/logo-white.png',
  },
  description:
    'A gallery café and tea house on the Kolpetty coast of Colombo. Rotating exhibitions, Dilmah reserve teas, and artisanal menus.',
  keywords: ['gallery cafe Colombo', 'Sri Lankan heritage cafe', 'Dilmah tea experience Colombo', 'Kolpetty cafe'],
  openGraph: {
    type: 'website',
    siteName: 'Ceylon Stories',
    title: 'Ceylon Stories — Gallery Café & Tea House',
    description: 'A gallery café and tea house on the Kolpetty coast of Colombo.',
    locale: 'en_LK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceylon Stories — Gallery Café & Tea House',
    description: 'A gallery café and tea house on the Kolpetty coast of Colombo.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${editorialFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased font-body tracking-tight">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-mahogany focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ClientProviders>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
