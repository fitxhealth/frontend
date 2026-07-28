import './globals.css';
import AppShell from '@/components/AppShell';
import { GoogleAnalytics } from '@next/third-parties/google';

const SITE_URL = 'https://www.getfitxhealth.in';

export const metadata = {
  title: 'FitX Health | #WEARETHEfitxhealth',
  description:
    "FitX Health — Premium fitness supplements. We don't just sell supplements, we LIVE the results. Shop Whey Protein, Mass Gainer, Creatine and more.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico', type: 'image/x-icon' },
      { url: '/images/favicon.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'FitX Health | #WEARETHEfitxhealth',
    description: "FitX Health — Premium fitness supplements. We don't just sell supplements, we LIVE the results.",
    url: SITE_URL,
    siteName: 'FitX Health',
    images: [
      {
        url: '/images/logo.webp',
        width: 1200,
        height: 630,
        alt: 'FitX Health Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitX Health | #WEARETHEfitxhealth',
    description: "FitX Health — Premium fitness supplements.",
    images: ['/images/logo.webp'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/logo.webp" as="image" />
        <link rel="preload" href="/images/hero-athlete.webp" as="image" />
      </head>
      <body>
        {/* Google Analytics component ensures tracking fires on every page, including SPA navigations */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-2QMDJG0N8S'} />
        {/*
          AppShell is the client-side wrapper that provides:
          - Navbar with live cart count (Zustand)
          - NoticeStrip (from settings API)
          - Maintenance Mode overlay
          - Search & Cart sidebar stubs (full build Phase 3)
          - Floating Cart Button
        */}
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
