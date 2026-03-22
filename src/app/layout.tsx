'use client';

import '@/styles/globals.css';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { Navbar } from '@/components/layout/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={isDark ? '#050816' : '#f8fafc'} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <title>Düşelence — Kişisel Protokol</title>
        <meta name="description" content="Kişisel fitness, takviye ve yaşam protokolü takip uygulaması" />
      </head>
      <body className="pb-20 md:pb-0 md:pl-20">
        <main className="min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
